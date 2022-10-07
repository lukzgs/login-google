import { useContext } from "react"
import { Context } from "../../context/context"
import { useUserData } from "../../services/hooks/userData";
import './Navbar.css';

export default function Navbar() {
  const { user } = useContext(Context);
  const getUserData = useUserData();
  const { username } = getUserData;

  return (
    <div className="side-by-side">
      <nav className="navbar">
        <ul>
          <li>
            { user ? 
              username ? username : 'loading...'
            : null }
          </li>
        </ul>
      </nav>
    </div>
  )
}
