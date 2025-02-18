// Initialize
const map_object = new Map();

// Set Map w/ key-value
map_object.set("a", 1);
map_object.set("b", 2);
map_object.set("c", 3);

console.log(`a : ${map_object.get("a")}`);
console.log(`b : ${map_object.get("b")}`);
console.log(`c : ${map_object.get("c")}`);

// Modify Map
map_object.set("a", 4);
map_object.set("b", 5);
map_object.set("c", 6);

console.log(`a (after modified) : ${map_object.get("a")}`);
console.log(`b (after modified) : ${map_object.get("b")}`);
console.log(`c (after modified) : ${map_object.get("c")}`);

// map.size()
console.log(`map_object.size : ${map_object.size}`);

// Delete map element
map_object.delete("b");

console.log(`map_object.size (after deleted): ${map_object.size}`)