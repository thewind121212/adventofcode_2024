import fs from "fs";

const input = fs.readFileSync("./04.txt", "utf8");

const row = input.split("\n").map((row) => row);

const col = [];

for (let i = 0; i < row.length; i++) {
  col[i] = [];
  for (let j = 0; j < row[i].length; j++) {
    col[i].push(row[j][i]);
  }
  col[i] = col[i].join("");
}

const topRightDiagonal = [];
const topLeftDiagonal = [];
const bottomLeftDiagonal = [];
const bottomRightDiagonal = [];


const gridSize = row.length;

for (let i = 0; i < gridSize; i++) {
  topRightDiagonal[i] = [];
  topLeftDiagonal[i] = [];
  bottomRightDiagonal[i] = [];
  bottomLeftDiagonal[i] = [];

  for (let j = 0; j < gridSize - i; j++) {
    // Top-right diagonal
    topRightDiagonal[i].push(row[j][j + i]);
    // Bottom-right diagonal
    bottomRightDiagonal[i].push(row[i + j][gridSize - 1 - j]);

    // For top-left and bottom-left diagonals, check i !== 0 to avoid duplicates
    if (i !== 0) {
      // Top-left diagonal
      topLeftDiagonal[i].push(row[j + i][j]);
      // Bottom-left diagonal
      bottomLeftDiagonal[i].push(row[j][gridSize - 1 - (j + i)]);
    }
  }

  // Join each diagonal into a string (if needed)
  topRightDiagonal[i] = topRightDiagonal[i].join("");
  topLeftDiagonal[i] = topLeftDiagonal[i].join("");
  bottomRightDiagonal[i] = bottomRightDiagonal[i].join("");
  bottomLeftDiagonal[i] = bottomLeftDiagonal[i].join("");
}


let allLines = [
    ...row,
    ...row.map((r) => r.split("").reverse().join("")), 
    ...col,
    ...col.map((c) => c.split("").reverse().join("")), 
    ...topRightDiagonal,
    ...topRightDiagonal.map((d) => d.split("").reverse().join("")), // Add reversed top-right diagonals
    ...topLeftDiagonal,
    ...topLeftDiagonal.map((d) => d.split("").reverse().join("")), // Add reversed top-left diagonals
    ...bottomRightDiagonal,
    ...bottomRightDiagonal.map((d) => d.split("").reverse().join("")), // Add reversed bottom-right diagonals
    ...bottomLeftDiagonal,
    ...bottomLeftDiagonal.map((d) => d.split("").reverse().join("")), // Add reversed bottom-left diagonals
  ];

//check xmas in all diagonals 

function countXmas(lines) {
    let count = 0;
    for (const line of lines) {
      // Count occurrences of "XMAS" in the current line
      const matches = line.match(/XMAS/g);
      if (matches) count += matches.length;
    }
    return count;
  }

  console.log(countXmas(allLines));





 allLines = [ ]

var width = 0
var height = 0

var xmasCount = 0

function main() {

    processInput()

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            
            checkXmasAt(row, col)   
        }
    }
    
    console.log("the answer is", xmasCount)
}

function processInput() {
        
    const lines = input.split("\n")
    
    for (const line of lines) { allLines.push(line.trim()) }
    
    height = allLines.length
    width = allLines[0].length
}

function checkXmasAt(row, col) {

    if (allLines[row][col] != "X") { return }
    
    checkXmasToEast(row, col)
    checkXmasToWest(row, col)
    checkXmasToNorth(row, col)
    checkXmasToSouth(row, col)
    checkXmasToNorthEast(row, col)
    checkXmasToNorthWest(row, col)
    checkXmasToSouthEast(row, col)
    checkXmasToSouthWest(row, col)
}

function gotMatch(row, col, symbol) {

    if (row < 0) { return false }
    if (col < 0) { return false }

    if (row >= height) { return false }
    if (col >= width)  { return false }

    return allLines[row][col] == symbol
}

///////////////////////////////////////////////////////////////////////////////

function checkXmasToEast(row, col) {
    if (! gotMatch(row, col + 1,  "M")) { return }
    if (! gotMatch(row, col + 2,  "A")) { return }
    if (! gotMatch(row, col + 3,  "S")) { return }
    xmasCount += 1
}

function checkXmasToWest(row, col) {
    if (! gotMatch(row, col - 1,  "M")) { return }
    if (! gotMatch(row, col - 2,  "A")) { return }
    if (! gotMatch(row, col - 3,  "S")) { return }
    xmasCount += 1
}

function checkXmasToNorth(row, col) {
    if (! gotMatch(row - 1, col,  "M")) { return }
    if (! gotMatch(row - 2, col,  "A")) { return }
    if (! gotMatch(row - 3, col,  "S")) { return }
    xmasCount += 1
}

function checkXmasToSouth(row, col) {
    if (! gotMatch(row + 1, col,  "M")) { return }
    if (! gotMatch(row + 2, col,  "A")) { return }
    if (! gotMatch(row + 3, col,  "S")) { return }
    xmasCount += 1
}

function checkXmasToNorthEast(row, col) {
    if (! gotMatch(row - 1, col + 1,  "M")) { return }
    if (! gotMatch(row - 2, col + 2,  "A")) { return }
    if (! gotMatch(row - 3, col + 3,  "S")) { return }
    xmasCount += 1
}

function checkXmasToNorthWest(row, col) {
    if (! gotMatch(row - 1, col - 1,  "M")) { return }
    if (! gotMatch(row - 2, col - 2,  "A")) { return }
    if (! gotMatch(row - 3, col - 3,  "S")) { return }
    xmasCount += 1
}

function checkXmasToSouthEast(row, col) {
    if (! gotMatch(row + 1, col + 1,  "M")) { return }
    if (! gotMatch(row + 2, col + 2,  "A")) { return }
    if (! gotMatch(row + 3, col + 3,  "S")) { return }
    xmasCount += 1
}

function checkXmasToSouthWest(row, col) {
    if (! gotMatch(row + 1, col - 1,  "M")) { return }
    if (! gotMatch(row + 2, col - 2,  "A")) { return }
    if (! gotMatch(row + 3, col - 3,  "S")) { return }
    xmasCount += 1
}

console.time("execution time")
main()
console.timeEnd("execution time") // 5ms

