const express = require("express");
const router = express.Router(); 

// The "Task" model: 
class Task{ 
    constructor(id, title, description, priority = "low"){
        this.id = id; 
        this.title = title; 
        this.description = description; 
        this.completed = false; // When the task is created its still not complete
        this.createdAt = new Date(); // The current date
        this.priority = priority; // Can be "low" or "medium" or "high"
    }
}  

// the list of existing tasks: 
let tasks = []; 
// id counter:
let nextId = 1;

// Get /api/tasks - Get all tasks
router.get("/", (req, res, next) => {
    try{ 
        res.json(tasks); 

    } catch (error){
        next(error);
    }
});  

// POST /api/tasks - Create a new task
router.post("/", (req, res, next) => {
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

        // Create the new task with given parameters, increase the id counter and push it to the existing tasks list.
        const newTask = new Task(nextId, title.trim(), description, priority); 
        nextId++; 
        tasks.push(newTask); 
        res.status(201).json(newTask); 

    } catch (error) {
        next(error);
    }
}); 

// PUT /api/tasks/:id - Update a task
router.put("/:id", (req, res, next) => {
    try { 
        const id = Number(req.params.id);
        const { title, description, priority } = req.body; 

        // Find the selected task in the list
        const task = tasks.find(t => t.id === id);  

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
        res.json(task); 

    } catch (error) {
        next(error);
    }
}); 

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", (req, res, next) => {
    try{
        const id = Number(req.params.id);

        // Find index of selected task by given id
        const index = tasks.findIndex(t => t.id === id); 

        // If not found return error
        if(index === -1){
            const error = new Error("Task not found");
            error.status = 404;
            throw error;
        } 

        // Delete the task from the list by index
        const [deletedTask] = tasks.splice(index, 1);

        // Return the deleted task
        res.json(deletedTask);

    } catch (error){
        next(error)
    }
});

// PATCH /api/tasks/:id/toggle - Toggle task completion status
router.patch("/:id/toggle", (req, res, next) => {
    try{ 
        const id = Number(req.params.id);
        // Find the selected task in the list
        const task = tasks.find(t => t.id === id); 

        // If its not there then return error
        if(!task){
            const error = new Error("Task not found");
            error.status = 404;
            throw error;
        } 

        // Change the status of the task
        task.completed = !task.completed;

        // Return the updated task
        res.json(task);

    } catch (error){
        next(error);    
    }
});

module.exports = router;