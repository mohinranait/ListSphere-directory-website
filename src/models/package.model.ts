import { model, models, Schema } from "mongoose";

const packageSchema = new Schema({
    name: {
        type: String,
        trim:true,
    },
    price:{
        type : Number,
        default:0,
    },
    postLimit:{
        type : Number,
        default:0,
    },
    suggestion:{
        type : Boolean,
        default:false,
    },
    status:{
        type : Boolean,
        default:true,
    },
    isDelete:{
        type : Boolean,
        default:false,
    },
    priority:{
        type: Number,
        default:1,
    },
    options:[
        {
            name: {
                type: String,
            },
            access: {
                type: Boolean,
                default: false,
            },
        }
    ]
},{timestamps:true});

const Package = models.Package || model("Package", packageSchema);
export default Package