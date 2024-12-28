const fs = require("fs");

const input = fs.readFileSync("07.txt", "utf8").toString();

const row = input
  .split("\n")
  .map((row) => row.replace("\r", "").replace(":", ""));

function generateOperatorCases(n) {
  if (n === 0) return [""];

  const smallerStrings = generateOperatorCases(n - 1);
  const result = [];
  for (const str of smallerStrings) {
    result.push("+" + str);
    result.push("*" + str);
  }

  return result;
}

function calculate(numberArry, operatorArry, compareResult) {
  let isEqual = false;
  operatorArry.map((operator) => {
    let result = [];
    numberArry.map((number, j) => {
      result.push(number);
      if (operator.length > j) {
        result.push(operator[j]);
      }
    });

    if (Number(compareResult[0]) === eval(result.join(""))) {
      isEqual = true;
      return ;
    }
  });


  return isEqual;
}

let count = 0;

row.map((row) => {
  const data = row.split(" ");
  const result = data.splice(0, 1);
  const numberForOperation = [...data];
  const operatorCases = generateOperatorCases(numberForOperation.length - 1);
  const operatorResults = calculate(numberForOperation, operatorCases, result);

  count += operatorResults ? Number(result[0]) : 0;
});


console.log(count);