const gridContainer = document.querySelector('#grid-container');

for (let i = 0; i < 16; i++){
    const grid = document.createElement('div');
    grid.classList.add('grid-item');
    grid.textContent = `test ${i+1}`;
    gridContainer.appendChild(grid);
};
