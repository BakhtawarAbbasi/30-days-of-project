"use client";
import React, { useState, useEffect } from "react";
import TodoItem from "./todo-item";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
const [todos, setTodos] = useState<Todo[]>([]);
const [newTask, setNewTask] = useState("");
const { theme, toggleTheme } = useTheme();

// Load todos from localStorage when component mounts
useEffect(() => {
  try {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  } catch (error) {
    console.error("Failed to load todos from localStorage", error);
  }
}, []);

// Save todos to localStorage whenever the todos state changes
useEffect(() => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos to localStorage", error);
  }
}, [todos]);

const addTask = () => {
  if (newTask.trim() === "") return;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    task: newTask,
    completed: false,
};
  setTodos([...todos, newTodo]);
  setNewTask("");
};

const deleteTask = (id: string) => {
setTodos(todos.filter((todo) => todo.id !== id));
};

const editTask = (id: string, newTask: string) => {
  setTodos(
    todos.map((todo) => (todo.id === id ? { ...todo, task: newTask } : todo))
  );
};

const completeTask = (id: string) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

return (
  <div className={`p-6 max-w-xl mx-auto bg-pink-200 backdrop-blur-md rounded-xl shadow-md mt-2 border border-indigo-500 ${theme} sm:max-w-xl md:max-w-2xl lg:max-w-3xl`}>
    <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">📝 My Todo List</h1>
    <button onClick={toggleTheme} className="bg-gray-500 text-white center px-4 py-2 rounded mb-4 mx-auto block transition duration-300 outline-8 outline-yellow-800 hover:bg-slate-400">Toggle Theme</button>
    <div className="flex flex-col sm:flex-row mb-6">
    <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="What do you want to accomplish?" className="border w-full sm:w-2/3 border-gray-300 p-3 rounded-t-md sm:rounded-l-md sm:rounded-t-none flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <button onClick={addTask} className="bg-blue-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-b-md sm:rounded-r-md sm:rounded-b-none transition duration-300 ease-in-out">Add</button>
  </div>
      {todos.length === 0 ? (
        <p className="text-center text-gray-500 italic">No tasks available. Add a new task!</p>
      ) : (
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TodoItem
                key={todo.id}
                task={todo.task}
                completed={todo.completed}
                onComplete={() => completeTask(todo.id)}
                onDelete={() => deleteTask(todo.id)}
                onEdit={(newTask) => editTask(todo.id, newTask)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default TodoList;
