import React, { useState } from "react"; 
import "../styles/TaskForm.css";

// This component is for the form of creating a new task
function TaskForm({ onCreate }){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (!title.trim()){
            return;
        }

        onCreate({ title, description, priority });

        // Reset form fields after creating
        setTitle("");
        setDescription("");
        setPriority("low");
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /> 

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            /> 

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select> 

            <button type="submit">Add Task</button> 
            
        </form>
    );
}

export default TaskForm;
