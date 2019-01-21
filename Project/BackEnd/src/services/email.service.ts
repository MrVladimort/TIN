import nodemailer from "nodemailer";
import accessConfig from "../configs/access.config";
import serverConfig from "../configs/server.config";
import {winstonLogger} from "./logger.service";

let transporter: nodemailer.Transporter;

async function init() {
    transporter = nodemailer.createTransport(accessConfig.mailer);
    // const account = await nodemailer.createTestAccount();
    // transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: account.user, // generated ethereal user
    //         pass: account.pass, // generated ethereal password
    //     },
    // });
}

init();

export async function sendRegisterConfirmation(email: string, token: string): Promise<void> {
    const confirmationUrl = `${serverConfig.clientUrl}/confirm-email?token=${token}`;
    const mailOptions = {
        from: accessConfig.mailer.from,
        to: email,
        subject: "Hello from Tin_Pro, click to link below to confirm your registration",
        html: `<h1>Click on link to confirm your registration</h1><a href="${confirmationUrl}/">Click</a>`,
    };
    await transporter.sendMail(mailOptions);
    winstonLogger.info(`Confirmation email was sent with url: \n${confirmationUrl}`);
}
