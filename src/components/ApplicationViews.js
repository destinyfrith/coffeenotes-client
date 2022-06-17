import React from "react"
import { Route } from "react-router-dom"
import { EntryCreateForm } from "./entries/EntryCreateForm"
import { EntryList } from "./entries/EntryList"
import { EntryEditForm } from "./entries/EntryEditForm"

// this is controlling what you see when you click each individual link on the nav bar
export const ApplicationViews = () => {
    return <>
        <Route exact path="/entries">
            <EntryList />
        </Route>

        <Route exact path="/">
            <EntryList />
        </Route>

        <Route path="/addcoffee">
            <EntryCreateForm />
        </Route>

        <Route path="/entries/edit/:entryId(\d+)">
            <EntryEditForm />
        </Route>
    </>
}
