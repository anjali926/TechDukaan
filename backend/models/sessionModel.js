import mongoose from "mongoose";
const sessionSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

export const session = mongoose.model("session",sessionSchema)
