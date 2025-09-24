'use server'
import { TLoginFrom } from "@/components/client/login-form";
import { apiError, apiSuccess } from "@/lib/server-response";
import User from "@/models/user.model";
import { loginSchema } from "@/validations/auth.schema";
import bcryptjs from "bcryptjs";
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken"
import { JWT_LOGIN } from "@/lib/access-env";
import connectDb from "@/lib/connectDb";
import { isAuth } from "@/middleware/decode-user";



type TResponse = {message:string;status: number;payload?: any; success:boolean}

// Login server action
export const loginUser = async (payload: TLoginFrom) :Promise<TResponse>  =>  {
  try {
    const data = loginSchema.parse(payload);
    const { email, password } = data;
    
    
    await connectDb()

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return apiError({ message: "Credential not match your record", status: 404 });
    }

    const matchPassword = bcryptjs.compareSync(password, user.password);
    if (!matchPassword) {
      return apiError({ message: "Invalid credentials", status: 401 });
    }

    // convert to plain object (fix _id, dates)
    const plainUser = {
      ...user.toObject(),
      _id: user._id.toString(),
      createdAt: user.createdAt?.toISOString?.(),
      updatedAt: user.updatedAt?.toISOString?.(),
    };
    delete plainUser.password;

  
    const token = jwt.sign({id: plainUser?._id,role: plainUser?.role } , JWT_LOGIN ,{expiresIn:'1h'})

    const cookieStore = await cookies()

     cookieStore.set({
        name: "token",
        value: token,
        httpOnly: true,     
        path: "/",          
        maxAge: 60 * 60 * 24, 
        sameSite: "lax",    
        secure: process.env.NODE_ENV === "production",
    });

    

    return apiSuccess({
      message: "Login success",
      status: 200,
      payload: { user: plainUser },
    });
  } catch (error) {
    return apiError({ message: "server error" });
  }
};


// Find single user by userId
export const getSingleUser = async ()  => {
  try {
   const reqUser = await isAuth()
    if(!reqUser) return;

    await connectDb()

    const user = await User.findById(reqUser?.id );
    const userObj = {
      ...user.toObject(),
      _id: user._id.toString(),
      createdAt: user.createdAt?.toISOString?.(),
      updatedAt: user.updatedAt?.toISOString?.(),
    }

    delete userObj.password

    return apiSuccess({message:"Success", status:200, payload: {user: userObj} })
  } catch (error) {
    return apiError({message:"Server error"})
  }
}
