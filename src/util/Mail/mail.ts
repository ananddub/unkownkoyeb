import nodemailer from 'nodemailer';
import 'dotenv/config'
import { html } from './html.js';
interface Props {
    email: string,
    code: string,
    device: string
}
export async function sendEmail({ email, code, device }: Props) {
    try {
        const host: any = process.env.EMAIL_HOST
        const port: any = process.env.EMAIL_PORT
        const transport = nodemailer.createTransport({
            host: host,
            port: port,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        return await transport.sendMail({
            from: 'Unknown Teams',
            to: email,
            subject: "Verfication Code ✔",
            text: "verify your email ",
            html: html(email, code, device),
        });
    } catch (e) {
        console.log(e)
    }

}
