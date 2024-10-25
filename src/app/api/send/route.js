import { sendMail } from "../../login/create-account/create-account";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { from, to, subject, html } = await request.json();
    console.log("first");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOption = {
      from,
      to,
      subject,
      html,
    };

    const { google } = require("googleapis");

    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "http://localhost" // o la URL de tu aplicación
    );

    // Generar la URL de autorización
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/gmail.send"],
    });

    console.log("Authorize this app by visiting this url:", authUrl);

    // Después de autorizar, obtén el código de la URL de redirección
    // Luego intercambia el código por tokens
    const { tokens } = await oauth2Client.getToken("YOUR_AUTHORIZATION_CODE");
    oauth2Client.setCredentials(tokens);

    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);

    // await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
