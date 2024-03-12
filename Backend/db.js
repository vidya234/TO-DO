// schema for mongo db
// npm install mongoose

/*
    todo: string;
    description: string;
    completed: false;
*/

const mongoose = require("mongoose");


// URL for MongoDB connection
// Note: In a real project, store sensitive information like database URLs in an environment variable or a configuration file.
mongoose.connect("mongodb+srv://vidya:zneTUrAc28xYNFu@cluster0.l2d0kro.mongodb.net/");

// Define the schema
const todoSchema = new mongoose.Schema({
    title:  String,
    description: String,
    completed: Boolean
});

// Create the model
const todo = mongoose.model('Todo', todoSchema);

module.exports = { 
    todo
};
