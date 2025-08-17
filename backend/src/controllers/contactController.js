import nodemailer from 'nodemailer';

export const sendContactMessage = async (req, res) => {
  const { name, email, question } = req.body;
  if (!name || !email || !question) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Contact Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${question}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};
