import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';

export default function Todo({
  todo: {label, complete = false},
  onComplete,
  onDelete
}) {
  return (
    <span
      className={`Todos_Todo_container ${
        complete ? 'Todos_Todo_completed' : 'Todos_Todo_not_completed'
      }`}>
      <button type="button" onClick={onComplete} className="Todos_Todo_label">
        {label}
      </button>
      <button className="Todos_Todo_button" type="button" onClick={onDelete}>
        X
      </button>
    </span>
  );
}

Todo.propTypes = {
  todo: PropTypes.exact({
    label: PropTypes.string.isRequired,
    complete: PropTypes.bool
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
