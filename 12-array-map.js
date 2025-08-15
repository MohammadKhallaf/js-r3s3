"use strict";

console.log("=== Array map ===");

const numbers = [1, 2, 3, 4, 5];

// Basic map - transformation
const doubled = numbers.map((num) => num * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);

// Map always returns new array of same length
const squared = numbers.map((num) => num ** 2);
console.log("Squared:", squared);

// String transformations
const words = ["hello", "world", "javascript"];
const uppercased = words.map((word) => word.toUpperCase());
const lengths = words.map((word) => word.length);

console.log("Original words:", words);
console.log("Uppercased:", uppercased);
console.log("Lengths:", lengths);

// Working with objects
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

// Extract specific properties
const names = users.map((user) => user.name);
const ids = users.map((user) => user.id);
console.log("Names:", names);
console.log("IDs:", ids);

// Transform objects
const usersWithStatus = users.map((user) => ({
  ...user,
  status: user.age >= 30 ? "senior" : "junior",
}));
console.log("Users with status:", usersWithStatus);

// Using index parameter
const numbersWithIndex = numbers.map((num, index) => ({
  value: num,
  index: index,
  doubled: num * 2,
}));
console.log("Numbers with index:", numbersWithIndex);

// Chaining map operations
const processed = numbers
  .map((num) => num * 2) // [2, 4, 6, 8, 10]
  .map((num) => num + 1) // [3, 5, 7, 9, 11]
  .map((num) => `#${num}`); // ["#3", "#5", "#7", "#9", "#11"]

console.log("Chained operations:", processed);

// map vs forEach comparison
console.log("\nmap vs forEach:");

// forEach - side effects, no return
const forEachResult = [];
numbers.forEach((num) => {
  forEachResult.push(num * 2);
});
console.log("forEach approach:", forEachResult);

// map - functional, returns new array
const mapResult = numbers.map((num) => num * 2);
console.log("map approach:", mapResult);

// Converting data formats
const temperatures = [
  { city: "New York", celsius: 20 },
  { city: "London", celsius: 15 },
  { city: "Tokyo", celsius: 25 },
];

const temperaturesWithFahrenheit = temperatures.map((temp) => ({
  ...temp,
  fahrenheit: (temp.celsius * 9) / 5 + 32,
}));

console.log("Temperatures with Fahrenheit:", temperaturesWithFahrenheit);

// Conditional transformations
const mixedNumbers = [-2, -1, 0, 1, 2];
const absoluteValues = mixedNumbers.map((num) => Math.abs(num));
const signs = mixedNumbers.map((num) => {
  if (num > 0) return "positive";
  if (num < 0) return "negative";
  return "zero";
});

console.log("Mixed numbers:", mixedNumbers);
console.log("Absolute values:", absoluteValues);
console.log("Signs:", signs);
