"use strict";

console.log("=== Array keys & entries ===");

const fruits = ["apple", "banana", "orange", "grape"];

// Array.keys() - returns iterator of indices
const keysIterator = fruits.keys();
console.log("Keys iterator:", keysIterator);

// Converting iterator to array
const keysArray = Array.from(fruits.keys());
console.log("Keys as array:", keysArray); // [0, 1, 2, 3]

// Using for...of with keys
console.log("Iterating over keys:");
for (const index of fruits.keys()) {
  console.log(`Index: ${index}, Value: ${fruits[index]}`);
}

// Array.entries() - returns iterator of [index, value] pairs
const entriesIterator = fruits.entries();
console.log("Entries iterator:", entriesIterator);

// Converting entries to array
const entriesArray = Array.from(fruits.entries());
console.log("Entries as array:", entriesArray);
// [[0, "apple"], [1, "banana"], [2, "orange"], [3, "grape"]]

// Using for...of with entries
console.log("Iterating over entries:");
for (const [index, value] of fruits.entries()) {
  console.log(`${index}: ${value}`);
}

// Destructuring in for...of loop
console.log("Destructuring entries:");
for (const entry of fruits.entries()) {
  const [index, fruit] = entry;
  console.log(`Fruit ${index + 1}: ${fruit}`);
}

// Using entries for array transformation
const indexedFruits = Array.from(fruits.entries()).map(([index, fruit]) => ({
  id: index,
  name: fruit,
  position: index + 1,
}));
console.log("Indexed fruits:", indexedFruits);

// Finding index and value together
const targetFruit = "orange";
for (const [index, fruit] of fruits.entries()) {
  if (fruit === targetFruit) {
    console.log(`Found ${targetFruit} at index ${index}`);
    break;
  }
}

// Sparse arrays
const sparseArray = [1, , 3, , 5]; // Has holes at indices 1 and 3
console.log("Sparse array:", sparseArray);
console.log("Sparse array keys:", Array.from(sparseArray.keys()));
console.log("Sparse array entries:", Array.from(sparseArray.entries()));

// Working with objects in arrays
const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "moderator" },
];

// Add index to each user
const usersWithIndex = Array.from(users.entries()).map(([index, user]) => ({
  ...user,
  index,
  id: `user-${index}`,
}));
console.log("Users with index:", usersWithIndex);

// Creating lookup tables
const fruitLookup = Array.from(fruits.entries()).reduce(
  (lookup, [index, fruit]) => {
    lookup[fruit] = index;
    return lookup;
  },
  {}
);
console.log("Fruit lookup:", fruitLookup);

// Reverse lookup
const indexLookup = Array.from(fruits.entries()).reduce(
  (lookup, [index, fruit]) => {
    lookup[index] = fruit;
    return lookup;
  },
  {}
);
console.log("Index lookup:", indexLookup);

// Using with filter to get filtered indices
const longFruits = Array.from(fruits.entries())
  .filter(([index, fruit]) => fruit.length > 5)
  .map(([index, fruit]) => ({ index, fruit }));
console.log("Long fruits with indices:", longFruits);

// Manual iterator usage
console.log("\nManual iterator usage:");
const manualKeys = fruits.keys();
console.log("First key:", manualKeys.next()); // { value: 0, done: false }
console.log("Second key:", manualKeys.next()); // { value: 1, done: false }

const manualEntries = fruits.entries();
console.log("First entry:", manualEntries.next()); // { value: [0, "apple"], done: false }
console.log("Second entry:", manualEntries.next()); // { value: [1, "banana"], done: false }

// Creating enumerated lists
function createEnumeratedList(items, startIndex = 1) {
  return Array.from(items.entries()).map(
    ([index, item]) => `${startIndex + index}. ${item}`
  );
}

const todoList = ["Buy groceries", "Walk the dog", "Finish project"];
const enumeratedTodo = createEnumeratedList(todoList);
console.log("Enumerated todo list:", enumeratedTodo);

// Finding all indices of duplicates
const numbersWithDuplicates = [1, 2, 3, 2, 4, 2, 5];
const duplicateIndices = Array.from(numbersWithDuplicates.entries())
  .filter(([index, value]) => value === 2)
  .map(([index, value]) => index);
console.log("Indices of number 2:", duplicateIndices);

// Grouping consecutive elements
const numbers = [1, 2, 3, 5, 6, 8, 9, 10];
const groups = [];
let currentGroup = [];

for (const [index, number] of numbers.entries()) {
  if (index === 0 || number === numbers[index - 1] + 1) {
    currentGroup.push(number);
  } else {
    groups.push([...currentGroup]);
    currentGroup = [number];
  }
}
if (currentGroup.length > 0) {
  groups.push(currentGroup);
}

console.log("Consecutive groups:", groups);

// Creating a custom enumerate function
function* enumerate(iterable, start = 0) {
  let index = start;
  for (const item of iterable) {
    yield [index++, item];
  }
}

console.log("Custom enumerate:");
for (const [index, fruit] of enumerate(fruits, 1)) {
  console.log(`${index}: ${fruit}`);
}

// Performance comparison
console.log("\nPerformance comparison:");
const largeArray = Array.from({ length: 100000 }, (_, i) => `item-${i}`);

console.time("for...of with entries");
let count1 = 0;
for (const [index, value] of largeArray.entries()) {
  if (index % 1000 === 0) count1++;
}
console.timeEnd("for...of with entries");

console.time("traditional for loop");
let count2 = 0;
for (let i = 0; i < largeArray.length; i++) {
  if (i % 1000 === 0) count2++;
}
console.timeEnd("traditional for loop");

console.time("forEach with index");
let count3 = 0;
largeArray.forEach((value, index) => {
  if (index % 1000 === 0) count3++;
});
console.timeEnd("forEach with index");

console.log("All counts equal:", count1 === count2 && count2 === count3);

// Practical example: Creating a table
const tableData = [
  ["Name", "Age", "City"],
  ["Alice", "25", "Boston"],
  ["Bob", "30", "New York"],
  ["Charlie", "35", "Chicago"],
];

console.log("\nTable with row numbers:");
for (const [rowIndex, row] of tableData.entries()) {
  const rowType = rowIndex === 0 ? "Header" : "Row";
  console.log(`${rowType} ${rowIndex}:`, row.join(" | "));
}

// Array modification tracking
const originalArray = ["a", "b", "c"];
const modifications = [];

// Simulate tracking changes
originalArray.splice(1, 0, "x"); // Insert "x" at index 1

// Find what changed by comparing indices
const newArray = originalArray;
for (const [index, value] of newArray.entries()) {
  console.log(`Position ${index}: ${value}`);
}
