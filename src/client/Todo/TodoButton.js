import React from 'react';
import './TodoButton.css';
import PropTypes from 'prop-types';


const TodoButton = ({ children, onClick, disabled = false }) => (<button className="Todos_Action_button" type="button" onClick={onClick}
    disabled={disabled}
>
    {children}
</button>);


Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}