const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Define Mongoose schema and model for todo items
const todoSchema = new mongoose.Schema({
    label: { type: String, required: true },
    completed: { type: Boolean, default: false }
});
const Todo = mongoose.model("Todo", todoSchema);

// Connect to MongoDB database using Mongoose
mongoose.connect("mongodb://localhost:27017/todos", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

// Define API routes for todo items
app.get("/todos", async (req, res) => {
    try {
    const todos = await Todo.find();
    res.json(todos);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

app.post("/todos", async (req, res) => {
    const todo = new Todo({
    label: req.body.label
    });
    try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (deletedTodo) {
        res.json({ message: "Todo deleted" });
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { label: req.body.label }, { new: true });
    if (updatedTodo) {
        res.json(updatedTodo);
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

// Start the server listening on port 3001
app.listen(3001, () => {
    console.log("Server started on port 3001");
});
