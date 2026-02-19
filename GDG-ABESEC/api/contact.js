// SMTP2GO API for sending contact form emails
const SMTP2GO_API_URL = "https://api.smtp2go.com/v3/email/send";
const smtp2goApiKey = process.env.SMTP2GO_API_KEY || "";
const senderEmail = process.env.SENDER_EMAIL || "dsc@abes.ac.in";
const receiverEmail = process.env.RECEIVER_EMAIL || "gdg.abesec@gmail.com";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check API key
  if (!smtp2goApiKey) {
    console.error("SMTP2GO_API_KEY not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  // HTML email template matching GDG ABESEC theme
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #0a0a0a; }
    .container { max-width: 600px; margin: 0 auto; background: #151515; border-radius: 16px; overflow: hidden; border: 1px solid #262626; }
    .header { background: #0a0a0a; padding: 30px; text-align: center; border-bottom: 1px solid #262626; }
    .header-dots { display: flex; justify-content: center; gap: 6px; margin-bottom: 16px; }
    .header-dots span { width: 10px; height: 10px; border-radius: 50%; }
    .header h1 { margin: 0; color: #e5e5e5; font-size: 22px; font-weight: 600; }
    .header p { margin: 8px 0 0; color: #737373; font-size: 14px; }
    .content { padding: 30px; }
    .info-box { background: #0a0a0a; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #4285F4; }
    .info-row { display: flex; margin: 12px 0; }
    .info-label { color: #737373; font-size: 14px; min-width: 80px; }
    .info-value { color: #e5e5e5; font-size: 14px; font-weight: 500; }
    .message-box { background: #0a0a0a; border-radius: 12px; padding: 20px; margin-top: 20px; border: 1px solid #262626; }
    .message-label { color: #4285F4; font-size: 14px; font-weight: 600; margin-bottom: 12px; }
    .message-text { color: #d4d4d4; font-size: 15px; line-height: 1.6; white-space: pre-wrap; }
    .footer { background: #0a0a0a; padding: 20px; text-align: center; border-top: 1px solid #262626; }
    .footer p { margin: 0; color: #525252; font-size: 12px; }
    .google-colors { display: flex; justify-content: center; gap: 8px; margin-top: 15px; }
    .google-colors span { width: 8px; height: 8px; border-radius: 50%; }
    .blue { background: #4285F4; }
    .red { background: #EA4335; }
    .yellow { background: #FBBC05; }
    .green { background: #34A853; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-dots">
        <span class="blue"></span>
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
      </div>
      <h1>New Contact Form Submission</h1>
      <p>GDG On Campus ABESEC</p>
    </div>
    <div class="content">
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">From:</span>
          <span class="info-value">${name}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Subject:</span>
          <span class="info-value">${subject}</span>
        </div>
      </div>
      <div class="message-box">
        <div class="message-label">Message</div>
        <div class="message-text">${message.replace(/\n/g, "<br>")}</div>
      </div>
    </div>
    <div class="footer">
      <p>This message was sent via the GDG ABESEC website contact form</p>
      <div class="google-colors">
        <span class="blue"></span>
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
      </div>
    </div>
  </div>
</body>
</html>`;

  try {
    const response = await fetch(SMTP2GO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Smtp2go-Api-Key": smtp2goApiKey,
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: senderEmail,
        to: [receiverEmail],
        subject: `[GDG Contact] ${subject}`,
        html_body: htmlContent,
      }),
    });

    const result = await response.json();

    if (response.ok && result.data?.succeeded === 1) {
      return res.status(200).json({
        success: true,
        message: "Email sent successfully",
      });
    } else {
      console.error("SMTP2GO error:", result);
      return res.status(500).json({
        error: result.data?.error || "Failed to send email",
      });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
