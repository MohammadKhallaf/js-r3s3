"use strict";

console.log("=== Array forEach ===");

const fruits = ["apple", "banana", "orange", "grape"];

// Basic forEach
console.log("Basic forEach:");
fruits.forEach(function (fruit) {
  console.log("Fruit:", fruit);
});

// Arrow function syntax
console.log("\nWith arrow function:");
fruits.forEach((fruit) => console.log("Fruit:", fruit));

// With index and array parameters
console.log("\nWith index:");
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});

console.log("\nWith all parameters:");
fruits.forEach((fruit, index, array) => {
  console.log(`${index}: ${fruit} (array length: ${array.length})`);
});

// Modifying external variables
let total = 0;
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
  total += num;
});
console.log("Total sum:", total);

// forEach vs for loop comparison
console.log("\nComparison with for loop:");

// For loop
console.log("For loop:");
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i}: ${fruits[i]}`);
}

// forEach equivalent
console.log("forEach equivalent:");
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});

// forEach with objects
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

users.forEach((user) => {
  console.log(`${user.name} is ${user.age} years old`);
});

// forEach doesn't return anything
const result = fruits.forEach((fruit) => fruit.toUpperCase());
console.log("forEach return value:", result); // undefined

// Early termination (not possible with forEach)
console.log("\nNote: forEach cannot break early");
try {
  fruits.forEach((fruit) => {
    if (fruit === "banana") {
      // break; // This would cause an error
      return; // This only skips current iteration
    }
    console.log("Processing:", fruit);
  });
} catch (error) {
  console.log("Error:", error.message);
}

// Side effects example
const processedFruits = [];
fruits.forEach((fruit) => {
  processedFruits.push(fruit.toUpperCase());
});
console.log("Processed fruits:", processedFruits);
