import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  return (
    <nav>
      <ul className="navbar">

        <li>
          <Link to="/entries">Dashboard
          </Link>
        </li>

        <li>
          <Link to="/addcoffee">Add Coffee
          </Link>
        </li>



        {
          localStorage.getItem("auth_token") !== null ?
            <button onClick={() => {
              localStorage.removeItem("auth_token")
              history.push({ pathname: "/" })
            }}>
              Logout
            </button>
            :
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
        }
      </ul>
    </nav>
  )
}


// if you add a link here, you must add a corresponding route on Appviews