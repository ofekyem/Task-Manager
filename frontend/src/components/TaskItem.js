import React, { useState } from "react"; 
import "../styles/TaskItem.css";

// This component represents a single task item
function TaskItem({ task, onDelete, onToggle, onUpdate }) { 
    // state to know if the task is in edit mode
    const [isEditing, setIsEditing] = useState(false); 

    // states for the parameters of the task:
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description); 
    const [priority, setPriority] = useState(task.priority); 

    // When we finished editing, we call the onUpdate and finish edit mode
    const handleSave = () => {
        onUpdate(task._id, { title, description, priority });
        setIsEditing(false);
    }; 

    return (
        <div className={`task-item ${task.completed ? "completed" : ""}`}>
            {isEditing ? (
                <div className="task-edit">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <div className="task-actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
                </div>
            ) : (
                <>
                <div className="task-header">
                    <h3>{task.title}</h3>
                    <span className={`badge ${task.priority}`}>{task.priority}</span>
                </div>

                <p className="task-desc">{task.description}</p>
                <p>
                    <strong>Created at:</strong>{" "}
                    {new Date(task.createdAt).toLocaleString()} 
                </p>
                <span
                    className={`badge ${task.completed ? "completed" : "pending"}`}
                >
                    {task.completed ? "Completed" : "Pending"}
                </span>

                <div className="task-actions">
                    <button onClick={() => onToggle(task._id)}>
                    {task.completed ? "Mark as Pending" : "Complete"}
                    </button>
                    {!task.completed && (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    )}
                    <button onClick={() => onDelete(task._id)}>
                    Delete
                    </button>
                </div>
                </>
            )}
        </div>

    );
}

export default TaskItem;
