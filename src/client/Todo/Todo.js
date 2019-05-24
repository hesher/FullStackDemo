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
      <TodoButton onClick={onComplete}>V</TodoButton>
      <label className="Todos_Todo_label">
        {label}
      </label>
      <TodoButton onClick={onDelete}>X</TodoButton>
      <TodoButton onClick={onUp} disabled={isUpDisabled}>⬆</TodoButton>
      <TodoButton onClick={onDown} disabled={isDownDisabled}>⬇</TodoButton>
    </span>
  );
}

const TodoButton = ({ children, onClick, disabled=false }) => (<button className="Todos_Action_button" type="button" onClick={onClick}
  disabled={disabled}
>
  {children}
</button>);

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
