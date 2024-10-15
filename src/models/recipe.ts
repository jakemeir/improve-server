import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
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

 export default mongoose.model("Recipe",recipeSchema)