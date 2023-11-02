const gridContainer = document.querySelector('#grid-container');

for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.textContent = `${i + 1}, ${j + 1}`; // Optional: display row and column numbers
        gridContainer.appendChild(gridItem);
    }
}
