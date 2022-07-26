// this module holds all http requests for entries

export const getEntries = () => {
    return fetch("https://coffee-notes-app.herokuapp.com/entries", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())

}

export const getEntry = (id) => {
    return fetch(`https://coffee-notes-app.herokuapp.com/entries/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const createEntry = (entry) => {
    return fetch("https://coffee-notes-app.herokuapp.com/entries", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    })
        .then(response => response.json())
}

export const editEntry = (id, entry) => {
    return fetch(`https://coffee-notes-app.herokuapp.com/entries/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    })
}

export const deleteEntry = (id) => {
    return fetch(`https://coffee-notes-app.herokuapp.com/entries/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(getEntries)
}

export const getBrewingMethods = () => {
    return fetch(`https://coffee-notes-app.herokuapp.com/brewingmethods`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getFlavorNotes = () => {
    return fetch(`https://coffee-notes-app.herokuapp.com/flavornotes`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}