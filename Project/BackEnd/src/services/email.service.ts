import nodemailer from "nodemailer";
import accessConfig from "../configs/access.config";
import serverConfig from "../configs/server.config";

const transport = nodemailer.createTransport(accessConfig.mailer);

export async function sendRegisterConfirmation(email: string, token: string): Promise<void> {
    const confirmationUrl = `http://${serverConfig.serverUrl}/api/register/confirm-email/${token}`;
    const mailOptions = {
        from: accessConfig.mailer.auth.user,
        to: email,
        subject: "Hello from Tin_Pro, click to link below to confirm your registration",
        html: `<h1>Click on link to confirm your registration</h1><a href="${confirmationUrl}/">Click</a>`,
    };
    await transport.sendMail(mailOptions);
}
