import connectDb from "@/lib/connectDb";
import { errorResponse, successResponse } from "@/lib/helpers";
import { isAuth } from "@/middleware/decode-user";
import Package from "@/models/package.model";

// Create Plan/Package
export async function POST(req: Request){
    try {
        const body = await req.json()

        if(!body.name){
            return successResponse({message:"Name is required",status:403, payload:{}})
        }

        // Check Auth & Admin
        const authUser = await isAuth();
        if(authUser?.role !== 'admin'){
            return errorResponse({message:"Permission not allow",status:403})
        }

        // Connect DB
        await connectDb();

        // Create package
        const plan = await Package.create({...body})
        
        return successResponse({message:"Create successfully",status:201, payload:{plan}})
    } catch (error) {
        return errorResponse({message:"Sorver error"})
    }
}

// GET ALL CATEGORY FOR AdMIN
export async function GET(req: Request){
    try {
        const {searchParams} = new URL(req.url);
        const status = searchParams.get('status') || 'all'
        const search = searchParams.get('search') || '';
        const searchText = new RegExp('.*'+ search + ".*",'i')
        // Check Auth & Admin
        const user = await isAuth();
        if(user?.role !== 'admin'){
            return errorResponse({message:"Permission not allow",status:403})
        }

        // Connect DB
        await connectDb();
        const query: Record<string, unknown> = { 
            isDelete:false,
        };

        if(search){
            query.$or= [
                {name : { $regex: searchText }},
                { slug : { $regex: searchText }},
            ]
        }

       // if admin wants to see all (no filter)
        if (!status || status === "all") {
            query.status = { $in: [true, false] };
        } 
        // if admin wants specific status
        else if (status === "true" || status === "false") {
            query.status = status === "true";
        }

        // GET all category
        const plans = await Package.find(query).sort({priority:1})
      
        

        return successResponse({message:"Successfully",status:200, payload:{
            plans,
        }})
    } catch (error) {
        return errorResponse({message:"Sorver error"})
    }
}
