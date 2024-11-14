import { sendMail } from "../../login/create-account/create-account";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, text, html } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_APP_PASS,
      },
    });

    const mailOptions = {
      from: '"Refugio de Patas" <dtzurita2003@gmail.com>',
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email", error);
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
