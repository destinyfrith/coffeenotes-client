// this module is a form for creating entries
// first version of the form should allow a user to only add one brewing method
// to an entry by choosing a brewing method option in a <select> element.
// They should also be able to select as many flavor notes as they'd like via checkboxes.
// When the the user fills out the form and clicks "Add", 
// redirect the user back to their dashboard view.
// need a getBrewingMethods and FlavorNotes fetch call

import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEntry, getBrewingMethods, getFlavorNotes } from './EntryManager.js'
import "./Entries.css"

export const EntryCreateForm = () => {

    const [flavornotes, setFlavorNotes] = useState([])
    const [brewingmethods, setBrewingMethods] = useState([]);

    const [currentEntry, setCurrentEntry] = useState({
        name: "",
        grind_setting: "",
        rating: "",
        notes: "",
        brewing_method: 0,
        image: "",
        flavor_profile: []
    });

    const history = useHistory()

    // this event grabs current brewing methods and sets them so that they can be selected from menu
    useEffect(() => {
        getBrewingMethods()
            .then(data => setBrewingMethods(data))
    }, [])

    // this event grabs current flavors and sets them so that they can be checked on form
    useEffect(() => {
        getFlavorNotes()
            .then(data => setFlavorNotes(data))
    }, [])

    //onchange function that will set the new entry
    const changeEntryState = (evt) => {
        const newEntry = Object.assign({}, currentEntry)
        newEntry[evt.target.name] = evt.target.value
        setCurrentEntry(newEntry)
    }

    const flavorToggle = (evt) => {
        const copy = { ...currentEntry };
        if (evt.target.checked) {
            copy.flavor_profile.push(parseInt(evt.target.value)); //if changed to checked, add the flavor note
        } else {
            copy.flavor_profile.splice(copy.flavor_profile.indexOf(evt.target.value), 1); //if changed to untagged, find the index of the id, and then remove one element starting at that index
        }
        setCurrentEntry(copy);
    };

    return (
        <>
            <section className="createform">
                <h3>Add a New Coffee</h3>
                <form>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" required autoFocus className="form-control"
                                value={currentEntry.name}
                                onChange={changeEntryState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="image">Image: </label>
                            <input type="text" name="image" required autoFocus className="form-control"
                                value={currentEntry.image}
                                onChange={changeEntryState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="grind_setting">Grind setting: </label>
                            <input type="text" name="grind_setting" required autoFocus className="form-control"
                                value={currentEntry.grind_setting}
                                onChange={changeEntryState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="rating">Rating: </label>
                            <input id="rating" type="text" name="rating" required autoFocus className="form-control"
                                value={currentEntry.rating}
                                onChange={changeEntryState}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="notes">Notes: </label><br></br>
                            <textarea id="notes" type="text" name="notes" required autoFocus className="form-control"
                                value={currentEntry.notes}
                                onChange={changeEntryState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="brewingmethod">Brewing Method: </label>
                            <div className="control">
                                <select name="brewing_method"
                                    onChange={changeEntryState}>
                                    <option value="0">Select Brewing Method:</option>
                                    {brewingmethods.map(brewingmethod => (
                                        <option key={brewingmethod.id} value={brewingmethod.id}>
                                            {brewingmethod.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label>Flavor Notes: </label>
                            {flavornotes.map((note) => {
                                return (
                                    <>

                                        
                                            <input
                                                type="checkbox"
                                                class="checkbox"
                                                required
                                                value={note.id}
                                                onChange={flavorToggle}
                                            />
                                            {` ${note.name} `}
                                    </>
                                );
                            })}
                        </div>
                    </fieldset>

                    <button type="submit"
                        onClick={evt => {
                            evt.preventDefault()
                            const entry = {
                                name: currentEntry.name,
                                image: currentEntry.image,
                                grind_setting: currentEntry.grind_setting,
                                rating: currentEntry.rating,
                                notes: currentEntry.notes,
                                flavor_profile: currentEntry.flavor_profile,
                                brewing_method: parseInt(currentEntry.brewing_method)
                            }

                            createEntry(entry)
                                .then(() => history.push("/"))
                        }}
                        className="btn">add</button>

                    <button className="btn" onClick={() => {
                        history.push("/entries")
                    }}>cancel</button>

                </form>
            </section>
        </>
    )

}