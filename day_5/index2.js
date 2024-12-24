import fs from "fs";

const input = fs.readFileSync("05.txt").toString().trim().split("\n");

//get the number and there ban list

//solution 1

const reorderPages = (numberArray) => {
  const graph = {};
  const inDegree = {};

  // Initialize graph and in-degree
  numberArray.forEach((page) => {
    graph[page] = [];
    inDegree[page] = 0;
  });

  for (const [ls, fsList] of Object.entries(banList)) {
    if (numberArray.includes(ls)) {
      fsList.forEach((fs) => {
        if (numberArray.includes(fs)) {
          graph[fs].push(ls);
          inDegree[ls]++;
        }
      });
    }
  }

  // Perform topological sort
  const queue = [];
  numberArray.forEach((page) => {
    if (inDegree[page] === 0) queue.push(page);
  });

  const sorted = [];
  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);
    graph[current].forEach((neighbor) => {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    });
  }

  return sorted;
};

// Process each row

const banList = {};

let sum = 0;
let count = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] === "") {
    input.splice(0, i + 1);
    break;
  }
  const [fs, ls] = input[i].split("|");
  banList[ls] ? banList[ls].push(fs) : (banList[ls] = [fs]);
}

const resInput = input;
resInput.map((row) => {
  const numberArray = row.split(",");
  if (numberArray.length === 1) {
    sum += parseInt(numberArray[0]);
    return;
  }

  let isValidPrint = true;
  let tempBanList = [];
  for (let i = 0; i < numberArray.length; i++) {
    if (banList[numberArray[i]]) {
      tempBanList.push(...banList[numberArray[i]]);
    }

    if (tempBanList.includes(numberArray[i])) {
      isValidPrint = false;
      break; // No need to continue checking if already invalid
    }
  }

  if (!isValidPrint) {
    count++;
    const reordered = reorderPages(numberArray);
    sum += parseInt(reordered[(reordered.length - 1) / 2]);
  } });

console.log(sum);

console.time("execution time");
