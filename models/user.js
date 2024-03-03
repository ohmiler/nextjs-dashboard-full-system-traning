import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },  
        role: {
            type: String,
            required: false,
            default: "user"
        }
    }, 
    { timestamps: true }
);

// ถ้ามี user model แล้วให้ใช้ตัวเดิม ถ้ายังไม่มีให้สร้าง user model ใหม่
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

