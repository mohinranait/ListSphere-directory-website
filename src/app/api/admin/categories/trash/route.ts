import connectDb from "@/lib/connectDb";
import { errorResponse, successResponse } from "@/lib/helpers";
import { isAuth } from "@/middleware/decode-user";
import Category from "@/models/category.model";

// GET ALL CATEGORY FOR AdMIN
export async function GET(req: Request){
    try {
        const {searchParams} = new URL(req.url);
        let page = searchParams.get('page') || 1;
        let limit = searchParams.get('limit') || 10;
        const status = searchParams.get('status') || 'all'
        limit = Number(limit)
        page = Number(page)
        // Check Auth & Admin
        const user = await isAuth();
        if(user?.role !== 'admin'){
            return errorResponse({message:"Permission not allow",status:403})
        }

        // Connect DB
        await connectDb();

        const query: Record<string, unknown> = { 
             isDelete:true
        };

       // if admin wants to see all (no filter)
        if (!status || status === "all") {
            query.status = { $in: [true, false] };
        } 
        // if admin wants specific status
        else if (status === "true" || status === "false") {
            query.status = status === "true";
        }

        // GET all category
        const categories = await Category.find(query)
        // .limit(limit).skip(limit*page)
        

        return successResponse({message:"Successfully",status:200, payload:{categories}})
    } catch (error) {
        return errorResponse({message:"Sorver error"})
    }
}