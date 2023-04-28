import React from 'react';
import { useState } from 'react';

// extends React.Component 
function Input(props) {
  return (
    <div className={`c-form-group ${ props.addClass}`}>
      <input 
        id={props.id}
        className="c-form-group__input"
        placeholder={props.label}
        type={props.type}
        onChange={e => props.setValue(e.target.value)}
        />
        <label 
          className="c-form-group__label"
          htmlFor={props.id}
        >
          {props.label}
        </label>
    </div>
  );
}

export default Input;
  