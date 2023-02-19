const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    text: { type: String, require: true},
    completed: { type: Boolean, default: false },
})

const Todo = mongoose.model("Todo", todoSchema);

// create a new todo item
const newTodo = new Todo({
    text: "Buy New Shirts",
    completed: false,
});

newTodo.save((err, todo) => {
    if (err) return console.error(err);
    console.log(todo);
});

Todo.find((err, todos) => {
    if (err) return console.error(err);
    console.log(todos);
})