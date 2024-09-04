const gridSide = 600;
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

function createGridCells() {
  const numOfSquares = rows * columns;
  for (let i = 0; i < rows * columns; i++) {
    const gridCell = document.createElement("div");

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

slider.oninput = function () {
  let txt = `${this.value} x ${this.value} (Resolution)`;
  sliderValue.innerHTML = txt;
  removeGridCells();
  createGridCells(this.value);
};

createGridCells();
