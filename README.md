# Task Manager App 

## Overview
A simple task manager built with React.js & Express.js.  
Users can create, edit, delete, toggle, filter, and search tasks.  
Tasks are displayed in a carousel. 

## Backend Setup
1. cd backend
2. npm install
3. npm start(runs on port 4000) 

## Frontend Setup
1. cd frontend
2. npm install
3. npm start(runs on port 3000) 

## API Endpoints
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle 

## Design Decisions 
- The carousel is built like this: Each time we show to the screen 3 tasks (if there are less so it will show only them), and by clicking
the arrow on the right or the left a transition is made and we will see the next 3 tasks 
we can continue to go next or prev with the arrows but once we passed the number of tasks that we have 
then it will return to the first three. This makes the carousel work smooth. 
- Had some time so i added the search feature to search for tasks by title. 

## Time Spent 
- Backend: 60 minutes 
- planing the Frontend look: 10 minutes. 
- Core functionallity of the Frontend: 80 minutes. 
- Styling all the components and pages: 50 minutes.  
- Add Search Bonus: 15 minutes. 
- Final Testing & Finallization: 25 minutes. 




