import fs from "fs";

const input = fs.readFileSync("05.txt").toString().trim().split("\n");

//get the number and there ban list

//solution 1
const banList = {};

for (let i = 0; i < input.length; i++) {
  if (input[i] === "") {
    input.splice(0, i + 1);
    break;
  }
  const [fs, ls] = input[i].split("|");
  banList[ls] ? banList[ls].push(fs) : (banList[ls] = [fs]);
}

const resInput = input;
let sum = 0;
let count = 0;

resInput.map((row, j) => {
  const numberArray = row.split(",");
  if (numberArray.length === 1) {
    sum += parseInt(numberArray[0]);
    return;
  }

  let isValidPrint = true;
  const tempBanList = [];
  for (let i = 0; i < numberArray.length; i++) {
    if (banList[numberArray[i]]) {
      tempBanList.push(...banList[numberArray[i]]);
    }

    if (tempBanList.includes(numberArray[i])) {
      isValidPrint = false;
      break;
    }
  }

  if (isValidPrint) {
    sum += parseInt(numberArray[(numberArray.length - 1) / 2]);
    count++;
  }
});

console.log(sum);
console.log(count);
