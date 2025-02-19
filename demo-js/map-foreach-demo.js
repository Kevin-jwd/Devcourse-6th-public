let map = new Map();

map.set(5, "five");
map.set(6, "six");
map.set(7, "seven");
map.set(8, "eight");

map.forEach(function (value, index, array) {
    console.log("-----------------------------------------");
    console.log("value : " + value + ", index : " + index + ", array : " + array);
});