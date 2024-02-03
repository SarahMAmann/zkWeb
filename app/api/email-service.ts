import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function sendEmails(
  proverEmail: string,
  verifierEmail: string,
  proofName: string,
) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_PASSWORD,
    },
  });

  console.log('EMAIL', process.env.NEXT_PUBLIC_EMAIL)
  console.log('PASS', process.env.NEXT_PUBLIC_PASSWORD)

  const mailOptions: Mail.Options = {
    from: process.env.NEXT_PUBLIC_EMAIL,
    to: [proverEmail, verifierEmail],
    subject: `Proof ${proofName} Successfully Verified`,
    text: `Hi there! 🦄 This is a message from your friends at zkWeb letting you know that a correct key for proof ${proofName} was just provided by ${proverEmail}.`,
  };


  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          console.log(err.message)
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return;
  } catch (err) {
    console.error("failed to send email");
  }
}
