// Global declarations
var cell_size = 8;
var columns;
var rows;
var cells = []; // the past
var newcells = []; // the future

function setup() {
  // only runs once, at the start
  // create a p5.js canvas
  // fill the available window
  canvas = createCanvas(800, 800);
  background(30, 130, 80); // 0-255 for black-white
  noStroke();
  columns = floor(800 / 8);
  rows = floor(800 / 8);
  //console.log(columns, rows);

  // create the cells:
  for (var r = 0; r < rows; r++) {
    cells[r] = []; // every row is another list
    newcells[r] = [];
    for (var c = 0; c < columns; c++) {
      state = floor(random(2));
      cells[r][c] = state; // every column of every row is a state
      newcells[r][c] = state;
    }
  }
}

function draw() {
  // is run endlessly, at 30 or 60 frames per second

  // first, pass over each cell to update newcells by transition function
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
      // boundary conditions
      if (r == 0 || c == 0 || r == rows - 1 || c == columns - 1) {
        newcells[r][c] = floor(random(2));
      } else {
        var C = cells[r][c];
        var N = cells[r - 1][c];
        var S = cells[r + 1][c];
        var W = cells[r][c - 1];
        var E = cells[r][c + 1];
        var NE = cells[r - 1][c + 1];
        var NW = cells[r - 1][c - 1];
        var SE = cells[r + 1][c + 1];
        var SW = cells[r + 1][c - 1];
        // just add up how many are alive:
        var neighbours = N + S + E + W + NW + SW + NE + SE;

        if (C == 1) {
          // if we are alive
          if (neighbours < 2) {
            newcells[r][c] = 0; // death by loneliness
          } else if (neighbours > 3) {
            newcells[r][c] = 0; // death by overcrowding
          } else {
            newcells[r][c] = 1;
          }
        } else {
          // we are dead
          if (neighbours == 3) {
            newcells[r][c] = 1; // new birth
          } else {
            newcells[r][c] = 0; // stay dead
          }
        }
      }
    }
  }

  // copy the cells over and draw them:
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
      // read from the future:
      var state = newcells[r][c];
      // now draw it:
      fill(state * 185, cells[r][c] * 185, state * 255);
      rect(8 * c, 8 * r, 8, 8);

      // to replace the past:
      cells[r][c] = state;
    }
  }
}
