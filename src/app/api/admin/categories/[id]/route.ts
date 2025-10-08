
import connectDb from "@/lib/connectDb";
import { errorResponse, generateSlug, successResponse } from "@/lib/helpers";
import { isAuth } from "@/middleware/decode-user";
import Category from "@/models/category.model";

// Soft Delete Category
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
   const { id } = await params;

   const user = await isAuth();
   
   if(user?.role !== 'admin'){
     return errorResponse({message:"Delete permission not allow",status:403})
    }
    
    await connectDb()
    const category = await Category.findByIdAndUpdate(id, {isDelete:true},{new:true, runValidators:true})

    return successResponse({
      message: "Delete successfully",
      status: 200,
      payload: {category},
    });
  } catch (error) {
    return errorResponse({ message: "Server error" });
  }
}

// Update Category By CategoryID
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
    const category = await Category.findByIdAndUpdate(id,{...body,slug}, {new:true, runValidators:true})

    return successResponse({
      message: "Update successfully",
      status: 200,
      payload: {category},
    });
  } catch (error) {
    return errorResponse({ message: "Server error" });
  }
}
