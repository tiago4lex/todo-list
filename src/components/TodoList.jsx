// src/components/TodoList.jsx
import React from "react";
import TodoItem from "./TodoItem"; // Importa o componente individual de tarefa
import { motion, AnimatePresence } from "framer-motion"; // Importa animações

function TodoList({ tasks = [], setTasks }) {
  // Alterna entre tarefa feita ou não
  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated); // Atualiza o estado
  };

  // Remove uma tarefa da lista
  const removeTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated); // Atualiza o estado
  };

  // Edita tarefa
  const editTask = (id, newText) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updated); // Atualiza o estado
  };

  return (
    <ul className="todo-list">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem
              key={task.id} // Chave única para o React
              task={task} // Passa os dados da tarefa
              toggleTask={toggleTask} // Passa a função de alternar concluído
              removeTask={removeTask} // Passa a função de remover
              editTask={editTask} // Passa a função de editar
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TodoList;
