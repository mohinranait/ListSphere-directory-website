import { model, models, Schema } from "mongoose";

const otpSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
},{timestamps:true});

const Otp = models.Otp || model("Otp", otpSchema);
export default Otp;