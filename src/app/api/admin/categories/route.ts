import connectDb from "@/lib/connectDb";
import { errorResponse, generateSlug, successResponse } from "@/lib/helpers";
import { isAuth } from "@/middleware/decode-user";
import Category from "@/models/category.model";

export async function POST(req: Request){
    try {
        const body = await req.json()

        if(!body.name){
            return successResponse({message:"Name is required",status:403, payload:{}})
        }

        // Check Auth & Admin
        const user = await isAuth();
        if(user?.role !== 'admin'){
            return errorResponse({message:"Permission not allow",status:403})
        }

        // Connect DB
        await connectDb();

        // Create category
        const slug = generateSlug(body.name)
        const category = await Category.create({...body,slug})
        

        return successResponse({message:"Create successfully",status:201, payload:{category}})
    } catch (error) {
        return errorResponse({message:"Sorver error"})
    }
}

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
            isDelete:false
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

export async function PUT (req: Request){
    try {
        const {ids,action} = await req.json();

          // Check Auth & Admin
        const user = await isAuth();
        if(user?.role !== 'admin'){
            return errorResponse({message:"Permission not allow",status:403})
        }

        await connectDb();
        const deleteIds = await Category.updateMany(
            { _id: {$in: ids } },
            { $set: {isDelete: action } }
        )
        
         return successResponse({message:"Successfully",status:200, payload:{ids:deleteIds}})
    } catch (error) {
        return errorResponse({message:"Sorver error"})
    }
}