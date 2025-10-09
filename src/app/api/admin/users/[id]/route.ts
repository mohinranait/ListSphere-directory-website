import connectDb from "@/lib/connectDb";
import { errorResponse, successResponse } from "@/lib/helpers";
import { isAuth } from "@/middleware/decode-user";
import User from "@/models/user.model";

export async function GET(req: Request, {params}:{params:{id:string}}){
    try {
        
        const {id} = await  params
        const authUser = await isAuth();
        if(authUser?.role !== 'admin'){
            return errorResponse({message:"Update permission not allow",status:403})
        }
        
        // Connect DB
        await connectDb();
        const user = await  User.findById(id)
  
        return successResponse({message:"Success",status:200, payload: {user}})
    } catch (error) {
        return errorResponse({message:"Server error", status:500})
    }
}


// Update user By userID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const {id} = await params
   const body = await req.json();

   const authUser = await isAuth();
    if(authUser?.role !== 'admin'){
      return errorResponse({message:"Update permission not allow",status:403})
    }
    
    await connectDb()
    const user = await User.findByIdAndUpdate(id,{...body}, {new:true, runValidators:true})

    return successResponse({
      message: "Update successfully",
      status: 200,
      payload: {user},
    });
  } catch (error) {
    return errorResponse({ message: "Server error" });
  }
}
