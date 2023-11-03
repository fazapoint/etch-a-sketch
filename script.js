const wrapper = document.querySelector('#wrapper');
const gridContainer = document.querySelector('#grid-container');
let isMouseDown = false;
const colors = ['black', 'red', 'green', 'blue', 'pink', 'purple'];
// color selector initialize at index 0 (black) 
let colorIndex = 0;
let isRainbow = 0;

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
                    paint(gridItem);
                }
            });

            // when a single gridItem is clicked
            gridItem.addEventListener('click', () => {
                paint(gridItem)
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

function randomColor(){
    const randomRgb = [];
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    randomRgb.push(r,g,b);
    return randomRgb;
}

function paint(gridItem){
    if (isRainbow){
        let rainbow = randomColor();
        gridItem.style.backgroundColor = `rgb(${rainbow[0]}, ${rainbow[1]}, ${rainbow[2]})`;
    } else{
        gridItem.style.backgroundColor = btnColorPick.value;
    }
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

// using wrapper for mousedown and mouseup because if using grid-container the mouse will-
// -continually held down once the cursor dragged outside the grid-container(the canvas)

// mousedown to detect isMousDown is true
wrapper.addEventListener('mousedown', (event) => {
    isMouseDown = true;

    // prevent cursor turn into grab icon when mouse held down
    event.preventDefault();
});

// mouseup to detect isMouseDown is false 
wrapper.addEventListener('mouseup', () => {
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
    // pass each color in colors array
    if (colorIndex < colors.length-1){
        colorIndex++;
    } else{
        colorIndex = 0;
    }
    btnColorPick.value = colors[colorIndex];
    btnColorPick.textContent = `color: ${colors[colorIndex]}`;
});

const btnRandom = document.querySelector('#btnRandom');
btnRandom.addEventListener('click', () => {
    isRainbow = !isRainbow;
    if (isRainbow){
        btnRandom.textContent = `rainbow: on`;
        btnColorPick.textContent = `color: rainbow`;
        btnColorPick.disabled = true;
    }else{
        btnRandom.textContent = `rainbow: off`;
        btnColorPick.disabled = false;
        btnColorPick.textContent = `color: ${colors[colorIndex]}`;
    }
    
})

// initialize the grid 16x16 size
createGrid(slider.value);


