import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER!,
        pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD!,
    },
});


/**
 * Send email using nodemailer
*/
const sendEmailByNodeMailer = async (data:any) =>  {

    try {
        const mailData = {
            from: process.env.NEXT_PUBLIC_SMTP_USER!, 
            to: data.emails, 
            subject: data.subject, 
            text: data.text, 
            html: data.html,
          }
        const info = await transporter.sendMail(mailData);
        
        
        console.log("Message sent ID: %s", info.messageId);
        console.log("Message sent ReS: %s", info.response);
    } catch (error) {
        console.error(error);
        throw error
    }
  
}

export default sendEmailByNodeMailer