import { SALT_ROUNDS } from "@/lib/access-env";
import connectDb from "@/lib/connectDb";
import { errorResponse, successResponse } from "@/lib/helpers";
import { isAuth } from "@/middleware/decode-user";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request, {params}:{params:{id:string}}){
    try {
        const {id} = await params;
        if(!id){
            return;
        }
        const body = await req.json();
        const {password} = body || {}

        if(!password){
            return successResponse({message:"Password is required",status:403, payload:{}})
        }

        // Check Auth & Admin
        const authUser = await isAuth();
        if(authUser?.role !== 'admin'){
            return errorResponse({message:"Permission not allow",status:403})
        }

        // Connect DB
        await connectDb();

        // Check existing user
        const existingUser = await User.exists({ _id:id });
        if (!existingUser) {
           return errorResponse({message:"User not found",status:404})
        }

         // hash password
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user
        let user = await User.findByIdAndUpdate(id, {password: hashedPassword},{new:true, runValidators:true});
        user = user.toObject()
        delete user.password
        return successResponse({message:"Password changed successfully",status:201, payload:{user}})
    } catch (error) {
        return errorResponse({message:"Sorver error"})
    }
}