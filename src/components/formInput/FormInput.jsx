/* eslint-disable react/prop-types */
import React from 'react';

export const FormInput = (props) => {
  return (
    <div 
      id= { props.div.id }
      className={ props.div.className }
    >
      <label className={ props.label.className }>
        { props.label.description }
      </label>
      <input 
        name={ props.name }
        className={ props.input.className }
        type={ props.input.type }
        required={ props.input.required }
      />
    </div>
  )
}