const accessKey = 'DM7QQ7RJF8s-x7lfbfdF6_p-BikcD5s0CFQsUql_mvM'
const count = 12 // count of photos requesting per time
// Unsplash API URL
const url = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`

let photos = [] // holds the photos' data which comes from getPhotos fn

// Request Data
async function getPhotos() {
    const response = await fetch(url)
    photos = await response.json()
    console.log(photos)
}

// Displaying photos on the UI
async function displayPhotos() {
    // Helper Function to set attributes
    function setAttribute(el, attributes) { // ex:  setAttribute('img', { src: ..., alt: ... })
        for (key in attributes) {
            el.setAttribute(key, attributes[key])
        }
    }

    // On Load
    await getPhotos()
    const imgContainer = document.querySelector('.img-container')
    photos.forEach(photo => {
        // creating elements
        const a = document.createElement('a') // anchor element
        const img = document.createElement('img')

        // setting attributes
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        setAttribute(a, {
            href: photo.links.html,
            target: '_blank',
        })

        // anchor appends image then, image container appends anchor
        a.appendChild(img)
        imgContainer.appendChild(a)
    })
}

displayPhotos()