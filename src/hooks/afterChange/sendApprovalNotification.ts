import { CollectionAfterChangeHook } from 'payload/types';
import nodemailer from 'nodemailer';

export const sendApprovalNotification: CollectionAfterChangeHook = async ({ doc, req }) => {
  try {
    if (!doc.email) return; // Ensure email exists

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"DelPuma AI" <noreply@delpuma.com>`,
      to: doc.email,
      subject: `New Posts Ready for Your Approval`,
      text: `Hello ${doc.contactPerson},\n\nYour AI-generated social media posts and blogs are ready for review. Log in to your dashboard to approve them.\n\n- DelPuma AI Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${doc.email}`);
  } catch (error) {
    console.error(`❌ Error sending email:`, error);
  }
};
