import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';

export default function Todo({
  todo: { label, complete = false },
  isUpDisabled,
  isDownDisabled,
  onComplete,
  onDelete,
  onDown,
  onUp
}) {
  return (
    <span
      className={`Todos_Todo_container ${
        complete ? 'Todos_Todo_completed' : 'Todos_Todo_not_completed'
        }`}>
      <button type="button" onClick={onComplete} className="Todos_Action_button">
        V
      </button>
      <label className="Todos_Todo_label">
        {label}
      </label>
      <button className="Todos_Action_button" type="button" onClick={onDelete}>
        X
      </button>
      <button
        className="Todos_Action_button" type="button" onClick={onDown}
        disabled={isDownDisabled}
        
        >
        ⬇️
      </button>
      <button className="Todos_Action_button" type="button" onClick={onUp}
        disabled={isUpDisabled}
      >
        ⬆️
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
  onDelete: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onUp: PropTypes.func.isRequired,
  isDownDisabled: PropTypes.bool.isRequired,
  isUpDisabled: PropTypes.bool.isRequired,
};
