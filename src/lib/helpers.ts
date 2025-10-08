import { NextResponse } from "next/server";
import { ZodError } from "zod";

// formate zod errors to a simple object
export function formatZodError(error: ZodError) {
    const formatted: Record<string, string> = {};
    error?.issues.forEach((err) => {
        const field = err.path[0]; 
        if (field) {
            formatted[field as string] = err.message;
        }
    });
    return formatted;
}




// Success response helper method
export function successResponse({message, payload, status=200}:{message:string, payload?:unknown, status?:number}) {
    return NextResponse.json({message, payload, success:true},{status})
}

// Error response helper function
export function errorResponse ({message, status=500}:{message:string;status?:number}) {
    return NextResponse.json({message, status,success:false})
}


// Generate slug
export function generateSlug(text:string) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()   
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

