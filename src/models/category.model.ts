import { model, models, Schema } from "mongoose";

const categorySchema = new Schema({
    name:{
        type: String,
        trim: true,
        required:true,
    },
    slug:{
        type: String,
        trim: true,
        required:true,
    },
    icon:{
        type: String,
    },
    type :{
        type : String,
        enum:['image','icon'],
        default:'image'
    },
    status:{
        type: Boolean,
        default: true,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
},{timestamps:true});

const Category = models.Category || model("Category",categorySchema);

export default Category;