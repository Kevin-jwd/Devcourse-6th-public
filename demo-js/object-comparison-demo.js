console.log("--------------------------------------------------");
// Comparison between two empty objects
const obj1 = {};
const obj2 = {};

console.log(`(obj1 == obj2) : ${obj1 == obj2}`); // false
console.log("--------------------------------------------------");

// Comparison between two lookalike objects
const obj3 = { foo: "bar" };
const obj4 = { foo: "bar" };

console.log(`(obj3 == obj4) : ${obj3 == obj4}`); // false
console.log("--------------------------------------------------");

// Comparison between two empty objects using Object.keys()
console.log(`Object.keys(obj1) : ${Object.keys(obj1)}`);
console.log(`Object.keys(obj2) : ${Object.keys(obj2)}`);
console.log(
    `(Object.keys(obj1) == Object.keys(obj2)) : ${
        Object.keys(obj1) == Object.keys(obj2)
    }`
); // false
console.log("--------------------------------------------------");

// Comparison between two lookalike objects using Object.keys()
console.log(`Object.keys(obj3) : ${Object.keys(obj3)}`);
console.log(`Object.keys(obj4) : ${Object.keys(obj4)}`);

console.log(
    `(Object.keys(obj3) == Object.keys(obj4)) : ${
        Object.keys(obj3) == Object.keys(obj4)
    }`
); // false

console.log("--------------------------------------------------");

// Checking Object.keys().length
console.log(`Object.keys(obj1).length : ${Object.keys(obj1).length}`);
console.log(`Object.keys(obj2).length : ${Object.keys(obj2).length}`);

console.log(`Object.keys(obj3).length : ${Object.keys(obj3).length}`);
console.log(`Object.keys(obj4).length : ${Object.keys(obj4).length}`);
console.log("--------------------------------------------------");

// Comparison using Object.keys().length
console.log(
    `Object.keys(obj1).length == Object.keys(obj2).length : ${
        Object.keys(obj1).length == Object.keys(obj2).length
    }`
); // true

console.log(
    `Object.keys(obj3).length == Object.keys(obj4).length : ${
        Object.keys(obj3).length == Object.keys(obj4).length
    }`
); // true
console.log("--------------------------------------------------");

// Correct way to compare objects
console.log(
    `JSON.stringify(obj1) == JSON.stringify(obj2) : ${
        JSON.stringify(obj1) == JSON.stringify(obj2)
    }`
); // true

console.log(
    `JSON.stringify(obj3) == JSON.stringify(obj4) : ${
        JSON.stringify(obj3) == JSON.stringify(obj4)
    }`
); // true

console.log("--------------------------------------------------");
