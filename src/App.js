import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddTodo = () => {
    setTodos([...todos, { id: Date.now(), label: "" }]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, label) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, label };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar onAddTodo={handleAddTodo} />
      <div className="container mx-auto py-8 px-8 lg:px-3 md:px-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center mb-4"
          >
            <input
              type="text"
              value={todo.label}
              onChange={(e) => handleEditTodo(todo.id, e.target.value)}
              placeholder="New Todo"
              className="w-4/5 py-2 px-4 mr-4 focus:outline-none focus:border-b-2 rounded-none"
            />
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className=" text-red-500 hover:text-red-700 text-4xl"
            >
              &#215;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
