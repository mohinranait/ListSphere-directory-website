import { model, models, Schema } from "mongoose";
// User model
const userSchema = new Schema({
    fullName: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{ type: String, enum: ['user', 'admin'], default: 'user' },
    phone: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    package: { type: String, enum: ['free', "silver" ,'premium'], default: 'free' },
},{timestamps:true});

const User = models.User || model("User", userSchema);

export default User;
