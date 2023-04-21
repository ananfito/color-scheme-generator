// Variables
const getColorSchemeBtn = document.getElementById('get-color-scheme-btn')
const seedColorInput = document.getElementById('seed-color-input')
const colorSchemeSelection = document.getElementById('color-scheme-select')
const form = document.getElementById('color-selection-form')
const colorSchemeResults = document.getElementById('color-scheme-results')

// Event listener for button
getColorSchemeBtn.addEventListener('click', getColorScheme)

// Get color scheme based on user input
function getColorScheme(e) {
    e.preventDefault()
    
    // remove # from seedColorInput.value
    // convert string to array 
    let colorInputArr = seedColorInput.value.split('')
    // remove first element i=0 ('#') of the array
    colorInputArr = colorInputArr.slice(1)
    // combined array to a new string & store as a new value for API
    const colorInputStr = colorInputArr.join('')

    // fetch Color API data
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorInputStr}&mode=${colorSchemeSelection.value}&count=5`)
        .then(res => res.json())
        .then (data => {
            // return array of colors
            const colorsArr = data.colors

            // loop through colorsArr and add hex value and image URL to colorSchemeResults
            let html = ''
            colorsArr.forEach(color => {
                html += `
                    <div>
                        <img src=${color.image.bare}>
                        <p>${color.hex.value}</p>
                    </div>
                `
            });
            colorSchemeResults.innerHTML = html
        })

    form.reset() // NOTE: Are you sure you want to reset the form after the button has been clicked?
    
}
