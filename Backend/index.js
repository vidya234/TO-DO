
//write basic express boilerplate code,
// with express.json() middleware

// zod
// we can do it in the require format also just like express
//import { ParseStatus } from 'zod';
const { createtodo, updatetodo } = require('./types');
const {todo} = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());
//post
//body --> title . description
// POST route to create a new todo
app.post("/todo", async (req, res) => {
    try {
        // Extract payload from request body
        const createPayload = req.body;

        // Validate payload using Zod
        const parsedPayload = createtodo.safeParse(createPayload);

        // Check if validation was successful
        if (!parsedPayload.success) {
            return res.status(411).json({
                msg: "You have sent the wrong input"
            });
        }

        // MongoDB: Create a new todo
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed : false
        });

        // Return success response
        return res.json({
            msg: "Todo created"
        });
    } catch (error) {
        // Log the error and return a 500 status code
        console.error(error);
        return res.status(500).json({
            msg: "Failed to create todo"
        });
    }
});

// GET route to retrieve all todos
app.get("/todo", async (req, res) => {
    try {
        //console.log("done");
        // MongoDB: Retrieve all todos
        const todos = await todo.find({});

        // Check if todos were found
        if (todos) {
            return res.json({
                todos
            });
        } else {
            // Return 404 if no todos found
            return res.status(404).json({
                msg: "No todos found"
            });
        }
    } catch (error) {
        // Log the error and return a 500 status code
        console.error(error);
        return res.status(500).json({
            msg: "Failed to retrieve todos"
        });
    }
});


app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updatetodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You have sent the wrong input"
        });
        return;
    }

    try {
        // Fetch the current todo item from the database
        const currentTodo = await todo.findById(updatePayload.id);

        // Check if the todo item exists
        if (!currentTodo) {
            res.status(404).json({
                msg: "Todo not found"
            });
            return;
        }

        // Update the todo item with the opposite completed status
        console.log(currentTodo.completed);
        await todo.findByIdAndUpdate(updatePayload.id, {
            completed: !currentTodo.completed
        });

        res.json({
            msg: "Todo status updated"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error updating todo",
            error: error.message
        });
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
