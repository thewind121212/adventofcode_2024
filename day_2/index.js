const fs = require("fs");

fs.readFile("02.txt", "utf-8", (err, data) => {
  const report = data.trim().split("\n");

  //read file and covert to array of number array
  const reportArr = [];
  report.map((row) =>
    reportArr.push(row.split(" ").map((item) => Number(item.replace("\r", ""))))
  );

  //Part I
  // first thiking
  let safeCount = 0;

  reportArr.map((row) => {
    isSafe = checkSafe(row);

    if (isSafe) {
      safeCount++;
    }
  });

  console.log(safeCount);

  // optimize way

  safeCount = 0;
  reportArr.map((row) => {
    isSafe = checkSafe2(row);
    if (isSafe) {
      safeCount++;
    }
  });

  console.log(safeCount);

  //Part II

  safeCount = 0;

  reportArr.map((row) => {
    for (let i = -1; i < row.length; i++) {
      const cloneRow = [...row];
      if (i !== -1) {
        cloneRow.splice(i, 1);
      }
      isSafe = checkSafe(cloneRow);
      if (isSafe) {
        safeCount++;
        break;
      }
    }
  });

  console.log(safeCount);
});

const checkSafe = (row) => {
  let isSafe = true;
  let flow;
  for (let i = 0; i < row.length; i++) {
    const gap = row[i + 1] - row[i];
    const absGap = Math.abs(gap);
    if (absGap > 3 || absGap <= 0) {
      isSafe = false;
      break;
    }
    if (i === 0 && gap > 0) {
      flow = "asc";
    } else if (i === 0 && gap < 0) {
      flow = "desc";
    }

    if (flow === "asc" && gap < 0) {
      isSafe = false;
      break;
    } else if (flow === "desc" && gap > 0) {
      isSafe = false;
      break;
    }
  }

  return isSafe;
};

const checkSafe2 = (row) => {
  let isSafe = true;
  for (let i = 1; i < row.length; i++) {
    const isIncreasing = row[1] > row[0];
    const isDecreasing = row[1] < row[0];
    const diff = row[i] - row[i - 1];

    // Check if difference is at least 1 and at most 3
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      isSafe = false;
      break;
    }

    // Check if the sequence maintains a consistent trend
    if (isIncreasing && diff <= 0) {
      isSafe = false;
      break;
    }
    if (isDecreasing && diff >= 0) {
      isSafe = false;
      break;
    }
  }

  return isSafe
};

