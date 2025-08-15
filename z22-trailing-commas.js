"use strict";

console.log("=== Trailing Commas ===");

// Trailing commas (also called "dangling commas") are allowed in many places

// Arrays - ES5+
const fruits = [
  "apple",
  "banana",
  "orange", // ← trailing comma
];

console.log("Fruits array:", fruits);
console.log("Array length:", fruits.length); // Still 3, not 4

// Objects - ES5+
const person = {
  name: "Alice",
  age: 30,
  city: "Boston", // ← trailing comma
};

console.log("Person object:", person);

// Function parameters - ES2017+
function greetUser(
  name,
  age,
  location // ← trailing comma in parameters
) {
  return `Hello ${name}, age ${age}, from ${location}`;
}

console.log(greetUser("Bob", 25, "New York"));

// Function calls - ES2017+
const message = greetUser(
  "Charlie",
  35,
  "Chicago" // ← trailing comma in arguments
);

console.log("Message:", message);

// Why trailing commas are useful
console.log("\nBenefits of trailing commas:");

// 1. Easier to add new items
const shoppingList = [
  "milk",
  "bread",
  "eggs", // Easy to add more items below
];

// Adding new item:
shoppingList.push("cheese"); // or just add "cheese", to the array literal

// 2. Cleaner git diffs
// Without trailing comma:
// const colors = [
//     "red",
//     "blue"
// ];
//
// Adding "green" shows 2 changed lines:
// +    "blue",
// +    "green"

// With trailing comma:
// const colors = [
//     "red",
//     "blue", // ← already has comma
// ];
//
// Adding "green" shows only 1 changed line:
// +    "green",

// 3. Consistent formatting
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  debug: true, // ← trailing comma for consistency
};

// Destructuring with trailing commas - ES2017+
const {
  apiUrl,
  timeout,
  retries, // ← trailing comma in destructuring
} = config;

console.log("Config values:", { apiUrl, timeout, retries });

// Array destructuring with trailing commas
const [
  first,
  second,
  third, // ← trailing comma
] = ["a", "b", "c"];

console.log("Destructured values:", { first, second, third });

// Import/Export statements - ES2017+
// These would work in modules:
/*
import {
    useState,
    useEffect,
    useContext, // ← trailing comma
} from 'react';

export {
    ComponentA,
    ComponentB,
    ComponentC, // ← trailing comma
};
*/

// Where trailing commas are NOT allowed
console.log("\nWhere trailing commas are NOT allowed:");

// 1. JSON (strict JSON doesn't allow trailing commas)
const jsonString = `{
    "name": "Alice",
    "age": 30
}`; // No trailing comma allowed in JSON

try {
  const parsed = JSON.parse(jsonString);
  console.log("Valid JSON:", parsed);
} catch (error) {
  console.log("JSON parse error:", error.message);
}

// 2. Rest parameters
function restExample(a, b, ...rest /* , */) {
  // Trailing comma not allowed here
  return [a, b, rest];
}

// 3. After rest elements in destructuring
const [x, y, ...remaining /* , */] = [1, 2, 3, 4]; // Not allowed here

// Real-world examples
console.log("\nReal-world examples:");

// API response structure
const apiResponse = {
  data: {
    users: [
      {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        roles: ["admin", "user"], // ← trailing comma
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        roles: ["user"], // ← trailing comma
      }, // ← trailing comma
    ],
    meta: {
      total: 2,
      page: 1,
      limit: 10, // ← trailing comma
    }, // ← trailing comma
  },
  status: "success", // ← trailing comma
};

console.log("API response structure created successfully");

// Function with multiple parameters
function createUser(
  name,
  email,
  age,
  preferences = {},
  roles = [] // ← trailing comma in default parameters
) {
  return {
    name,
    email,
    age,
    preferences,
    roles,
    createdAt: new Date(), // ← trailing comma
  };
}

const newUser = createUser(
  "Diana",
  "diana@example.com",
  28,
  { theme: "dark", notifications: true },
  ["user", "beta-tester"] // ← trailing comma in function call
);

console.log("New user:", newUser);

// ESLint configuration example (would be in .eslintrc.js)
const eslintConfig = {
  rules: {
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline", // ← trailing comma
      },
    ], // ← trailing comma
  }, // ← trailing comma
};

// Array methods with trailing commas
const numbers = [1, 2, 3, 4, 5];

const processed = numbers
  .filter((n) => n > 2)
  .map((n) => n * 2)
  .reduce((sum, n) => sum + n, 0); // No trailing comma needed here (single line)

const processedMultiline = numbers
  .filter((n) => n > 2)
  .map((n) => n * 2)
  .reduce((sum, n) => sum + n, 0); // ← could have trailing comma but not needed

console.log("Processed result:", processed);

// Template for team coding standards
const codingStandards = {
  arrays: "Always use trailing commas in multiline arrays",
  objects: "Always use trailing commas in multiline objects",
  functions: "Use trailing commas in multiline function parameters",
  imports: "Use trailing commas in multiline import statements",
  benefits: [
    "Cleaner git diffs",
    "Easier to add/remove items",
    "Consistent formatting",
    "Reduced merge conflicts", // ← trailing comma
  ], // ← trailing comma
};

console.log("Coding standards defined");

// Browser/Node.js support note
console.log("\nBrowser support:");
console.log("- Arrays/Objects: ES5+ (all modern browsers)");
console.log("- Function parameters: ES2017+ (all modern browsers)");
console.log("- Import/Export: ES2017+ (all modern browsers with modules)");
