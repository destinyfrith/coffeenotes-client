import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Login.css"
import { loginUser } from "./AuthManager"


export const Login = () => {
  const username = useRef()
  const password = useRef()
  const invalidDialog = useRef()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user)
      .then(res => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("auth_token", res.token)
          history.push("/")
        }
        else {
          invalidDialog.current.showModal()
        }
      })
  }

  return (
    <main className="container--login">
      <dialog ref={invalidDialog}>
        <div>Username or password was not valid.</div>
        <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <fieldset>
            <label htmlFor="inputUsername"> username</label>
            <input ref={username} type="username" id="username" placeholder="Username address" required autoFocus />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> password </label>
            <input ref={password} type="password" id="password" placeholder="Password" required />
          </fieldset>
          <fieldset>
            <button type="submit">sign In</button>
          </fieldset>
        </form>
      </section>

      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}
