// src/App.jsx
import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./index.css";
import { MdAddCircleOutline } from "react-icons/md";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  // Aplica a classe "dark" no body
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleAddTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      {/* Botão para alternar o tema */}
      <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
        {darkMode ? "☀️" : "🌙"}
      </button>

      <h1>Lista de Tarefas</h1>

      <div className="task-input">
        <input
          type="text"
          value={input}
          placeholder="Digite sua tarefa..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button onClick={handleAddTask}>
          <MdAddCircleOutline
            size={24}
            style={{ verticalAlign: "middle", marginRight: 5 }}
          />
          Adicionar
        </button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("done")}>Concluídas</button>
        <button onClick={() => setFilter("pending")}>Pendentes</button>
      </div>

      <TodoList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
