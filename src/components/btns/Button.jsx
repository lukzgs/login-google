/* eslint-disable react/prop-types */
import React from 'react';

export const Button = (props) => {
  return (
    <div 
      className={ props.div.className }
    >
      <button
        id={ props.button.id }
        className={ props.button.className }
        onClick={ () => props.button.onClick() }
      >
        { props.button.description ? props.button.description : 
          <svg 
            className={ props.button.svg.className }
            viewBox={ props.button.svg.viewBox }
          >
            <path d={ props.button.svg.path.d } />
          </svg> 
        }
      </button>
    </div>
  )
}