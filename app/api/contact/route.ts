import { NextRequest, NextResponse } from 'next/server';
import { saveContactMessage, saveEmailToDatabase } from '@/lib/emailDatabase';
import { adminAddress, escapeHtml, trySendMail } from '@/lib/mailer';
import { GITHUB_URL, LINKEDIN_URL } from '@/app/components/site';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const LIMITS: Record<keyof ContactFormData, number> = {
  firstName: 100,
  lastName: 100,
  email: 254,
  subject: 200,
  message: 5000,
};

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json().catch(() => ({}));

    // Normalise every field to a trimmed string
    const body = Object.fromEntries(
      (Object.keys(LIMITS) as (keyof ContactFormData)[]).map((key) => [
        key,
        typeof raw[key] === 'string' ? raw[key].trim() : '',
      ])
    ) as unknown as ContactFormData;

    console.log('📧 Contact form submission received from:', body.email);

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all fields.' },
        { status: 400 }
      );
    }

    const tooLong = (Object.keys(LIMITS) as (keyof ContactFormData)[]).find(
      (key) => body[key].length > LIMITS[key]
    );
    if (tooLong) {
      return NextResponse.json(
        { success: false, error: `Your ${tooLong === 'message' ? 'message' : tooLong} is too long.` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Escaped copies for the HTML emails
    const safe = {
      firstName: escapeHtml(body.firstName),
      lastName: escapeHtml(body.lastName),
      email: escapeHtml(body.email),
      subject: escapeHtml(body.subject),
      message: escapeHtml(body.message),
    };

    // Keep a copy of the message in the database so it isn't lost if email fails
    let saved = false;
    try {
      await saveContactMessage(body);
      await saveEmailToDatabase(body.email, 'contact');
      saved = true;
    } catch (error) {
      console.error('❌ Could not save contact message to database:', error);
    }

    // Email to admin
    const adminEmailContent = `
NEW CONTACT FORM SUBMISSION
============================

From: ${body.firstName} ${body.lastName}
Email: ${body.email}
Subject: ${body.subject}

Message:
${body.message}

============================
Sent from: Portfolio Contact Form
Time: ${new Date().toLocaleString()}
    `;

    const adminNotified = await trySendMail(
      {
        to: adminAddress(),
        replyTo: body.email,
        subject: `📬 New Contact: ${body.subject.replace(/[\r\n]+/g, ' ')}`,
        text: adminEmailContent,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #C39248 0%, #1F3A5F 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">📬 New Contact Form Submission</h2>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px;">
              <p style="margin: 5px 0; color: #666;"><strong style="color: #C39248;">From:</strong> ${safe.firstName} ${safe.lastName}</p>
              <p style="margin: 5px 0; color: #666;"><strong style="color: #C39248;">Email:</strong> <a href="mailto:${safe.email}" style="color: #C39248; text-decoration: none;">${safe.email}</a></p>
              <p style="margin: 5px 0; color: #666;"><strong style="color: #C39248;">Subject:</strong> ${safe.subject}</p>
            </div>
            <div style="border-top: 2px solid #C39248; padding-top: 20px; margin-top: 20px;">
              <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${safe.message}</p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
              <p>Sent from Portfolio Contact Form</p>
              <p>Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
      },
      'Contact alert'
    );

    // Nothing was recorded anywhere, so the visitor needs to try another way
    if (!saved && !adminNotified) {
      return NextResponse.json(
        {
          success: false,
          error: "Your message couldn't be sent right now. Please email me directly at ezikevictor11@gmail.com.",
        },
        { status: 503 }
      );
    }

    // Confirmation email to the visitor (best-effort)
    const userEmailContent = `
Hi ${body.firstName},

Thank you for reaching out! I've received your message and will get back to you as soon as possible.

Here's a copy of your message:

Subject: ${body.subject}
Message: ${body.message}

Best regards,
Victor Ezike
Software Engineer

---
This is an automated confirmation email from Victor Ezike's portfolio
    `;

    const confirmationSent = await trySendMail(
      {
        to: body.email,
        subject: '✅ Thank you for contacting me!',
        text: userEmailContent,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #C39248 0%, #1F3A5F 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">✅ Thank You for Reaching Out!</h2>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi <strong>${safe.firstName}</strong>,</p>
            <p style="color: #333; line-height: 1.6;">Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C39248;">
              <p style="margin: 5px 0; color: #666;"><strong style="color: #C39248;">Your Subject:</strong> ${safe.subject}</p>
              <p style="margin: 15px 0 5px 0; color: #666;"><strong style="color: #C39248;">Your Message:</strong></p>
              <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${safe.message}</p>
            </div>

            <p style="color: #333; line-height: 1.6;">I typically respond within 24-48 hours. In the meantime, feel free to check out my <a href="${GITHUB_URL}" style="color: #C39248; text-decoration: none;">GitHub</a> or connect with me on <a href="${LINKEDIN_URL}" style="color: #C39248; text-decoration: none;">LinkedIn</a>.</p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #333; margin: 5px 0;"><strong>Best regards,</strong></p>
              <p style="color: #C39248; font-size: 18px; font-weight: bold; margin: 5px 0;">Victor Ezike</p>
              <p style="color: #666; margin: 5px 0;">Software Engineer</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
              <p>This is an automated confirmation email.</p>
            </div>
          </div>
        </div>
      `,
      },
      'Contact confirmation'
    );

    return NextResponse.json({
      success: true,
      message: confirmationSent
        ? 'Message sent! Check your email for a confirmation.'
        : "Message received! I'll get back to you soon.",
    });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again or email me directly.',
      },
      { status: 500 }
    );
  }
}
