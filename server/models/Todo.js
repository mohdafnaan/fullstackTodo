import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        default :false
        
    }
})

let todoModel = mongoose.model("todo",todoSchema);

export default todoModel