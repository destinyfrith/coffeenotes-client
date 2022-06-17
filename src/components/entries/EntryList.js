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
                        <div className="entry__image"><img src={entry.image} height="300"/></div>
                        <li className="entry__name">{entry.name}</li>
                        <li className="entry__brewingmethod">{entry.brewing_method.type}</li>
                        <li className="entry__grindsetting">{entry.grind_setting}</li>
                        <li className="entry__rating">{entry.rating}</li>
                        <li className="entry__flavornotes">{entry?.flavor_profile[0]?.name}</li>
                        <li className="entry__notes">{entry.notes}</li>
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