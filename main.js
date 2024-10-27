const gridSide = 700;
let rows = 16;
let columns = 16;
let isMouseDown = false;

const sketcharea = document.querySelector("#sketch-area");
const sliderContainer = document.querySelector("#slider-container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");

sliderValue.textContent = `${slider.value} x ${slider.value} (Resolution)`;
sketcharea.style.width = `${gridSide}px`;
sketcharea.style.height = `${gridSide}px`;

function setBackgroundColor() {
    if (isMousedown) {
        this.style.backgroundColor = "black";
    }
}

function createGridCells(gridSize) {
    rows = columns = gridSize;
    const numOfSquares = rows * columns;

    removeGridCells();

    for (let i = 0; i < numOfSquares; i++) {
        const gridCell = document.createElement("div");

        gridCell.style.width = `${gridSide / columns - 2}px`;
        gridCell.style.height = `${gridSide / rows - 2}px`;
        gridCell.classList.add("cell");

        sketcharea.appendChild(gridCell);

        gridCell.addEventListener("mousedown", setBackgroundColor);
        gridCell.addEventListener("mousemove", setBackgroundColor);
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

document.body.addEventListener("mousedown", function () {
    isMouseDown = true;
});

document.body.addEventListener("mouseup", function () {
    isMouseDown = false;
});

document.body.addEventListener("mouseleave", function () {
    isMouseDown = false;
});
