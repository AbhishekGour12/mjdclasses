import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,
        lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
     },
    password: { type: String, required: true },
    phone: {type: Number, length: 10},
    classes: { type: String, required: true },
    stream: { type: String },
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    payment: {type: Boolean, default: false}
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;