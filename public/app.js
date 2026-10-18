// todo app with nodejs and express
const cl = console.log;

const express=require('express');

const app=express();
//define port number
const port=3000;
app.use(express.json());
const cors=require('cors');
app.use(cors());

let todos=[
    {
        "id": 1,
        "title": "Complete Node.js CRUD project",
        "category": "Development",
        "priority": "High",
        "completed": false,
        "due_date": "2026-10-20",
        "assigned_to": "Pandurang",
        "estimated_hours": 4,
        "description": "Finish building the full-stack Movie and Todo API endpoints."
    },
    {
        "id": 2,
        "title": "Review Git and GitHub workflow",
        "category": "Version Control",
        "priority": "Medium",
        "completed": true,
        "due_date": "2026-10-19",
        "assigned_to": "Pandurang",
        "estimated_hours": 1,
        "description": "Practice git init, git add, commit messages, and pushing to remote branches."
    },
    {
        "id": 3,
        "title": "Grocery shopping",
        "category": "Personal",
        "priority": "Medium",
        "completed": false,
        "due_date": "2026-10-21",
        "assigned_to": "Pandurang",
        "estimated_hours": 2,
        "description": "Buy fresh vegetables, milk, eggs, and household essentials."
    },
    {
        "id": 4,
        "title": "Prepare system architecture documentation",
        "category": "Work",
        "priority": "High",
        "completed": false,
        "due_date": "2026-10-25",
        "assigned_to": "Team Lead",
        "estimated_hours": 6,
        "description": "Draft backend separation of concerns and MVC pattern folder layout."
    },
    {
        "id": 5,
        "title": "Morning Workout Routine",
        "category": "Health",
        "priority": "Low",
        "completed": true,
        "due_date": "2026-10-18",
        "assigned_to": "Pandurang",
        "estimated_hours": 1,
        "description": "Complete 30 minutes of cardio and core strength exercises."
    },
    {
        "id": 6,
        "title": "Debug Express CORS middleware issue",
        "category": "Development",
        "priority": "High",
        "completed": true,
        "due_date": "2026-10-18",
        "assigned_to": "Pandurang",
        "estimated_hours": 1,
        "description": "Ensure frontend static client can talk to the backend port successfully."
    },
    {
        "id": 7,
        "title": "Read a technical book chapter",
        "category": "Learning",
        "priority": "Low",
        "completed": false,
        "due_date": "2026-10-22",
        "assigned_to": "Pandurang",
        "estimated_hours": 1,
        "description": "Read one chapter on advanced Node.js asynchronous event loops."
    },
    {
        "id": 8,
        "title": "Update resume and portfolio projects",
        "category": "Career",
        "priority": "Medium",
        "completed": false,
        "due_date": "2026-10-30",
        "assigned_to": "Pandurang",
        "estimated_hours": 3,
        "description": "Add newly structured Express CRUD applications to GitHub portfolio."
    },
    {
        "id": 9,
        "title": "Clean workspace and desk setup",
        "category": "Personal",
        "priority": "Low",
        "completed": false,
        "due_date": "2026-10-21",
        "assigned_to": "Pandurang",
        "estimated_hours": 1,
        "description": "Organize cables, wipe down monitors, and tidy up notebook notes."
    },
    {
        "id": 10,
        "title": "Backup local project repositories",
        "category": "Development",
        "priority": "High",
        "completed": false,
        "due_date": "2026-10-24",
        "assigned_to": "Pandurang",
        "estimated_hours": 1,
        "description": "Push all updated branch commits to GitHub to ensure proper data safety."
    }
]
// get all todo
app.get("/api/todo", (req, res) => {
    try {
        res.status(200).json({
            success: true,
            body: todos,
            message: "All todo fetched"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
})

// get todo by id

app.get("/api/todo/:id", (req, res) => {
    try {
        let todoId = req.params.id;
        let todoObj = todos.find(ele => ele.id === todoId);

        if (!todoObj) {
            res.status(404).json({
                success: false,
                message: "Todo item not found"
            })
        }

        res.status(200).json({
            success: true,
            message: `todo get Fetched with id ${todoId}`,
            body: todoObj
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Network level error",
            error: err.message
        })
    }
})

//remove todo by id

app.delete("/api/todo/:id", (req, res) => {
    try {
        let removeId = req.params.id;
        let getIndex = todos.findIndex(ele => ele.id === removeId);

        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "todo not found"
            })
        }
        let removeObj = todos.find(ele => ele.id === removeId);

        if (!removeObj) {
            return res.status(404).json({
                success: false,
                message: "Todo is not Found",
            })
        }

        todos.splice(getIndex, 1);

        res.status(200).json({
            success: true,
            message: "todo deleted successfully",
            body: removeObj
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "netwrok issue",
            error: err.message
        })
    }
})

// create new todo

app.post("/api/todo", (req, res) => {
    try {
        let createdObj = {
            ...req.body,
            id: Date.now().toString()
        }

        todos.push(createdObj);

        res.status(201).json({
            success: true,
            message: `Todo create successfully with id ${createdObj.id}`,
            body: createdObj
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Netwrok Error",
            error: err.message
        })
    }
})

// update todo 

app.patch("/api/todo/:id", (req, res) => {
    try {
        let updateId = req.params.id;

        let getIndex = todos.findIndex(ele => ele.id === updateId);

        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

        let obj = todos[getIndex];

        let updatedObj = {
            ...obj,
            ...req.body,
            id: updateId
        }

        todos[getIndex] = updatedObj;

        res.status(200).json({
            success: true,
            message: `Todo with id ${updateId} is Updated`,
            body: updatedObj
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Network Error",
            error: err.message
        })
    }
})
app.delete("/api/todo", (req, res) => {
    try {
        todos = [];
        res.status(200).json({
            success: true,
            message: "All todo deleted successfully",
            body: []
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Network Error",
            error: err.message
        })
    }
})  

app.listen(port, () => {
    cl(`Server is running on port ${port}`)
})