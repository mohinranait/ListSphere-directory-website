import { registerSchema } from "@/lib/auth.validation";
import { formatZodError, successResponse } from "@/lib/helpers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";



import { JWT_SECRET, SALT_ROUNDS } from "@/lib/access-env";
import connectDb from "@/lib/connectDb";
import User from "@/models/user.model";
import jwt from "jsonwebtoken"
import sendEmailByNodeMailer from "@/lib/email";
import { verifyEmailTemplate } from "@/email-templates/verify-email-template";
import Otp from "@/models/otp.modal";





export async function POST(req: Request) {
    try {
        const CLIENT_URL =  "http://localhost:3000"
        const body = await req.json();
        const data = registerSchema.parse(body);
        const { fullName, email, password } = data;

        // Connect to database
        await connectDb();

        // Check existing user
        const existingUser = await User.exists({ email: data.email });
        if (existingUser) {
            return NextResponse.json(
                { 
                    message: "User already exists", 
                    errors: { email: "This email already exists" }
                }, 
                { status: 400 }
            );
        }


        // Generate OTP and token`
        const generateOpt = Math.floor(100000 + Math.random() * 900000).toString();
       
  

         const OTP = await Otp.create({ email, otp:generateOpt, password, fullName });

          // Generate JWT token
        const token = jwt.sign({otpId: OTP?._id } , JWT_SECRET ,{expiresIn:'1h'})


     

        const emailData = {
                    emails: email,
                    subject: "Account verify email",
                    text: "Hello world",
                    html: verifyEmailTemplate({fullName, otp:generateOpt, token, expiry_minutes: 60, company_name: "ListSphere", CLIENT_URL})
                }
        
          try {
              // Send email for email verification
              await sendEmailByNodeMailer(emailData)

              const redirectUrl = `${CLIENT_URL}/verify?token=${token}`

              return NextResponse.redirect(new URL(redirectUrl, req.url), { status: 302 })
             
          } catch (emailError) {
              console.log(emailError);
              return NextResponse.json({message:"Error sending email"},{status:500})
          }


    } catch (error) {
        console.log(error);

        if(error instanceof ZodError ){
            const errors = formatZodError(error)
            return NextResponse.json({message:"Validation error",errors},{status:400})
        }
        
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}