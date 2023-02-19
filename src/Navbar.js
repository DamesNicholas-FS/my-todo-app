import React from "react";

const Navbar = ({ onAddTodo }) => {
  return (
    <nav className="flex justify-between items-center bg-blue-500 p-6">
        <h1 className="font-bold text-xl text-white">Todo</h1>
          <button
            onClick={onAddTodo}
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-700 hover:bg-blue-600"
          >
            New
          </button>
    </nav>
  );
};

export default Navbar;