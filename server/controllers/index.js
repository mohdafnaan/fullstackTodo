import express from "express";

import todoModel from "../models/Todo.js";

const router = express.Router();

router.get("/gettodos/:id", async (req,res)=>{
    try {
        let todoId = req.params.id
        let todos = await todoModel.find({_id : todoId})
        res.status(200).json(todos)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get("/getalltodos",async (req,res)=>{
    try {
        let allTodo = await todoModel.find()
        res.status(200).json(allTodo)
    } catch (error) {
        console.log(error)
        res.status(200).json(error)
    }
})

router.post("/addtodo",async (req,res)=>{
    try {
        let {title} = req.body;
        await todoModel.insertOne({title});
        res.status(201).json({msg : "todo added"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put("/update/:id",async (req,res)=>{
    try {
        let id = req.params.id
        let userinput = req.body;
        await todoModel.updateOne({_id : id},{$set:{title : userinput}})
        res.status(200).json({msg : "todo updated sucessfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
router.delete("/delete/:id",async (req,res)=>{
    try {
        let id = req.params.id;
        await todoModel.deleteOne({_id:id});
        res.status(200).json({msg : "task delted sucessfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete("/deleteall",async (req,res)=>{
    try {
        await todoModel.deleteMany();
        res.status(200).json({msg : "todos deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
export default router;