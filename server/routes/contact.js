const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

router.post('/', async (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
  const subject = typeof req.body.subject === 'string'
    ? req.body.subject.trim().replace(/[\r\n]+/g, ' ')
    : '';
  const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (name.length > 120 || email.length > 254 || subject.length > 180 || message.length > 5000) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }

  const inbox = process.env.EMAIL_TO || process.env.EMAIL_USER;
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !inbox) {
    return res.status(503).json({ error: 'Email delivery is not configured.' });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br>');

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
      to: inbox,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    // Email delivery remains successful even if saving a copy to MongoDB fails.
    try {
      await req.app.locals.connectToDatabase();
      await Contact.create({ name, email, subject, message });
    } catch (error) {
      console.error('Could not archive contact message:', error.message);
    }

    const safeReplyName = escapeHtml(name);
    transporter.sendMail({
      from: `Manish Kumar Yadav <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for reaching out!',
      text: `Hi ${name},\n\nI received your message and will get back to you soon.\n\nBest regards,\nManish Kumar Yadav`,
      html: `
        <p>Hi ${safeReplyName},</p>
        <p>Thanks for reaching out. I received your message and will get back to you soon.</p>
        <p>Best regards,<br><strong>Manish Kumar Yadav</strong></p>
      `,
    }).catch(error => console.error('Could not send contact auto-reply:', error.message));

    return res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Portfolio contact email failed:', error.message);
    return res.status(502).json({ error: 'Your message could not be sent. Please try again or email me directly.' });
  }
});

router.get('/', async (req, res) => {
  try {
    await req.app.locals.connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
