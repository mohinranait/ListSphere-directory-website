import connectDb from "@/lib/connectDb";
import jwt from "jsonwebtoken";
import { JWT_SECRET, SALT_ROUNDS } from "@/lib/access-env";
import Otp from "@/models/otp.modal";
import bcrypt from "bcrypt";
import User from "@/models/user.model";
import { successResponse } from "@/lib/helpers";
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { otp, token } = body;
        console.log({ otp, token });
        
        // Connect to database
        await connectDb();

        const tokenData   =  jwt.verify(token, JWT_SECRET);

        console.log({ tokenData });
        const { otpId } = tokenData as { otpId: string }; 
        const findOtp = await Otp.findById(otpId);

        if (!findOtp) {
            return new Response(JSON.stringify({ success: false, message: "Invalid token or OTP" }), { status: 400 });
        }

        if (findOtp.otp !== otp) {
            return new Response(JSON.stringify({ success: false, message: "Invalid OTP" }), { status: 400 });
        }


        // hash password
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(findOtp.password, salt);
        const userData = {
            fullName: findOtp.fullName,
            email: findOtp.email,
            password: hashedPassword
        }

        // create user
        const user = await User.create(userData);
        await Otp.findByIdAndDelete(otpId);
        return successResponse({message:"User registered successfully", payload:{user},status:201})


    } catch (error) {
        
    }
}