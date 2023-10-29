
import dotenv from 'dotenv'
dotenv.config();
import nodeMailer from "nodemailer";
const { SMTP_MAILER, SMTP_PASSWORD } = process.env;

const sendMail = async (email, mailSubject, content) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: SMTP_MAILER,
        pass: SMTP_PASSWORD,
      },
    });

    const info = transporter.sendMail(
      {
        from: SMTP_MAILER,
        to: email,
        subject: mailSubject,
        text: "made-in-Africa",
        html: content, // html body
      },
      (err, info) => {
        if (err) console.log(err);
        else console.log('Message sent successfully ! : ', info.response);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
