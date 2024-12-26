import fs from "fs";

const row = fs.readFileSync("06.txt", "utf-8").trim().split("\n");

let outGrid = [];
let currentPositionX = 0;
let currentPositionY = 0;

let outOfBoundsX = 0;
let outOfBoundsY = 0;
let direction = "up";

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
  outGrid[i] = [];
  i > outOfBoundsY ? (outOfBoundsY = i) : outOfBoundsY;
  for (let j = 0; j < row[i].length; j++) {
    j > outOfBoundsX ? (outOfBoundsX = j) : outOfBoundsX;
    if (row[i][j] === "^") {
      findDirection(row[i][j]);
      currentPositionY = i;
      currentPositionX = j;
    }
    outGrid[i][j] = row[i][j];
  }
}

const checkLoop = (obY, obX) => {
  const grid = structuredClone(outGrid);
  grid[obY][obX] = "#";
  const visitedStates = new Set();
  let newCurrentPositionX = currentPositionX;
  let newCurrentPositionY = currentPositionY;
  let newDirection = direction;

  while (true) {
    let aheadPositionX = newCurrentPositionX;
    let aheadPositionY = newCurrentPositionY;

    switch (newDirection) {
      case "up":
        aheadPositionY = newCurrentPositionY - 1;
        break;
      case "right":
        aheadPositionX = newCurrentPositionX + 1;
        break;
      case "down":
        aheadPositionY = newCurrentPositionY + 1;
        break;
      case "left":
        aheadPositionX = newCurrentPositionX - 1;
        break;
    }

    // Check for out-of-bounds
    if (
      aheadPositionX > outOfBoundsX ||
      aheadPositionY > outOfBoundsY ||
      aheadPositionX < 0 ||
      aheadPositionY < 0
    ) {
      break;
    }

    // Track the current state (Position + Direction + Grid Snapshot)
    const state = `${newCurrentPositionY},${newCurrentPositionX},${newDirection}`;
    const gridState = grid.map((row) => row.join("")).join("\n");

    const fullState = `${state},${gridState}`;
    if (visitedStates.has(fullState)) {
      visitedStates.clear();
      loopCount++;
      break;
    }
    visitedStates.add(fullState);

    // Movement logic
    if (grid[aheadPositionY][aheadPositionX] === "#") {
      newDirection = changeDirection(newDirection);
    } else {
      newCurrentPositionX = aheadPositionX;
      newCurrentPositionY = aheadPositionY;
      if (grid[newCurrentPositionY][newCurrentPositionX] === ".") {
        grid[newCurrentPositionY][newCurrentPositionX] = "X";
      }
    }
  }
};

var loopCount = 0;

for (let i = 0; i < row.length; i++) {
  for (let j = 0; j < row[i].length; j++) {
    console.log(i, j)
    checkLoop(i, j);
    console.log("Loop count:", loopCount);
  }
}


