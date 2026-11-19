import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';
import axios from 'axios';
import { adminAddress, trySendMail } from '@/lib/mailer';

interface VisitorData {
  ip: string;
  city?: string;
  country?: string;
  region?: string;
  device: string;
  browser: string;
  os: string;
  page: string;
  timestamp: string;
  email?: string;
}

// Get visitor's IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (real) {
    return real;
  }
  
  return 'Unknown';
}

interface GeoData {
  city: string;
  country: string;
  region: string;
}

const UNKNOWN_GEO: GeoData = { city: 'Unknown', country: 'Unknown', region: 'Unknown' };

// Loopback / private-network addresses can't be geolocated (e.g. local development)
function isPrivateIP(ip: string) {
  return (
    ip === 'Unknown' ||
    ip === '::1' ||
    ip.startsWith('127.') ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    ip.startsWith('::ffff:127.') ||
    ip.toLowerCase().startsWith('fe80:') ||
    ip.toLowerCase().startsWith('fc') ||
    ip.toLowerCase().startsWith('fd')
  );
}

function countryName(code: string) {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

// Vercel attaches the visitor's location to every request; no third-party call needed
function getVercelGeolocation(request: NextRequest): GeoData | null {
  const country = request.headers.get('x-vercel-ip-country');
  if (!country) return null;

  const decode = (value: string | null) => {
    if (!value) return 'Unknown';
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  };

  return {
    city: decode(request.headers.get('x-vercel-ip-city')),
    region: decode(request.headers.get('x-vercel-ip-country-region')),
    country: countryName(country),
  };
}

// Get geolocation data from IP
async function getGeolocation(request: NextRequest, ip: string): Promise<GeoData> {
  const fromVercel = getVercelGeolocation(request);
  if (fromVercel) return fromVercel;

  if (isPrivateIP(ip)) {
    return { city: 'Local network', region: 'Local network', country: 'Local (development)' };
  }

  // Fallback lookup outside Vercel. ipwho.is is free, keyless and HTTPS.
  // Note: these services report errors with HTTP 200, so check the body too.
  try {
    const { data } = await axios.get(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      timeout: 5000,
    });
    if (data?.success) {
      return {
        city: data.city || 'Unknown',
        region: data.region || 'Unknown',
        country: data.country || 'Unknown',
      };
    }
    console.error('Geolocation lookup failed:', data?.message);
  } catch (error) {
    console.error('Geolocation error:', error);
  }
  return UNKNOWN_GEO;
}

// Send notification (you can customize this)
async function sendNotification(visitorData: VisitorData) {
  const message = `
🚨 NEW VISITOR ALERT 🚨

📍 Location:
  • City: ${visitorData.city}
  • Region: ${visitorData.region}
  • Country: ${visitorData.country}

🌐 IP Address: ${visitorData.ip}

💻 Device Info:
  • Device: ${visitorData.device}
  • Browser: ${visitorData.browser}
  • OS: ${visitorData.os}

📄 Page: ${visitorData.page}
⏰ Timestamp: ${visitorData.timestamp}
${visitorData.email ? `📧 Email: ${visitorData.email}` : ''}
  `;

  // Send to your preferred notification service
  // Example: Email, Telegram, Discord, Slack, etc.
  
  // EMAIL NOTIFICATION (using nodemailer)
  console.log('🔍 Checking email alerts...');
  console.log('ENABLE_EMAIL_ALERTS:', process.env.ENABLE_EMAIL_ALERTS);
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set ✓' : 'Missing ✗');
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Set ✓' : 'Missing ✗');
  console.log('ALERT_EMAIL:', process.env.ALERT_EMAIL);
  
  if (process.env.ENABLE_EMAIL_ALERTS === 'true') {
    console.log('📧 Attempting to send email...');
    await trySendMail(
      {
        to: adminAddress(),
        subject: '🚨 New Visitor Alert - Portfolio',
        text: message,
      },
      'Visitor alert'
    );
  } else {
    console.log('⚠️ Email alerts disabled or env var not "true"');
  }

  // TELEGRAM NOTIFICATION
  if (process.env.ENABLE_TELEGRAM_ALERTS === 'true') {
    try {
      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }
      );
    } catch (error) {
      console.error('Telegram notification error:', error);
    }
  }

  // DISCORD WEBHOOK
  if (process.env.ENABLE_DISCORD_ALERTS === 'true') {
    try {
      await axios.post(process.env.DISCORD_WEBHOOK_URL!, {
        content: message,
      });
    } catch (error) {
      console.error('Discord notification error:', error);
    }
  }

  // SLACK WEBHOOK
  if (process.env.ENABLE_SLACK_ALERTS === 'true') {
    try {
      await axios.post(process.env.SLACK_WEBHOOK_URL!, {
        text: message,
      });
    } catch (error) {
      console.error('Slack notification error:', error);
    }
  }

  console.log('Visitor tracked:', visitorData);
}

export async function POST(request: NextRequest) {
  try {
    console.log('📍 Track visitor API called');
    console.log('Email alerts enabled:', process.env.ENABLE_EMAIL_ALERTS);
    
    const body = await request.json();
    const userAgent = request.headers.get('user-agent') || '';
    
    // Parse user agent
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    
    // Get IP address
    const ip = getClientIP(request);
    
    // Get geolocation
    const geoData = await getGeolocation(request, ip);
    
    // Construct visitor data
    const visitorData: VisitorData = {
      ip,
      city: geoData.city,
      country: geoData.country,
      region: geoData.region,
      device: `${result.device.vendor || 'Unknown'} ${result.device.model || result.device.type || 'Desktop'}`,
      browser: `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`,
      os: `${result.os.name || 'Unknown'} ${result.os.version || ''}`,
      page: body.page || '/',
      timestamp: new Date().toISOString(),
      email: body.email || undefined,
    };
    
    // Send notification - MUST await to ensure it completes before function ends
    console.log('🚀 Sending notification...');
    await sendNotification(visitorData);
    console.log('✨ Notification process completed');
    
    // Optional: Save to database here
    // await saveToDatabase(visitorData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Visitor tracked successfully' 
    });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}
