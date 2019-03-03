import React, {useEffect, useState} from 'react';
import './Todos.css';
import Todo from '../Todo/Todo';

function updateTodos(todos, onUpdate, onError) {
  if (todos === undefined || todos === null) {
    throw Error('Did not expect an empty todos update');
  }
  onUpdate(todos);
  fetch(`/api/todos`, {
    method: 'POST',
    body: JSON.stringify(todos),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }
    })
    .catch(error => {
      console.error('Error occured in updating todos json', error);
      onError(error);
    });
}

function useTodos() {
  const [todosState, setTodosState] = useState(null);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    if (todosState === null && errorState === null) {
      fetch('/api/todos')
        .then(async todosResponse => {
          if (todosResponse.ok) {
            const {todos} = await todosResponse.json();
            setTodosState(todos);
          } else {
            throw Error(`${todosResponse.status}: ${todosResponse.statusText}`);
          }
        })
        .catch(error => {
          console.error('Error occured in getting todos json', error);
          setErrorState(error);
        });
    }
  });

  return [
    todosState,
    errorState,
    todos => updateTodos(todos, setTodosState, setErrorState)
  ];
}

export default function App() {
  const [todos = [], error, setTodos] = useTodos();
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
            onComplete={() => {
              setTodos([
                ...todos.slice(0, index),
                {...todo, complete: !todo.complete},
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
              setTodos([...todos, {label: newLabel}]);
              setNewLabel('');
            }
          }}
        />
        <button
          type="button"
          disabled={newLabel === null}
          className="Todos_add_button"
          onClick={() => setTodos([...todos, {label: newLabel}])}>
          Add
        </button>
      </div>
    );
  }

  return <span> 'Waiting...'</span>;
}
