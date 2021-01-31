const loader = document.querySelector('.loader')
const accessKey = 'DM7QQ7RJF8s-x7lfbfdF6_p-BikcD5s0CFQsUql_mvM'
let count = 5 // count of photos requesting per time | count is 5 initially but after first time, it gets reassign to 30
// Unsplash API URL
const url = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`

let allImages = [] // holds the photos' data which comes from getPhotos fn
let loadedImages = 0 // gets increase when an image loads

// variable shows that all images are loaded and if user scrolled down enough, displayImages fn will be called 
let ready = false

// Request Data
async function getImages() {
    const response = await fetch(url)
    allImages = await response.json() // array holds the data
    count = 30
}

// Displaying photos on the UI
async function displayImages() {
    try {
        // On Load
        await getImages()

        // Helper Function to set attributes
        function setAttribute(el, attributes) { // ex:  setAttribute('img', { src: ..., alt: ... })
            for (key in attributes) {
                el.setAttribute(key, attributes[key])
            }
        }

        const imgContainer = document.querySelector('.img-container')
        allImages.forEach(image => {
            // creating elements
            const a = document.createElement('a') // anchor element
            const imgEl = document.createElement('img')

            // setting attributes
            setAttribute(imgEl, {
                src: image.urls.regular,
                alt: image.alt_description,
                title: image.alt_description
            })
            setAttribute(a, {
                href: image.links.html,
                target: '_blank',
            })
            
            imgEl.addEventListener('load', function () {
                loadedImages++
                if (loadedImages === allImages.length) {
                    ready = true
                    loader.hidden = true
                }
            })

            // anchor appends image then, image container appends anchor
            a.appendChild(imgEl)
            imgContainer.appendChild(a)
        })
    } catch (error) {
        console.log(error)
        alert('You\'ve done hourly max requests, please try again in an hour.')
    }
}

displayImages()

window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight / 2 && ready) {
        displayImages()
        loadedImages = 0
        ready = false
    }
})