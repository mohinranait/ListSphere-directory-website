import connectDb from "@/lib/connectDb";
import { errorResponse, successResponse } from "@/lib/helpers";
import { isAuth } from "@/middleware/decode-user";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "@/lib/access-env";

// Create new user for admin
export async function POST(req: Request){
    try {
        const body = await req.json();
        const {fullName, email,password,package:plan,phone,role,isEmailVerified} = body || {}

        if(!fullName){
            return successResponse({message:"Full name is required",status:403, payload:{}})
        }

        if(!email){
            return successResponse({message:"Email is required",status:403, payload:{}})
        }

        // Check Auth & Admin
        const authUser = await isAuth();
        if(authUser?.role !== 'admin'){
            return errorResponse({message:"Permission not allow",status:403})
        }



        // Connect DB
        await connectDb();


        // Check existing user
        const existingUser = await User.exists({ email });
        if (existingUser) {
            return NextResponse.json(
                { 
                    message: "User already exists", 
                    errors: { email: "This email already exists" }
                }, 
                { status: 400 }
            );
        }


        // Create user
         // hash password
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            fullName,
            email,
            password: hashedPassword,
            package: plan,
            role,
            isEmailVerified,
            phone
        }

        // create user
        const user = await User.create(userData);

        return successResponse({message:"Create successfully",status:201, payload:{user}})
    } catch (error) {
        return errorResponse({message:"Sorver error"})
    }
}

export async function GET(req: Request){
    try {
        const {searchParams} = new URL(req.url);
        let limit = searchParams.get('limit') || 10;
        let page = searchParams.get('page') || 1;
        const role = searchParams.get('role') || '';
        const search = searchParams.get('search') || '';
        limit = Number(limit)
        page = Number(page)
        const searchText = new RegExp('.*'+search+'.*','i')

        // Connect DB
        await connectDb();
        const query : Record<string , unknown>= {}
        if(search){
            query.$or = [
                { fullName : { $regex: searchText } },
                { email : { $regex: searchText } },
                { phone : { $regex: searchText } },
            ]
        }

        if(role){
            query.role = role
        }

        const users = await User.find(query).skip( limit * (page - 1) ).limit(limit)
        return successResponse({message:"Success",status:200, payload: {users}})
    } catch (error) {
        return errorResponse({message:"Server error", status:500})
    }
}