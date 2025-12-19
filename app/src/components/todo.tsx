import { use, useState, type FC, type FormEvent } from "react";
import api from "../global/axios";
import "../styles/todo.css";
import { useNavigate } from "react-router-dom";

interface TodoItem {
  text: string;
  completed: boolean;
}

const CreateTodo: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState("");
  const [items, setItems] = useState<TodoItem[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
 const navigate=useNavigate();

  const handleAddTask = () => {
    if (!task.trim()) return;

    setItems(prev => [...prev, { text: task.trim(), completed: false }]);
    setTask("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Please add at least one task");
      return;
    }

    try {
      const response = await api.post("/user/addtodo", { title, description, items,});

      setMessage(response.data.message);
      
      setTitle("");
      setDescription("");
      setItems([]);
      navigate("/mytask");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create todo");
    }
  };

  return (
     
  <div className="todo-page">
    <div className="todo-container">
      <h2>Create Todo</h2>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <div className="task-row">
          <input
            placeholder="Enter task"
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAddTask()}
          />
          <button type="button" className="add-task-btn" onClick={handleAddTask}>
            ADD +
          </button>
        </div>

        <ul className="task-list">
          {items.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>

        <button type="submit" disabled={items.length === 0}>
          Finish Todo
        </button>
      
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
    </div>
  );
};

export default CreateTodo;
