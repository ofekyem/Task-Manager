const API_URL = "http://localhost:4000/api/tasks"; 

// Get all existing tasks from server
export async function getTasks(){ 

    // Api call to fetch all tasks
    const res = await fetch(API_URL); 

    // Handle error
    if(!res.ok){
        throw new Error("Failed to fetch tasks");
    } 
    return res.json();
} 

// Create a new task and save it in the server if valid
export async function createTask(task){ 

    // Api call to create a new task
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    }); 

    // Handle error responses
    if(!res.ok){
        if(res.status === 400){
            throw new Error("Please provide a title");
        } 
        else if(res.status === 422){
            throw new Error("Please select a valid priority");
        } 
        else{
            throw new Error("Failed to create task");
        }
    }
    return res.json();
}  

// Update an existing task
export async function updateTask(id, updates){ 

    // Api call to update a task
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });

    // Handle error responses
    if (!res.ok) {
        if(res.status === 400){
            throw new Error("Please provide a title");
        } 
        else if(res.status === 404){
            throw new Error("Task not found in server");
        }
        else if(res.status === 422){
            throw new Error("Please select a valid priority");
        } 
        else{
            throw new Error("Failed to update task");
        }
    }
    return res.json();
} 

// Delete a task by id
export async function deleteTask(id){ 

    // Api call to delete a task
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE", 
    }); 

    // Handle error responses
    if (!res.ok) {
        if(res.status === 404){
            throw new Error("Task not found in server");
        }
        else{
            throw new Error("Failed to delete task");
        }
    }
    return res.json();
} 

// Toggle a task by id
export async function toggleTask(id){ 

    // Api call to toggle task
    const res = await fetch(`${API_URL}/${id}/toggle`, {
        method: "PATCH",
    }); 

    // Handle error responses
    if (!res.ok) {
        if(res.status === 404){
            throw new Error("Task not found in server");
        }
        else{
            throw new Error("Failed to toggle task");
        }
    } 
    return res.json();
}
