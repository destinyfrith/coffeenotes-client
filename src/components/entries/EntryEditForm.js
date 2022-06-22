import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { editEntry, getEntry, getFlavorNotes, getBrewingMethods } from './EntryManager.js'

export const EntryEditForm = () => {

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
    // useParams hook returns an object of a key of the dynamic params from the current URL that were matched by the <Route path>
    const { entryId } = useParams()

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

    // this useeffect gets the previously created entry so we can edit it
    useEffect(() => {
        getEntry(entryId).then((data) =>
            setCurrentEntry({
                name: data.name,
                grind_setting: data.grind_setting,
                image: data.image,
                notes: data.notes,
                rating: data.rating,
                brewing_method: parseInt(data.brewing_method.id),
                flavor_profile: data.flavor_profile?.map((note) => {
                    return note.id
                }),
            })
        );

    }, []);


    //onchange function that will set the new entry
    const changeEntryState = (evt) => {
        const newEntry = Object.assign({}, currentEntry)
        newEntry[evt.target.name] = evt.target.value
        setCurrentEntry(newEntry)
    }

    const editFlavorToggle = (evt) => {
        const copy = { ...currentEntry };
        if (evt.target.checked) {
            copy.flavor_profile.push(parseInt(evt.target.value)); //if changed to checked, add the flavor note
        } else {
            copy.flavor_profile.splice(copy.flavor_profile.indexOf(evt.target.value), 1); //if changed to unchecked find the index of the id, and then remove one element starting at that index
        }
        setCurrentEntry(copy);
    };

    return (
        <>
            <section className="editform">
                <h3>Update Coffee</h3>
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
                            <label htmlFor="grind_setting">Grind Setting: </label>
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
                            <label htmlFor="notes">Notes <br></br> </label>
                            <textarea id="notes" type="textarea" name="notes" required autoFocus className="form-control"
                                value={currentEntry.notes}
                                onChange={changeEntryState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="brewingmethod">Brewing Method: </label>
                            <div className="control">
                                <select value={currentEntry.brewing_method} name="brewing_method"
                                    onChange={changeEntryState}>
                                    <option value="0">select brewing method:</option>
                                    {brewingmethods.map(brewingmethod => {
                                        return <option key={`brewingmethod--${brewingmethod.id}`} value={brewingmethod.id}>
                                            {brewingmethod.type}
                                        </option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="">Flavor Notes: </label>
                            {flavornotes.map((note) => {
                                return (
                                    <>
                                        {` ${note.name}: `}
                                        <input
                                            type="checkbox"
                                            checked={currentEntry.flavor_profile?.includes(note.id)}
                                            value={note.id}
                                            onChange={editFlavorToggle}
                                        />
                                    </>
                                );
                            })}
                        </div>
                    </fieldset>

                    <button type="submit"
                        onClick={(evt) => {
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

                            editEntry(entryId, currentEntry)
                                .then(() => history.push("/entries"))
                        }}
                        className="btn">update</button>

<button className="btn" onClick={() => {
                        history.push("/entries")
                    }}>cancel</button>

                </form>
            </section>
        </>
    )

}