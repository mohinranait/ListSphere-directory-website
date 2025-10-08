import connectDb from "@/lib/connectDb";
import { errorResponse, successResponse } from "@/lib/helpers";
import Icon from "@/models/icon.model";


// GET ALL ICON FOR AdMIN
export async function GET(req: Request){
    try {        

        // Connect DB
        await connectDb();
        const query: Record<string, unknown> = { 
            isDelete:false,
            status: true
        };

        // GET all icons
        const icons = await Icon.find(query)        

        return successResponse({message:"Successfully",status:200, payload:{
            icons,
        }})
    } catch (error) {
        return errorResponse({message:"Sorver error"})
    }
}