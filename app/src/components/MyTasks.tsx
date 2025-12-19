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
    <div className="todo-container">
      {todos.map(todo => (
        <div key={todo._id} className="todo-card">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>

          <ul className="todo-items">
            {todo.items.map(item => (
              <li
                key={item._id}
                className={item.completed ? "completed" : ""}
              >
                {item.text}

               
              </li>
            ))}
          </ul>

          <button
            className="delete-btn"
            onClick={() => deleteTodo(todo._id)}
          >
            Delete Todo
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
