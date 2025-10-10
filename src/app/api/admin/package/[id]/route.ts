
import connectDb from "@/lib/connectDb";
import { errorResponse, generateSlug, successResponse } from "@/lib/helpers";
import { isAuth } from "@/middleware/decode-user";
import Package from "@/models/package.model";

// Delete Package
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
   const { id } = await params;

    const authUser = await isAuth();
    if(authUser?.role !== 'admin'){
      return errorResponse({message:"Delete permission not allow",status:403})
    }
    
    await connectDb()
    const plan = await Package.findByIdAndDelete(id)

    return successResponse({
      message: "Delete successfully",
      status: 200,
      payload: {plan},
    });
  } catch (error) {
    return errorResponse({ message: "Server error" });
  }
}

// Update package By packageId
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const {id} = await params
   const body = await req.json();

   const authUser = await isAuth();
    if(authUser?.role !== 'admin'){
      return errorResponse({message:"Update permission not allow",status:403})
    }
    
    await connectDb()
    const plan = await Package.findByIdAndUpdate(id,{ ...body}, {new:true, runValidators:true})

    return successResponse({
      message: "Update successfully",
      status: 200,
      payload: {plan},
    });
  } catch (error) {
    return errorResponse({ message: "Server error" });
  }
}
