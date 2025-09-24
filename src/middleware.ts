import {  NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT_LOGIN } from "./lib/access-env";
import { jwtVerify } from "jose";

export async function middleware (request: NextRequest){
    const token = request.cookies.get("token")?.value;
    console.log({token});
    
    if (!token) {   
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {

        const secret = new TextEncoder().encode(JWT_LOGIN);
        const {payload} = await jwtVerify(token, secret)

        if( payload.role !== 'admin' ){
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next();

    } catch (error) {
        console.log("Error block ");
        
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
     matcher: ["/admin/:path*"],
}