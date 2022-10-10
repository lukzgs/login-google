import { useContext } from "react"
import { Context } from "../../context/context"
import './Navbar.css';

export default function  Navbar() {
  const { user, userData } = useContext(Context);
  const { username } = userData();

  return (
    <div className="side-by-side">
      <nav className="navbar">
        <ul>
          <li>
            { !!user ? (
              user ?
                username ? username : user.displayName
              : 'loading' 
            ) 
            : null }            
          </li>
        </ul>
      </nav>
    </div>
  )
}
