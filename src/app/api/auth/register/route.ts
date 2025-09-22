import { registerSchema } from "@/lib/auth.validation";
import { formatZodError, successResponse } from "@/lib/helpers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "@/lib/access-env";
import connectDb from "@/lib/connectDb";
import User from "@/models/user.model";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = registerSchema.parse(body);

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


        // hash password
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;

        // create user
        const user = await User.create(data);


        return successResponse({message:"User registered successfully", payload:{user},status:201})
    } catch (error) {
        console.log(error);

        if(error instanceof ZodError ){
            const errors = formatZodError(error)
            return NextResponse.json({message:"Validation error",errors},{status:400})
        }
        
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}