"use client";
import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

interface TodoItemProps {
  task: string;
  completed: boolean;
  onComplete: () => void;
  onDelete: () => void;
  onEdit: (newTask: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  completed,
  onComplete,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  return (
    <motion.div className={`flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm my-3 transition-all duration-300 transform hover:shadow-md hover:bg-gray-100 ${completed ? "opacity-50" : ""}`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
      {isEditing ? (
        <input className="border p-2 flex-grow rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" value={editedTask} onChange={(e) => setEditedTask(e.target.value)}/>
      ) : (
        <span className={`flex-grow text-lg ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>
          {task}
        </span>
      )}

      <div className="flex space-x-3">
        {isEditing ? (
          <button onClick={handleSave} className="text-indigo-600 font-bold px-3 py-1 hover:text-indigo-800">Save</button>
        ) : (
          <>
            <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
              <FaEdit />
            </button>
            <button onClick={onComplete} className="text-green-500 hover:text-green-700 transition duration-300 ease-in-out">
              <FaCheckCircle />
            </button>
          </>
        )}
        <button onClick={onDelete} className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out">
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
};

export default TodoItem;
