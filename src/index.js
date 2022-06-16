import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { CoffeeNotes } from "./components/CoffeeNotes"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <CoffeeNotes />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
