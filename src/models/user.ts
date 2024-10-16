import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
          type: String,
          required: true, 
          unique: true,   
      },
      password: {
          type: String,
          required: true,    
      },
      role: {
        type: String,
        default: 'user',    
      },
      additionalData:{
        type: String,
        default: '',
      },
      createdAt: {
        type: Date,
        default: Date.now, 
      },
    }
)

 export default mongoose.model("User",userSchema)
