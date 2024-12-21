const fs = require("fs");

fs.readFile("01.txt", "utf-8", (err, data) => {
  const arr = data.split("\n").map((row) => row.split("   "));

  const left = arr.map(([leftItem]) => +leftItem).sort();
  const right = arr.map(([, rightItem]) => +rightItem).sort();

  // Part I


  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(right[i] - left[i]);
  }

  console.log(sum);


  // Part II
  //init way to solve it

  sum = 0;
  const objectMapping = {};

  for (let i = 0; i < right.length; i++) {
    const key = right[i];

    if (objectMapping[key]) {
      objectMapping[key] = objectMapping[key] + key;
    } else {
      objectMapping[key] = key;
    }
  }

  for (let i = 0; i < left.length; i++) {
    if (objectMapping[left[i]]) {
        sum += objectMapping[left[i]];
    }
  }

  //another way to do it


   for (let i = 0; i < left.length; i++) {
    sum += Math.abs(right[i] - left[i]);
  }
  console.log(sum);

  // Part II
  for (let i = 0; i < left.length; i++) {
    const number = left[i];
    //find the first occurrence of the number in the right array
    const leftIdx = right.indexOf(number);
    if (leftIdx === -1) {
      continue;
    }

    //find the last occurrence of the number in the right array
    const rightIdx = right.lastIndexOf(number);

    //calculate the sum by multiplying the number by the number of occurrences
    sum += (rightIdx - leftIdx + 1) * number;
  }

});
