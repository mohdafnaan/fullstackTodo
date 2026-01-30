import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Add = () => {
  const API = "http://localhost:5000/todo";
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getAllTodos = async () => {
    try {
      const response = await axios.get(`${API}/getalltodos`);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  useEffect(() => {
    getAllTodos();
  }, []);

  const addTodo = async () => {
    try {
      if (!title) {
        setError("task cant be empty");
        setTimeout(()=>{setError("")},1000)
        return
      }
      let response = await axios.post(`${API}/addtodo`, { title });
      setTitle("");
      setSuccess(response.data.msg);
      setTimeout(() => {
        setSuccess("")
      }, 1000);
      getAllTodos();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <>
      <div className="bg-gray-500 min-h-screen flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            TODO MERN STACK APP
          </h1>
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm text-center mb-3">{success}</p>
          )}
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo();
                }
              }}
              placeholder="Add new task"
              className="border-2 flex-1 rounded-lg px-3 py-2 focus:outline-none"
            />
            <button
              className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => addTodo()}
            >
              Add Task
            </button>
          </div>
          <ul className="space-y-3">
            {todos.map((todo, index) => (
              <li
                key={todo._id}
                className="flex items-center justify-between bg-gray-900 border rounded-lg px-3 py-2 "
              >
                <span className="text-white font-bold wrap-break-word">
                  {index + 1}. {todo.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Add;
