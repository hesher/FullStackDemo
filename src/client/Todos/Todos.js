import React, { useState } from "react";
import AddTodos from "./AddTodos";
import Todo from "../Todo/Todo";
import useTodos from "./useTodos";
import "./Todos.css";

export default function Todos() {
  // const [todos, setTodos] = useState([
  //   { label: "1" },
  //   { label: "2" },
  //   { label: "3" },
  //   { label: "4" },
  //   { label: "5" },
  //   { label: "6" }
  // ]);

  const [todos, setTodos] = useTodos();

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
