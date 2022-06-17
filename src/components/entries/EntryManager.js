// this module holds all http requests for entries

export const getEntries = () => {
    return fetch("http://localhost:8000/entries", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())

}

export const getEntry = (id) => {
    return fetch(`http://localhost:8000/entries/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const createEntry = (entry) => {
    return fetch("http://localhost:8000/entries", {
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
    return fetch(`http://localhost:8000/entries/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    })
}

export const deleteEntry = (id) => {
    return fetch(`http://localhost:8000/entries/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(getEntries)
}

export const getBrewingMethods = () => {
    return fetch(`http://localhost:8000/brewingmethods`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getFlavorNotes = () => {
    return fetch(`http://localhost:8000/flavornotes`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}