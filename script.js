const accessKey = 'DM7QQ7RJF8s-x7lfbfdF6_p-BikcD5s0CFQsUql_mvM'
const count = 12 
// Unsplash API URL
const url = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&${count}`

// Request Data
async function getData() {
    const response = await fetch(url)
    const data = await response.json()
}

// On Load
getData()