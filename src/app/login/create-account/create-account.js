
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, token } = req.body;

    
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Token de autorización',
      text: `Tu token es: ${token}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Token enviado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al enviar el correo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}