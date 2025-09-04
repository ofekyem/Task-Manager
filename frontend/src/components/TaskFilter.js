import React from "react";

// This component shows options to filter tasks
function TaskFilter({ filter, setFilter }) {
    return (
        <div className="task-filter">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
            <button onClick={() => setFilter("pending")}>Pending</button>
        </div>
    );
}

export default TaskFilter;
