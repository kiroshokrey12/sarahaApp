import nodemailer from "nodemailer";


export const sendEmail = async (to, subject, html, attachments) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_SENDER_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: `"KIRO_MAIL" <${process.env.EMAIL_SENDER}>`,
        to: to ? to : "kirollosshokrey@gmail.com",
        subject: subject ? subject : "Hello",
        html: html ? html : "<b>Hello world?</b>",
        attachments: attachments ? attachments : []
    });

    if (info.accepted.length) {
        return true
    }
    return false;

}