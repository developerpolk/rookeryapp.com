// app/api/waitlist/email.tsx (App Router)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'Rookery <notify@rookeryapp.com>',
      to: [email],
      subject: 'Welcome to Rookery 🎉',
      html: `
      <div style="background-color: #000000; padding: 40px; font-family: Arial, sans-serif; color: #ffffff;">
      <div style="max-width: 600px; margin: auto; background-color: #0a0a0a; border-radius: 12px; padding: 32px; box-shadow: 0 10px 20px rgba(0,0,0,0.5); border: 1px solid #67E8F9;">
  
        <h1 style="font-size: 24px; color: #67E8F9; margin-bottom: 16px;">
          🎉 You're officially on the Rookery waitlist
        </h1>
  
        <p style="font-size: 16px; line-height: 1.6; color: #e5e5e5;">
          Welcome to the network that remembers. You've secured <strong>1 month of free premium access</strong> for being one of the first to join Rookery.
        </p>
  
        <p style="font-size: 16px; margin-top: 16px; line-height: 1.6; color: #cccccc;">
          Here’s what you’ll get with Rookery Premium:
        </p>
  
        <ul style="margin: 16px 0; padding-left: 20px; color: #bfbfbf;">
          <li>🧠 Smart memory-driven contact summaries</li>
          <li>📆 Intelligent follow-up reminders</li>
          <li>🕸️ Private insights into your social graph</li>
          <li>📈 Weekly wrap-ups to stay connected</li>
        </ul>
  
        <p style="font-size: 16px; margin-top: 16px; color: #aaaaaa;">
          We're building this app with our early users — you'll be the first to test and shape what networking feels like next.
        </p>
  
        <p style="margin-top: 32px; font-size: 14px; color: #666666;">
          Stay tuned for your private beta invite. Until then, keep connecting.  
          <br/><br/>
          – The Rookery Team 🐦
        </p>
      </div>
    </div>
      `
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
