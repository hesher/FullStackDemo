import React, { useState } from "react";
import PropTypes from "prop-types";
import Todo from "../Todo/Todo";
import "./Todos.css";

export default function App() {
  const [todos, setTodos] = useState([
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
    { label: "5" },
    { label: "6" }
  ]);

  if (todos !== null) {
    return (
      <div className="Todos_container">
        {todos.map((todo, index) => (
          <Todo
            key={todo.label}
            todo={todo}
            onDelete={() => {
              setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
            }}
            onComplete={() => {
              setTodos([
                ...todos.slice(0, index),
                { ...todo, complete: !todo.complete },
                ...todos.slice(index + 1)
              ]);
            }}
          />
        ))}
      </div>
    );
  }

  return <span>Waiting...</span>;
}

const AddTodo = ({ onAdd }) => {
  const [newLabel, setNewLabel] = useState("");
  return (
    <>
      <input
        onChange={e => setNewLabel(e.target.value)}
        value={newLabel}
        placeholder="New Todo"
        className="Todos_add_input"
        onKeyDown={e => {
          if (e.keyCode === 13) {
            onAdd(newLabel);
            setNewLabel("");
          }
        }}
      />
      <button
        type="button"
        disabled={newLabel === null}
        className="Todos_add_button"
        onClick={() => onAdd(newLabel)}
      >
        Add
      </button>
    </>
  );
};

AddTodo.propTypes = {
  onAdd: PropTypes.func.isRequired
};
