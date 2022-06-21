// this module will be the list for of all existing entries
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEntries, deleteEntry } from "./EntryManager.js"
import "./Entries.css"

export const EntryList = (props) => {
    const [entries, setEntries] = useState([])
    const history = useHistory()

    // initial setting of state for entries
    const entryState = () => {
        getEntries()
            .then((data) => {
                setEntries(data)
            })
    }

    // this useeffect fetches the current state of all entries (list) 
    // useEffect = observe state
    useEffect(() => {
        entryState()
    }, [])

    // delete event listener
    const onClickDelete = (id) => {
        deleteEntry(id).then((data) => {
            entryState(data)
        })
    }

    return (
        <>
            <section className="entries">
                {
                    entries.map(entry => {
                        return <section key={`entry--${entry.id}`} className="entry">
                            <ul>
                                <div className="image"><img src={entry.image} height="300" /></div>
                                <li><b>Name:</b> {entry.name}</li>
                                <li><b>Brewing Method:</b> {entry.brewing_method.type}</li>
                                <li><b>Grind Setting:</b> {entry.grind_setting}</li>
                                <li><b>Rating:</b> {entry.rating}</li>
                                <li><b>Flavors:</b> {entry.flavor_profile?.slice(0, 5).map(({ name }) => name).join(', ')}</li>
                                <li><b>Notes:</b> {entry.notes}</li>
                            </ul>

                            <div className="buttons">
                                <button className="edit-btn" onClick={() => {
                                    history.push(`entries/edit/${entry.id}`)
                                }}>edit</button>

                                <button className="delete-btn" onClick={() => { onClickDelete(entry.id) }}>delete</button>
                            </div>
                        </section>
                    })
                }
            </section>
        </>
    )
}