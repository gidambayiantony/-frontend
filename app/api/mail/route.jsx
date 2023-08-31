import { emailTemplate } from "@constants/constants";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req, res) => {
  try {
    const { email } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yookatale256@gmail.com",
        pass: "yomarket256!",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send the welcome email
    const mailOptions = {
      from: "yookatale256@gmail.com",
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
