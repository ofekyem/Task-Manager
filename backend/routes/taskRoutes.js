const express = require("express");
const Task = require("../models/taskModel"); 
const auth = require("../middleware/auth"); 

const router = express.Router(); 

// Get /api/tasks - Get all tasks by the authenticated user
router.get("/",auth, async (req, res, next) => {
    try{ 
        const tasks = await Task.find({ userId: req.user.id }); 
        res.json(tasks); 

    } catch (error){
        next(error);
    }
});  

// POST /api/tasks - Create a new task
router.post("/", auth, async (req, res, next) => {
    try {
        const { title, description, priority } = req.body;  

        // Check if there is a title:
        if(!title || !title.trim()){
            const error = new Error("Title is required"); 
            error.status = 400; 
            throw error;
        } 

        // Check if priority is one of the options: 
        const priorityOptions = ["low", "medium", "high"]; 
        if(priority && !priorityOptions.includes(priority)){
            const error = new Error("Priority must be one of: low, medium, high");
            error.status = 422; 
            throw error; 
        }  

        // Create the new task with given parameters, and add it to mongoDB
        const task = new Task({
            title: title.trim(),
            description,
            priority,
            userId: req.user.id
        });  
        await task.save();
        res.status(201).json(task);
        
    } catch (error) {
        next(error);
    }
}); 

// PUT /api/tasks/:id - Update a task
router.put("/:id", auth, async (req, res, next) => {
    try { 
        const { title, description, priority } = req.body; 

        // Find the selected task in the users tasks by id in mongoDB
         const task = await Task.findOne({ _id: req.params.id, userId: req.user.id }); 

        // If not found return error
        if(!task){
            const error = new Error("Task not found");
            error.status = 404;
            throw error;
        } 

        // If given a new title, update the task in the list with the new title
        if(title !== undefined){
            if(!title.trim()){
                const error = new Error("Title cannot be empty"); 
                error.status = 400;
                throw error;
            } 
            task.title = title.trim();
        } 

        // If given a new description, update the task in the list with the new description
        if(description !== undefined){
            task.description = description;
        } 

        // If given a new priority, update the task in the list with the new priority
        if(priority !== undefined){
            const priorityOptions = ["low", "medium", "high"]; 
            if(!priorityOptions.includes(priority)){
                const error = new Error("Priority must be one of: low, medium, high");
                error.status = 422;
                throw error;
            }
            task.priority = priority;
        } 

        // Return the updated task
        await task.save();
        res.json(task);

    } catch (error) {
        next(error);
    }
}); 

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", auth, async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        // If not found return error
        if(!task){
            const error = new Error("Task not found");
            error.status = 404;
            throw error;
        } 

        // Return the deleted task
        res.json(task);

    } catch (error){
        next(error)
    }
});

// PATCH /api/tasks/:id/toggle - Toggle task completion status
router.patch("/:id/toggle", auth, async (req, res, next) => {
    try{ 
        // Find the selected task in the list
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        
        // If its not there then return error
        if(!task){
            const error = new Error("Task not found");
            error.status = 404;
            throw error;
        } 

        // Change the status of the task
        task.completed = !task.completed;

        // Return the updated task
        await task.save();
        res.json(task);

    } catch (error){
        next(error);    
    }
});

module.exports = router;