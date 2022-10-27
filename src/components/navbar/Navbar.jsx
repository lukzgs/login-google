import React, { useContext } from 'react';
import { Context } from '../../context/context';
import './Navbar.css';

export default function Navbar() {
  const { user } = useContext(Context);
  return (
    <div className="side-by-side">
      <nav className="navbar">
        <ul>
          <li>
            { user ? user.displayName : null }
          </li>
        </ul>
      </nav>
    </div>
  );
}
