// this module will be the list for of all existing entries
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEntries, deleteEntry } from "./EntryManager.js"

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
            <article className="entries">
                {
                    entries.map(entry => {
                        return <section key={`entry--${entry.id}`} className="entry">
                            <div>
                                <ul>
                                    <div className="entry__image"><img src={entry.image} height="300" /></div>
                                    <li className="entry__name">Name: {entry.name}</li>
                                    <li className="entry__brewingmethod">Brewing Method: {entry.brewing_method.type}</li>
                                    <li className="entry__grindsetting">Grind Setting: {entry.grind_setting}</li>
                                    <li className="entry__rating">Rating: {entry.rating}</li>
                                    <li>Flavors: {entry.flavor_profile?.slice(0, 5).map(({ name }) => name).join(', ')}</li>
                                    <li className="entry__notes">Notes: {entry.notes}</li>
                                </ul>
                                <button className="edit-btn" onClick={() => {
                                    history.push(`entries/edit/${entry.id}`)
                                }}>edit</button>

                                <button className="delete-btn" onClick={() => { onClickDelete(entry.id) }}>delete</button>
                            </div>
                        </section>
                    })
                }
            </article>
        </>
    )
}