import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use an App Password if 2FA is enabled
  }
});

export const sendEmail = async (data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) => {
  try {
    // Email template for admin
    const adminTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .email-container { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4338ca; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
            .footer { margin-top: 20px; text-align: center; color: #64748b; }
            .info-item { margin: 10px 0; }
            .info-label { color: #475569; font-weight: bold; }
            .message-box { background: white; padding: 15px; border-radius: 4px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="info-item">
                <span class="info-label">Name:</span> ${data.name}
              </div>
              <div class="info-item">
                <span class="info-label">Email:</span> ${data.email}
              </div>
              <div class="info-item">
                <span class="info-label">Message:</span>
                <div class="message-box">${data.message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your website contact form</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email template for sender
    const senderTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .email-container { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4338ca; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
            .footer { margin-top: 20px; text-align: center; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h2>Thank you for contacting me!</h2>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              <p>Thank you for reaching out. I have received your message and will get back to you as soon as possible.</p>
              <p>Your message:</p>
              <blockquote style="border-left: 4px solid #4338ca; padding-left: 15px; margin: 15px 0;">
                ${data.message}
              </blockquote>
              <p>Best regards,<br>Dinesh Wayaman</p>
            </div>
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: data.email,
      subject: data.subject || `New Contact Form Message from ${data.name}`,
      html: adminTemplate
    });

    // Send confirmation email to sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Thank you for contacting Dinesh Wayaman',
      html: senderTemplate
    });

    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Email error:', error);
    throw error; // This will be caught by the API route
  }
};
