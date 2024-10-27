const gridSide = 700;
let rows = 16;
let columns = 16;

const sketcharea = document.querySelector("#sketch-area");
const sliderContainer = document.querySelector("#slider-container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");

sliderValue.textContent = `${slider.value} x ${slider.value} (Resolution)`;
sketcharea.style.width = `${gridSide}px`;
sketcharea.style.height = `${gridSide}px`;

function setBackgroundColor() {
    this.style.backgroundColor = "black";
}

function createGridCells(gridSize) {
    rows = columns = gridSize;
    const numOfSquares = rows * columns;

    removeGridCells();

    for (let i = 0; i < numOfSquares; i++) {
        const gridCell = document.createElement("div");

        // Adjust for exact pixel calculation and any borders
        gridCell.style.width = `${gridSide / columns - 2}px`;
        gridCell.style.height = `${gridSide / rows - 2}px`;
        gridCell.classList.add("cell");

        sketcharea.appendChild(gridCell);

        gridCell.addEventListener("mouseover", setBackgroundColor);
    }
}

function removeGridCells() {
    while (sketcharea.firstChild) {
        sketcharea.removeChild(sketcharea.firstChild);
    }
}

createGridCells(slider.value);

slider.oninput = function () {
    let gridSize = this.value;
    sliderValue.textContent = `${gridSize} x ${gridSize} (Resolution)`;
    createGridCells(gridSize);
};
