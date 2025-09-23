import connectDb from "@/lib/connectDb";
import jwt from "jsonwebtoken";
import { JWT_SECRET, SALT_ROUNDS } from "@/lib/access-env";
import Otp from "@/models/otp.modal";
import bcrypt from "bcrypt";
import User from "@/models/user.model";
import { errorResponse, successResponse } from "@/lib/helpers";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { otp, token } = body; 

        const tokenData   =  jwt.verify(token, JWT_SECRET);

        
        // Connect to database
        await connectDb();



        const { otpId } = tokenData as { otpId: string }; 
        const findOtp = await Otp.findById(otpId);

        

        if (!findOtp) {
            return new Response(JSON.stringify({ success: false, message: "Invalid token or OTP" }), { status: 400 });
        }

        if (findOtp.otp !== otp) {
            return new Response(JSON.stringify({ success: false, message: "Invalid OTP" }), { status: 400 });
        }



         // Check existing user
        const existingUser = await User.exists({ email: findOtp.email });
        if (existingUser) {
            return NextResponse.json(
                { 
                    message: "User already exists", 
                    errors: { email: "This email already exists" }
                }, 
                { status: 400 }
            );
        }



        // hash password
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(findOtp.password, salt);
        const userData = {
            fullName: findOtp.fullName,
            email: findOtp.email,
            password: hashedPassword,
            isEmailVerified: true
        }

        // create user
        await User.create(userData);
        await Otp.findByIdAndDelete(otpId);
        return successResponse({message:"User registered successfully", payload:{user:"Registerd"},status:201})


    } catch (error) {
        console.log({error});
        return errorResponse({message: "Somthing wrong"})
    }
}