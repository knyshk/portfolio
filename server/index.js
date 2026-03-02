import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.log('Gmail configuration error:', error);
  } else {
    console.log('Gmail transporter configured successfully');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { senderName, senderEmail, message } = req.body;

  // Validation
  if (!senderName || !senderEmail || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Send email to your Gmail
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: process.env.GMAIL_EMAIL,
      replyTo: senderEmail,
      subject: `New Portfolio Contact from ${senderName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
            <p><strong>From:</strong> ${senderName}</p>
            <p><strong>Email:</strong> ${senderEmail}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #555;">${message}</p>
            <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      `
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
});
