import { errorResponse, successResponse } from "@/lib/helpers";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        if(!body.password){
            return successResponse({ message:"Password field is required", status: 101})
        }

        

    } catch (error) {
        return errorResponse({message:"Somthing wrong"})
    }
}