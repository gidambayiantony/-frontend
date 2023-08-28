import { emailTemplate } from "@constants/constants";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req, res) => {
  try {
    const { email } = await req.json();

    const transporter = nodemailer.createTransport({
      name: "www.yookatale.com",
      host: "mail.privateemail.com",
      post: 465,
      secure: false,
      auth: {
        user: "info@yookatale.com",
        pass: "info@y00k@Ta13-Pas5",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send the welcome email
    const mailOptions = {
      from: "info@yookatale.com",
      to: email,
      subject: "Welcome to our Food Market!",
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("Error point starts here");
    console.log({ error });
    return new NextResponse("Error occured", { status: 400 });
  }
};
