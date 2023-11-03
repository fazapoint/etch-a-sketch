const gridContainer = document.querySelector('#grid-container');
let isMouseDown = false;
const colors = ['black', 'red', 'green', 'blue', 'pink', 'purple'];
// color selector initialize with 1 because 0 already used as a default
let colorIndex = 1;

function createGrid(numGrid){
    // clear grid container
    clearGrid();

    // create x number of columns and rows
    gridContainer.style.gridTemplateColumns = `repeat(${numGrid}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${numGrid}, 1fr)`
    for (let i = 0; i < numGrid; i++) {
        for (let j = 0; j < numGrid; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridContainer.appendChild(gridItem);
            
            // when mouseover, if isMousDown is true then can sketch
            gridItem.addEventListener('mouseover', () => {
                if (isMouseDown){
                    gridItem.style.backgroundColor = btnColorPick.value;
                }
            });

            // when a single gridItem is clicked
            gridItem.addEventListener('click', () => {
                gridItem.style.backgroundColor = btnColorPick.value;
            });
        }
    }
}

function clearGrid(){
    gridContainer.innerHTML = '';
    // alternative way to remove child element
    // while (gridContainer.firstChild) {
    //     gridContainer.removeChild(gridContainer.firstChild);
    // }
}

// slider
const slider = document.querySelector('#sizeSlider');
const sliderValueDisplay = document.querySelector('#sliderValue');

// display current value of the slider
slider.addEventListener('input', () => {
    const sliderValue = slider.value;
    sliderValueDisplay.textContent = `${sliderValue}x${sliderValue}`;
});

// execute createGrid() when value is changed
slider.addEventListener('change', () => {
    const sliderValue = slider.value;
    createGrid(sliderValue);
});

// mousedown to detect isMousDown is true
gridContainer.addEventListener('mousedown', (event) => {
    isMouseDown = true;

    // prevent cursor turn into grab icon when mouse held down
    event.preventDefault();
});

// mouseup to detect isMouseDown is false
gridContainer.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// clear button event
const btnClear = document.querySelector('#btnClear');
btnClear.addEventListener('click', () => {
    clearGrid();
    createGrid(slider.value);
})

const btnColorPick = document.querySelector('#btnColorPick');
btnColorPick.addEventListener('click', () => {
    btnColorPick.value = colors[colorIndex];
    btnColorPick.textContent = `color: ${colors[colorIndex]}`;

    // pass each color in colors array
    if (colorIndex < colors.length-1){
        colorIndex++;
    } else{
        colorIndex = 0;
    }
});

// initialize the grid 16x16 size
createGrid(slider.value);


