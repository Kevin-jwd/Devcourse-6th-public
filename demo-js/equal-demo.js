// Differences between "==" and "==="

// "===" : Strict Equality Operator
const num = 0;
const obj = new String("0");
const str = "0";

console.log(`num === num : ${num === num}`);
console.log(`obj === obj : ${obj === obj}`);
console.log(`str === str : ${str === str}`);
console.log("-----------------------------");

console.log(`num === obj : ${num === obj}`);
console.log(`num === str : ${num === str}`);
console.log(`obj === str : ${obj === str}`);
console.log("-----------------------------");

console.log(`null === undefined : ${null === undefined}`);
console.log("-----------------------------");

// "==" : Loose Equality Operator
console.log(`num == num : ${num == num}`);
console.log(`obj == obj : ${obj == obj}`);
console.log(`str == str : ${str == str}`);
console.log("-----------------------------");

console.log(`num == obj : ${num == obj}`);
console.log(`num == str : ${num == str}`);
console.log(`obj == str : ${obj == str}`);
console.log("-----------------------------");

console.log(`null == undefined : ${null == undefined}`);
console.log("-----------------------------");
