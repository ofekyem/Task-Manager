import React, { useState, useEffect } from "react";
import {getTasks, createTask, updateTask, deleteTask, toggleTask,} from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import "./styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]); 
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // When app starts, use the loadTasks function
  useEffect(() => {
    loadTasks();
  }, []);

  // This function load to the state all the tasks from server using the api call
  async function loadTasks(){
    try{
      const data = await getTasks();
      setTasks(data);

    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  }

  // This function handles the creation of the new task using the api call to save it on the server and to checking for errors
  async function handleCreate(newTask) {
    try {
      const created = await createTask(newTask);
      setTasks([...tasks, created]);

    } catch (err){
      alert(err.message);
      console.error("Error creating task:", err.message);
    }
  }

  // This function handles the update of selected task using the api call to save the changes on the server and to checking for errors
  async function handleUpdate(id, updates) {
    try{
      const updated = await updateTask(id, updates);
      // Search the updated task in the state and update it locally
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));

    } catch (err){
      console.error("Error updating task:", err.message);
      alert(err.message);
    }
  }

  // This function handles the deletion of selected task using the api call to delete it on the server and to checking for errors
  async function handleDelete(id) {
    try{
      await deleteTask(id);
      // Search the deleted task in the state and remove it locally
      setTasks(tasks.filter((t) => t.id !== id));

    } catch (err){
      console.error("Error deleting task:", err.message);
      alert(err.message);
    }
  }

  // This function handles the toggling of selected task using the api call to toggle its completion status and to checking for errors
  async function handleToggle(id) {
    try{
      const toggled = await toggleTask(id);
      // Search the toggled task in the state and update it locally
      setTasks(tasks.map((t) => (t.id === id ? toggled : t)));

    } catch (err){
      console.error("Error toggling task:", err.message);
      alert(err.message);
    }
  }

  //this function  filters the tasks based on the filter value
  const filteredTasks = tasks.filter((t) => {
    if(filter === "completed"){
      return t.completed;
    } 
    if(filter === "pending"){
      return !t.completed;
    }
    // If filter is "all" we don't need to filter items
    return true; 
  }); 

  // This function filters the tasks first by the search term and then by the filter value
  const searchedTasks = filteredTasks.filter((task) => {
    const searchTerm = search.toLowerCase().trim();
    const title = task.title.toLowerCase();
    return title.includes(searchTerm);
  });

  return (
    <div className="App">
      <div className="app-header">
        <img src="/tasklogo.png" alt="Task Logo" className="app-logo" />
        <h1>Task Manager</h1>
      </div>
      <h4>Created by: Ofek Yemini</h4>
      
      <TaskForm onCreate={handleCreate} /> 

      <input
        type="text"
        placeholder="Search tasks by title..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> 

      <TaskFilter filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={searchedTasks}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}

export default App;
