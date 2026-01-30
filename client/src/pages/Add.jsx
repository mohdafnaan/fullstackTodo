import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const Add = () => {
  const API = "http://localhost:5000/todo";
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  //optional
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getAllTodos = async () => {
    try {
      const response = await axios.get(`${API}/getalltodos`);
      // console.log(response.data);
      setTodos(response.data);
      console.log(todos);
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
        setError("Bhai kuch likh");
        return;
      }

      let response = await axios.post(`${API}/addtodo`, { title });
      // just one line is enough to add data
      // one line to call post api

      setTitle("");
      setSuccess(response.data.msg);
      getAllTodos();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-500 flex items-center justify-center p-4">
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

          <div className="flex gap-2 mb-5">
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
              placeholder="Add a new todo"
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
            />
            <button
              onClick={() => {
                addTodo();
              }}
              className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Todo
            </button>
          </div>

          <ul className="space-y-3">
            {todos.map((todo, index) => (
              <li
                key={todo._id}
                className="flex items-center justify-between bg-grey-900 border rounded-lg px-3 py-2"
              >
                <span className="text-black font-bold wrap-break-word">
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
