import React, { useState } from 'react';
import Todo from '../Todo/Todo';
import './Todos.css';
import useTodos from './useTodos';

export default function App() {
  const {todos = [], error, setTodos} = useTodos();
  const [newLabel, setNewLabel] = useState('');

  if (error !== null) {
    return <h1>{`Error occured: ${error}`}</h1>;
  }

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
            onDown={() => {
              setTodos([
                ...todos.slice(0, index),
                todos[index + 1],
                todos[index],
                ...todos.slice(index + 2)
              ]);
            }}
            isDownDisabled={index === todos.length - 1}
            onUp={() => {
              setTodos([
                ...todos.slice(0, index - 1),
                todos[index],
                todos[index - 1],
                ...todos.slice(Math.min(index + 1, todos.length))
              ]);
            }}
            isUpDisabled={index === 0}
            onComplete={() => {
              setTodos([
                ...todos.slice(0, index),
                { ...todo, complete: !todo.complete },
                ...todos.slice(index + 1)
              ]);
            }}
          />
        ))}
        <input
          onChange={e => setNewLabel(e.target.value)}
          value={newLabel}
          placeholder="New Todo"
          className="Todos_add_input"
          onKeyDown={e => {
            if (e.keyCode === 13) {
              setTodos([...todos, { label: newLabel }]);
              setNewLabel('');
            }
          }}
        />
        <button
          type="button"
          disabled={newLabel === null}
          className="Todos_add_button"
          onClick={() => setTodos([...todos, { label: newLabel }])}>
          Add
        </button>
      </div>
    );
  }

  return <span> 'Waiting...'</span>;
}
