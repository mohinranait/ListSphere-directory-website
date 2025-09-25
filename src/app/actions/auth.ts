'use server'
import { TLoginFrom } from "@/components/client/login-form";
import { apiError, ApiResponse, apiSuccess } from "@/lib/server-response";
import User from "@/models/user.model";
import { loginSchema } from "@/validations/auth.schema";
import bcryptjs from "bcryptjs";
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken"
import { JWT_LOGIN } from "@/lib/access-env";
import connectDb from "@/lib/connectDb";
import { isAuth } from "@/middleware/decode-user";
import { IUser } from "@/types/user.type";



// type TResponse = {message:string;status: number;payload?: any; success:boolean}

export interface TApiResponse<T = undefined> {
  success: boolean;
  message: string;
  status: number;
  payload?: T;
}

// Login server action
export const loginUser = async (
  payload: TLoginFrom
): Promise<ApiResponse<{ user: IUser }>> => {
  try {
    const data = loginSchema.parse(payload);
    const { email, password } = data;

    await connectDb();

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return apiError({ message: "Credential not match your record", status: 404 });
    }

    const matchPassword = bcryptjs.compareSync(password, user.password);
    if (!matchPassword) {
      return apiError({ message: "Invalid credentials", status: 401 });
    }

    // convert to plain object
    const plainUser = {
      ...user.toObject(),
      _id: user._id.toString(),
      createdAt: user.createdAt?.toISOString?.(),
      updatedAt: user.updatedAt?.toISOString?.(),
    };
    delete plainUser.password;

    const token = jwt.sign(
      { id: plainUser?._id, role: plainUser?.role },
      JWT_LOGIN,
      { expiresIn: "1h" }
    );

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return apiSuccess<{ user: IUser }>({
      message: "Login success",
      status: 200,
      payload: { user: plainUser },
    });
  } catch (error) {
    return apiError({ message: "server error" });
  }
};


// Find single user by userId
export const getSingleUser = async (): Promise<ApiResponse<{ user: IUser }>> => {
  try {
    const reqUser = await isAuth();
    if (!reqUser) return apiError({ message: "Unauthorized", status: 401 });

    await connectDb();

    const user = await User.findById(reqUser?.id);
    if (!user) return apiError({ message: "User not found", status: 404 });

    const userObj = {
      ...user.toObject(),
      _id: user._id.toString(),
      createdAt: user.createdAt?.toISOString?.(),
      updatedAt: user.updatedAt?.toISOString?.(),
    };

    delete userObj.password;

    return apiSuccess({ message: "Success", status: 200, payload: { user: userObj } });
  } catch (error) {
    return apiError({ message: "Server error" });
  }
};
