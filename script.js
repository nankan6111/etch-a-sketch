function main(){
    // Generate a default etch-a-sketch with 50 girds in a row
    createCanvas(50);
    createEtchASketch();

    // Create Change Size button. Create new etch-a-sketch when click the button
    const changeSizeBtn = document.getElementById("changeSize");
    changeSizeBtn.addEventListener("click", function(){
        // Prompt for input
        let size = prompt("Enter number of grid in a row (suggest 20-150): ");
        // Remove old and create new html element
        const oldCanvas = document.querySelector(".canvas");
        const frame = document.querySelector(".frame");
        let newCanvas = document.createElement("div");
        oldCanvas.remove();
        newCanvas.setAttribute("class", "canvas");
        frame.appendChild(newCanvas);

        // Generate a new etch-a-sketch
        createCanvas(size);
        createEtchASketch();
    });

}

// Attach functions and buttons to canvas
function createEtchASketch(size){
    // List of girds
    const grids = document.querySelectorAll(".canvas div");
    drawBlackColor(grids);  // Default as black color when drawing
    
    // Botton variables
    const showGridBtn = document.getElementById("showGrid");
    const rainbowBtn = document.getElementById("rainbow");
    const clearBtn = document.getElementById("clear");

    // Attach functions to bottons
    showGridBtn.addEventListener("click", function(){showGrid(grids)});
    clearBtn.addEventListener("click", function(){clearCanvas(grids)});

    // Toggle random/black color
    let rainbowClick = false;
    rainbowBtn.addEventListener("click", function(){
        rainbowClick ? rainbowClick=false : rainbowClick=true;
        rainbowClick ? drawRainbowColor(grids) : drawBlackColor(grids);

    });

}

// Create a canvas with ratio of 5:4 with a given size as number in width
function createCanvas(size){
    const canvas = document.querySelector(".canvas");

    let gridRow = size;
    let gridColumn = Math.round(gridRow*4/5);
    let reminder = gridRow%5*4;

    canvas.style.gridTemplateColumns = `repeat(${gridRow}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${gridColumn}, 1fr)`;

    // Genrate each grid
    for(let i = 0; i < gridRow*gridColumn; i++){
        const grid = document.createElement('div');
        grid.setAttribute('class', 'grid');
        canvas.appendChild(grid);
    }
}

// Display grid on canvas
function showGrid(grids) {
    grids.forEach(grid => grid.classList.toggle("gridBorder"));
}

function drawBlackColor(grids) {
    // Activate mousedown mode (Only draw when mouse is down)
    const canvas = document.querySelector(".canvas");
    let click = true;
    canvas.addEventListener("mousedown", function(){click = true;});
    canvas.addEventListener("mouseup", function(){click = false;});

    // Fill black color when mouse is over a gird
    grids.forEach(grid => {
        grid.addEventListener("mouseover", function(){
            if(click) grid.style.backgroundColor="black";
        });
    });
}

function drawRainbowColor(grids) {
    // Activate mousedown mode (Only draw when mouse is down)
    const canvas = document.querySelector(".canvas");
    let click = true;
    canvas.addEventListener("mousedown", function(){click = true;});
    canvas.addEventListener("mouseup", function(){click = false;});

    let count = 0; // counter
    // Fill random color when mouse is over a gird
    grids.forEach(grid => {
        grid.addEventListener("mouseover", function(){
            if(click){
                // Random rgb color
                const randomColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
                // Fill black color after filling 10 random colors
                if(count == 10){
                    grid.style.backgroundColor="black";
                    count=0;    // Reset counter
                }
                else{
                    grid.style.backgroundColor= randomColor;
                    count++;    // Increment counter
                }
            }
        });
    });
}

// Clear all drawings on the canvas
function clearCanvas(grids) {
    grids.forEach(grid => grid.style.background = "whitesmoke");
}


main(); // Call main