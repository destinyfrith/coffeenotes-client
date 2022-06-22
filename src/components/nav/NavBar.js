import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  return (
    <nav className="navbar">
      <section className="body">
        <label class="logo">coffee notes</label>

        <ul>

          <li className="navbar_item">
            <Link to="/entries">dashboard
            </Link>
          </li>

          <li className="navbar_item">
            <Link to="/addcoffee">add coffee
            </Link>
          </li>

          <li className="navbar_item">
            {
              localStorage.getItem("auth_token") !== null ?
                <button className="logout"
                  onClick={() => {
                    localStorage.removeItem("auth_token")
                    history.push({ pathname: "/" })
                  }}>
                  logout
                </button>
                :
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
            }
          </li>
        </ul>
      </section>
    </nav>
  )
}


// if you add a link here, you must add a corresponding route on Appviews