import React from "react"
import { Route } from "react-router-dom"
import { EntryCreateForm } from "./entries/EntryCreateForm"

// this is controlling what you see when you click each individual link on the nav bar
export const ApplicationViews = () => {
    return <>
            {/* <Route exact path="/">
                <EntryList />
            </Route> */}

            <Route path="/addcoffee">
                <EntryCreateForm />
            </Route>

            {/* <Route path="/taskform">
                <EntryEditForm />
            </Route> */}
    </>
}
