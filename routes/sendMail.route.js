import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const router = express.Router();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password, not your Gmail password
  },
});

router.post('/support', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // If email is an array (like from Clerk), extract actual email address
    const emailAddress = Array.isArray(email) && email.length > 0
      ? email[0].emailAddress
      : email;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailAddress, // Your team’s or planner’s email
      subject: subject,
      html: `
        <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: 'Times New Roman', serif;">
            <div style="max-width: 600px; margin-left: auto; margin-right: auto; background-color: #ffffff; border: 2px solid rgb(62, 114, 255); border-radius: 0.5rem;">
                <div style="background: linear-gradient(135deg, rgb(62, 114, 255) 0%,rgb(0, 8, 255) 100%); padding: 1.25rem; text-align: center; color: #ffffff; font-size: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1rem;">
                Elegant Correspondence
                </div>
                <div style="padding: 1.875rem; text-align: left; line-height: 1.6; font-size: 1.125rem;">
                <p style="margin: 0.625rem 0;">Esteemed Guest: <span>${name}</span></p>
                <p style="margin: 0.625rem 0;">We are delighted to acknowledge your gracious communication.</p>
                <div style="border-top: 1px solid rgb(62, 114, 255); margin: 1.25rem 0;"></div>
                <p style="margin: 0.625rem 0;"><span style="font-weight: 700; color: #4a4a4a;">Sender's Electronic Address:</span> <span>${emailAddress}</span></p>
                <p style="margin: 0.625rem 0;"><span style="font-weight: 700; color: #4a4a4a;">Subject of Discourse:</span> <span>${subject}</span></p>
                <p style="margin: 0.625rem 0;"><span style="font-weight: 700; color: #4a4a4a;">Message of Esteem:</span> <span>${message}</span></p>
                <div style="border-top: 1px solid rgb(62, 114, 255); margin: 1.25rem 0;"></div>
                <p style="margin: 0.625rem 0;">Your words are most appreciated, and we shall respond with the utmost diligence.</p>
                </div>
                <div style="text-align: center; font-size: 1rem; color: #666666; padding: 0.625rem; background-color: #fafafa;">
                ✧ With Gratitude ✧
                </div>
            </div>
        </body>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Request sent successfully via email!' });

  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send the request email.' });
  }
});


export default router