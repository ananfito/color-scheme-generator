// Variables
const getColorSchemeBtn = document.getElementById('get-color-scheme-btn')
const seedColorInput = document.getElementById('seed-color-input')
const colorSchemeSelection = document.getElementById('color-scheme-select')
const form = document.getElementById('color-selection-form')
const colorSchemeResults = document.getElementById('color-scheme-results')
let colorsHtml = ''

// Event listener for button
getColorSchemeBtn.addEventListener('click', getColorScheme)
// Event listener for copy hex code to clipboard
colorSchemeResults.addEventListener('click', copyToClipboard)

// Copy hex code to clipboard
function copyToClipboard(e) {
    if (e.target.dataset) {
        navigator.clipboard.writeText(e.target.dataset.hexValue)
    }
}

// Get color scheme based on user input
function getColorScheme(e) {
    e.preventDefault()
    
    // Remove # from seedColorInput.value
    // convert string to array 
    let colorInputArr = seedColorInput.value.split('')
    // remove first element i=0 ('#') of the array
    colorInputArr = colorInputArr.slice(1)
    // combined array to a new string & store as a new value for API
    const colorInputStr = colorInputArr.join('')

    // Fetch Color API data
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorInputStr}&mode=${colorSchemeSelection.value}&count=5`)
        .then(res => res.json())
        .then (data => {
            // loop through array of colors and add hex value and image URL to colorHtml
            data.colors.forEach(color => {
                colorsHtml += `
                    <div>
                        <img class="pointer" data-hex-value=${color.hex.value} src=${color.image.bare}>
                        <p class="pointer" data-hex-value=${color.hex.value}>${color.hex.value}</p>
                    </div>
                `
            });
            // return colorsHtml
            colorSchemeResults.innerHTML = colorsHtml
            document.getElementById('copy-instructions').style.display = 'block'
        })
    colorsHtml = ''
}
