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
    imgPath:{
        type:String,
        required: true
    },
    ingredients:{
        type:[String],
        required: true
    },
    instruction:{
        type: String,
        required: true

    }


    
 }
)

 export default mongoose.model("Exercise",exerciseSchema)