import React, { useEffect, useState } from "react";
import api from "../global/axios";
import "../styles/mytask.css";

interface TodoItem {
  _id: string;
  text: string;
  completed: boolean;
}

interface Todo {
  _id: string;
  title: string;
  description: string;
  items: TodoItem[];
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/user/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      await api.delete(`/user/delete/${todoId}`);
      setTodos(prev => prev.filter(todo => todo._id !== todoId));
    } catch (err) {
      console.error(err);
    }
  };
return (
  <div className="todo1-container">
    <h2 className="page-title">To-do List</h2>

    <div className="todo-grid">
      {todos.map((todo) => (
        <div key={todo._id} className="todo-card">
          
          <div className="todo-section">
            <span className="todo-label">Title</span>
            <div className="todo-header">
              <h3>{todo.title}</h3>
            </div>
          </div>

          <div className="todo-section">
            <span className="todo-label">Description</span>
            <p className="todo-description">{todo.description}</p>
          </div>

          <div className="todo-section">
            <span className="todo-label">Tasks</span>
            <ul className="todo-items">
              {todo.items.map((item) => (
                <li key={item._id}>{item.text}</li>
              ))}
            </ul>
          </div>

          <button
            className="delete-btn"
            onClick={() => deleteTodo(todo._id)}
          >
            Delete 
          </button>
        </div>
      ))}
    </div>
  </div>

);
};

export default TodoList;
