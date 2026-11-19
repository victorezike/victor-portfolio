import { NextRequest, NextResponse } from 'next/server';
import { saveEmailToDatabase } from '@/lib/emailDatabase';
import { adminAddress, escapeHtml, trySendMail } from '@/lib/mailer';
import { GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL } from '@/app/components/site';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 254 || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }
    const safeEmail = escapeHtml(email);

    console.log('📧 New email captured:', email);

    // Save to database. A database outage shouldn't lose the subscriber
    // if the notification email still goes out, so don't throw here.
    let saved = false;
    let alreadySubscribed = false;
    try {
      const isNewEmail = await saveEmailToDatabase(email, 'popup');
      saved = true;
      alreadySubscribed = !isNewEmail;
    } catch (error) {
      console.error('❌ Could not save subscriber to database:', error);
    }

    if (alreadySubscribed) {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed. Thanks for sticking around!",
      });
    }

    // Email to admin about new subscriber
    const adminNotified = await trySendMail({
      to: adminAddress(),
      subject: '📬 New Email Subscriber - Portfolio',
      text: `New subscriber: ${email}\n\nTime: ${new Date().toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #C39248 0%, #1F3A5F 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">📬 New Email Subscriber!</h2>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="font-size: 18px; color: #333;">
              <strong style="color: #C39248;">Email:</strong> 
              <a href="mailto:${safeEmail}" style="color: #C39248; text-decoration: none;">${safeEmail}</a>
            </p>
            <p style="color: #666; margin-top: 20px;">
              Subscribed at: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    }, 'Subscriber alert');

    // Nothing was recorded anywhere, so tell the visitor it didn't work
    if (!saved && !adminNotified) {
      return NextResponse.json(
        { success: false, error: "Couldn't subscribe right now. Please try again in a moment." },
        { status: 503 }
      );
    }

    // Welcome email to subscriber (best-effort)
    const welcomeSent = await trySendMail({
      to: email,
      subject: '✅ Subscription deployed successfully (zero bugs, I checked)',
      text: `Hey there!

Thanks for dropping your email on my portfolio. My code reviewer (also me) approved it instantly.

I'm Victor, a Software Engineer in Lagos. I spend my days building web and mobile apps with React, Next.js, React Native and Node.js, and my nights wondering why something that worked yesterday doesn't work today. (It's usually caching. It's always caching.)

Here's what you just signed up for:
• A short note whenever I ship something new
• Honest write-ups on things I've built, broken and fixed
• Zero spam. I treat your inbox like production: carefully, and never on a Friday.

Got a project in mind, a bug that's ruining your week, or a role you think I'd be great for? Just hit reply. A real human reads these (hi, it's me).

Talk soon,
Victor
Software Engineer · Part-time bug whisperer

P.S. Want out at any point? Reply "unsubscribe" and I'll remove you faster than a flaky test gets skipped.`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #08101F;">
          <div style="background: linear-gradient(135deg, #C39248 0%, #1F3A5F 100%); padding: 40px 30px; border-radius: 15px 15px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">✅ Subscription deployed!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Build passed. Zero bugs. I checked twice.</p>
          </div>

          <div style="background: #0F1A2E; padding: 40px 30px; border-radius: 0 0 15px 15px;">
            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">Hey there!</p>

            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
              Thanks for dropping your email on my portfolio. My code reviewer (also me) approved it instantly. 🙌
            </p>

            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
              I'm <strong style="color: #C39248;">Victor</strong>, a Software Engineer in Lagos. I spend my days building web and mobile apps with React, Next.js, React Native and Node.js, and my nights wondering why something that worked yesterday doesn't work today. <em style="color: #b0b0b0;">(It's usually caching. It's always caching.)</em>
            </p>

            <div style="background: rgba(195, 146, 72, 0.1); border-left: 4px solid #C39248; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="color: #b0b0b0; font-size: 14px; margin: 0 0 5px 0;">Here's what you just signed up for:</p>
              <ul style="color: #e0e0e0; margin: 5px 0 0 20px; padding: 0;">
                <li style="margin: 8px 0;">A short note whenever I ship something new 🚀</li>
                <li style="margin: 8px 0;">Honest write-ups on things I've built, broken and fixed 🛠️</li>
                <li style="margin: 8px 0;">Zero spam. I treat your inbox like production: carefully, and never on a Friday 🙅🏾‍♂️</li>
              </ul>
            </div>

            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
              Got a project in mind, a bug that's ruining your week, or a role you think I'd be great for? Just hit <strong style="color: #C39248;">reply</strong>. A real human reads these (hi, it's me). 👋🏾
            </p>

            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #333;">
              <p style="color: #e0e0e0; margin: 5px 0; font-size: 16px;">Talk soon,</p>
              <p style="color: #C39248; font-size: 22px; font-weight: bold; margin: 10px 0 5px 0;">Victor</p>
              <p style="color: #888; margin: 5px 0; font-size: 14px; font-style: italic;">Software Engineer · Part-time bug whisperer 🐛</p>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 8px; text-align: center;">
              <p style="color: #888; font-size: 13px; margin: 0; line-height: 1.6;">
                <strong>P.S.</strong> Want out at any point? Reply "unsubscribe" and I'll remove you faster than a flaky test gets skipped.
              </p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
              <a href="${GITHUB_URL}" style="display: inline-block; margin: 0 10px; color: #C39248; text-decoration: none; font-size: 14px;">GitHub</a>
              <span style="color: #555;">|</span>
              <a href="${LINKEDIN_URL}" style="display: inline-block; margin: 0 10px; color: #C39248; text-decoration: none; font-size: 14px;">LinkedIn</a>
              <span style="color: #555;">|</span>
              <a href="${INSTAGRAM_URL}" style="display: inline-block; margin: 0 10px; color: #C39248; text-decoration: none; font-size: 14px;">Instagram</a>
            </div>
          </div>
        </div>
      `,
    }, 'Welcome email');

    console.log('✅ Email capture successful');

    return NextResponse.json({
      success: true,
      message: welcomeSent
        ? "You're in! Check your inbox for a welcome note."
        : "You're in! Thanks for subscribing.",
    });

  } catch (error: any) {
    console.error('❌ Email capture error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
