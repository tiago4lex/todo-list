// src/components/TodoItem.jsx
import React, { useState } from "react";

import {
  MdCheckCircleOutline,
  MdDelete,
  MdCheckCircle,
  MdEdit,
  MdSave,
  MdClose,
} from "react-icons/md";

function TodoItem({ task, toggleTask, removeTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false); // Estado para controle de edição
  const [editedText, setEditedText] = useState(task.text); // Estado para o texto editado

  const handleEditSubmit = () => {
    if (editedText.trim() !== "") {
      editTask(task.id, editedText);
      setIsEditing(false); // Fecha o modo de edição
    }
  };

  const cancelEdit = () => {
    setEditedText(task.text); // Restaura o texto original
    setIsEditing(false); // Fecha o modo de edição
  };

  return (
    <li className={`todo-item ${task.completed ? "done" : ""}`}>
      <span onClick={() => !isEditing && toggleTask(task.id)}>
        {task.completed ? (
          <MdCheckCircle size={20} color="green" style={{ marginRight: 8 }} />
        ) : (
          <MdCheckCircleOutline size={20} style={{ marginRight: 8 }} />
        )}
      </span>

      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          style={{ flex: 1, marginRight: 8 }}
        />
      ) : (
        <span style={{ flex: 1 }} onClick={() => toggleTask(task.id)}>
          {task.text}
        </span>
      )}

      {isEditing ? (
        <>
          <button onClick={handleEditSubmit} title="Salvar">
            <MdSave size={18} color="green" />
          </button>
          <button onClick={cancelEdit} title="Cancelar">
            <MdClose size={18} color="gray" />
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)} title="Editar">
            <MdEdit size={18} />
          </button>
          <button onClick={() => removeTask(task.id)} title="Excluir">
            <MdDelete size={18} />
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
