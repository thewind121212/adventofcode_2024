import fs from "fs";

const row = fs.readFileSync("06.txt", "utf-8").trim().split("\n");

let grid = [];
let currentPositionX = 0;
let currentPositionY = 0;

let outOfBoundsX = 0;
let outOfBoundsY = 0;
var direction = "up";

const findDirection = (arrow) => {
  switch (arrow) {
    case "^":
      direction = "up";
      break;
    case ">":
      direction = "right";
      break;
    case "<":
      direction = "left";
      break;
    case "v":
      direction = "down";
      break;
  }
};

const changeDirection = (direction) => {
  switch (direction) {
    case "up":
      return "right";
    case "right":
      return "down";
    case "down":
      return "left";
    case "left":
      return "up";
  }
};

for (let i = 0; i < row.length; i++) {
  grid[i] = [];
  i > outOfBoundsY ? (outOfBoundsY = i) : outOfBoundsY;
  for (let j = 0; j < row[i].length; j++) {
    j > outOfBoundsX ? (outOfBoundsX = j) : outOfBoundsX;
    if (row[i][j] === "^") {
      findDirection(row[i][j]);
      currentPositionY = i;
      currentPositionX = j;
    }
    grid[i][j] = row[i][j];
  }
}

//find the current position

let count = 0;
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

while (true) {
  let aheadPositionX = currentPositionX;
  let aheadPositionY = currentPositionY;

  switch (direction) {
    case "up":
      aheadPositionY = currentPositionY - 1;
      break;
    case "right":
      aheadPositionX = currentPositionX + 1;
      break;
    case "down":
      aheadPositionY = currentPositionY + 1;
      break;
    case "left":
      aheadPositionX = currentPositionX - 1;
      break;
  }



  if (
    aheadPositionX > outOfBoundsX ||
    aheadPositionY > outOfBoundsY ||
    aheadPositionX < 0 ||
    aheadPositionY < 0
  ) {
    grid[currentPositionY][currentPositionX] = "endhere";
    break;
  }

  if (grid[aheadPositionY][aheadPositionX] === "#") {
    direction = changeDirection(direction);
  } else {
    currentPositionX = aheadPositionX;
    currentPositionY = aheadPositionY;
    if (grid[currentPositionY][currentPositionX] !== "X") {
      count++;
    }
    grid[currentPositionY][currentPositionX] = "X";
  }
//   await sleep(10);
//   console.log('asdlfjasdlfjsaldfjlsakdjflsadjflkjlkdsajflasdjfl')
//   console.log(grid.map((row) => row.join("")).join("\n"));
//   console.log('asdlfjasdlfjsaldfjlsakdjflsadjflkjlkdsajflasdjfl')
}

console.log(count);
// console.log(grid.map((row) => row.join("")).join("\n"));
