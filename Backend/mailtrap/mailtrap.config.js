import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: 'bishesnas@gmail.com', 
    pass: 'blrn gehx watt wpgm',     
   }
});

export const sender = 'bishesnas@gmail.com';  // Sender email
export const mailClient = transporter; // Nodemailer client for sending emails
// import { MailtrapClient } from "mailtrap";


// import dotenv from 'dotenv';

// dotenv.config();


// export const mailtrapClient = new MailtrapClient({
//   endpoint:process.env.MAILTRAP_ENDPOINT, token:process.env.MAILTRAP_TOKEN,
// });

// export const sender = {
//   email: "hello@sayitwithbox.com",
//   name: "sayitwithbox",
// };
