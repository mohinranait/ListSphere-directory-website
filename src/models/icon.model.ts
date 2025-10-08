import { model, models, Schema } from "mongoose";

const  iconSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required:true,
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

const Icon = models.Icon || model("Icon", iconSchema);

export default Icon;