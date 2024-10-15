import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
 {
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    sets:{
        type: Number,
        required: true
    },
    times:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default:false,

    },
    imgPath:{
        type:String,
        required: true
    }


    
 }
)

 export default mongoose.model("Exercise",exerciseSchema)