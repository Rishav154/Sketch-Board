//Default values for when the pages loads
const gridSide = 700;
let rows = 16;
let columns = 16;
let isMouseDown = false;
let eraseMode = false;

//Refrences for HTML elements
const sketcharea = document.querySelector("#sketch-area");
const sliderContainer = document.querySelector("#slider-container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");
const color = document.querySelector("#pen-color");
const eraser = document.querySelector("#eraser");

//Displays slider current resolution
sliderValue.textContent = `${slider.value} x ${slider.value} (Resolution)`;
sketcharea.style.width = `${gridSide}px`;
sketcharea.style.height = `${gridSide}px`;

//Create the grid initially when the page loads and the sets the cursor to crosshair when the cursor is on the sketch board
createGridCells(slider.value);
sketcharea.style.cursor = "crosshair";

//Sets color for the cell
function setBackgroundColor(event) {
    if (
        isMouseDown ||
        event.type === "touchmove" ||
        event.type === "touchstart"
    ) {
        if (eraseMode) {
            event.target.style.backgroundColor = "white"; // Erase by setting color to white
        } else {
            event.target.style.backgroundColor = color.value; // Use the selected color
        }
        event.preventDefaults();
    }
}

//Create cells according to the slider value
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
        gridCell.addEventListener("touchstart", setBackgroundColor);
        gridCell.addEventListener("touchmove", setBackgroundColor);
    }
}

//Delete gridcells
function removeGridCells() {
    while (sketcharea.firstChild) {
        sketcharea.removeChild(sketcharea.firstChild);
    }
}

//Changes the gridsize according to the slider value(1-100)
slider.oninput = function () {
    let gridSize = this.value;
    sliderValue.textContent = `${gridSize} x ${gridSize} (Resolution)`;
    createGridCells(gridSize);
};

//Event listeners to only color the cells when the mouse is dragged while clicked
document.body.addEventListener("mousedown", function () {
    isMouseDown = true;
});
document.body.addEventListener("mouseup", function () {
    isMouseDown = false;
});
document.body.addEventListener("mouseleave", function () {
    isMouseDown = false;
});
document.body.addEventListener("touchstart", function () {
    isMouseDown = true;
});
document.body.addEventListener("touchend", function () {
    isMouseDown = false;
});

//Eraser fucntion
eraser.addEventListener("click", function () {
    eraseMode = !eraseMode;
    this.textContent = eraseMode ? "Pen" : "Eraser";
});
