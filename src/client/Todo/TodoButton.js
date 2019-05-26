import React from 'react';
import './TodoButton.css';


const TodoButton = ({ children, onClick, disabled=false }) => (<button className="Todos_Action_button" type="button" onClick={onClick}
  disabled={disabled}
>
  {children}
</button>);
