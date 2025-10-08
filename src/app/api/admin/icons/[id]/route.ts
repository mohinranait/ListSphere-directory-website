
import connectDb from "@/lib/connectDb";
import { errorResponse, generateSlug, successResponse } from "@/lib/helpers";
import { isAuth } from "@/middleware/decode-user";
import Icon from "@/models/icon.model";

// Soft Delete icon
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
   const { id } = await params;

    const user = await isAuth();
    if(user?.role !== 'admin'){
      return errorResponse({message:"Delete permission not allow",status:403})
    }
    
    await connectDb()
    const icon = await Icon.findByIdAndDelete(id)

    return successResponse({
      message: "Delete successfully",
      status: 200,
      payload: {icon},
    });
  } catch (error) {
    return errorResponse({ message: "Server error" });
  }
}

// Update icon By IconID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const {id} = await params
   const body = await req.json();

   const user = await isAuth();
    if(user?.role !== 'admin'){
      return errorResponse({message:"Update permission not allow",status:403})
    }
    
    await connectDb()
    const slug = generateSlug(body.name)
    const icon = await Icon.findByIdAndUpdate(id,{...body,slug}, {new:true, runValidators:true})

    return successResponse({
      message: "Update successfully",
      status: 200,
      payload: {icon},
    });
  } catch (error) {
    return errorResponse({ message: "Server error" });
  }
}
