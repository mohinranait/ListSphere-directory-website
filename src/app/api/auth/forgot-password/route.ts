import { forgotOtpTemplate } from "@/email-templates/forgot-password";
import { JWT_SECRET } from "@/lib/access-env";
import sendEmailByNodeMailer from "@/lib/email";
import { errorResponse, successResponse } from "@/lib/helpers";
import Otp from "@/models/otp.modal";
import { forgotPasswordSchema } from "@/validations/auth.schema";
import jwt from "jsonwebtoken"


// Forgot email 
export async function POST(req:Request) {
    try {
        const body = await req.json();
        const data = forgotPasswordSchema.parse(body);
        const {email} = data || {};

        // Generate OTP
        const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();

        // Delete all OTP for this email
        await Otp.deleteMany({email})

        // Create OTP for reset email
        await Otp.create({email, otp : generateOtp})

         const emailData = {
                emails: email,
                subject: "Reset password",
                text: "Hello world",
                html: forgotOtpTemplate({ otp:generateOtp, expiry_minutes: 10, company_name: "ListSphere", })
            }        


        try {
            // Send OTP for reset password
            await sendEmailByNodeMailer(emailData)
            return successResponse({message:"Send OTP for reset password", payload:"true", status:200}, )   
        } catch (emailError) {
            console.log(emailError);
            return errorResponse({message:"Error sending email", status:500})
        }

    } catch (error) {
        console.log({error});
        
        return errorResponse({message:"Sorver error"})
    }
}


// Verify reset OTP
export async function PUT(req:Request) {
    try {
        const body = await req.json();
        const otp = body.otp;

        if(!otp || otp?.length !== 6 ){
            return successResponse({ message:"Invalid OTP code", status: 101})
        }
        

        const existsOtp = await Otp.findOne({otp});
        
        if(!existsOtp){
            return successResponse({ message:"Invalid OTP code", status: 404})
        }

        // generate token
        const token = jwt.sign({otp}, JWT_SECRET, {expiresIn:"1h"} )

        return successResponse({message:"Verify successfull", payload:{token}, status:200})

    } catch (error) {
        console.log({error});
        
        return errorResponse({message:"Sorver error"}) 
    }
}


export async function PATCH(req: Request) {
    try {
        const body = await req.json();

        const {token, password} = body;

        const tokenData   =  jwt.verify(token, JWT_SECRET);

        const otp = tokenData as { otp : string};

        // find otp 
        const fintOtp = await Otp.findOne({otp});

        
        



    } catch (error) {
        console.log({error});
        return errorResponse({message:"Sorver error"})    
    }
}