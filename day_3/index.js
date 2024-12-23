

import fs from 'fs'
import { machine } from 'os';


const input = fs.readFileSync('./03.txt', 'utf8')


//soluton 1

const MUL_PATTERN = /mul\((\d+),(\d+)\)/g;

const matchs = input.match(MUL_PATTERN);

let sum1 = 0

matchs.map((match) => {
  const [a, b] =  match.replace('mul(', '').replace(')', '').split(',')
  sum1 += Number(a) * Number(b)
});

console.log(sum1)

//soluton 2
const MUL_DO_DONT_PATTERN = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g

const match2 = input.match(MUL_DO_DONT_PATTERN);

let sum2 = 0

let isDoMul = true

match2.map((match) => {
  if (match === 'don\'t()') {
    isDoMul = false  
    return
  }
  if (match === 'do()') {
    isDoMul = true
    return
  }

  if (isDoMul) {
    const [a, b] =  match.replace('mul(', '').replace(')', '').split(',')
    sum2 += Number(a) * Number(b)
  }

});

console.log(sum2)

