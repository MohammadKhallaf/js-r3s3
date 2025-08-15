"use strict";

console.log("=== Spread Operator ===");

// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log("Combined arrays:", combined);

// Array cloning
const original = [1, 2, 3];
const clone = [...original];
clone.push(4);
console.log("Original:", original);
console.log("Clone:", clone);

// Function call spreading
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log("Sum with spread:", sum(...numbers));

// Math.max/min with arrays
const scores = [89, 76, 92, 85];
console.log("Highest score:", Math.max(...scores));
console.log("Lowest score:", Math.min(...scores));

// Object spreading (ES2018)
const person = { name: "Alice", age: 30 };
const employee = { ...person, role: "Developer", salary: 75000 };
console.log("Employee:", employee);

// Overriding properties
const defaults = { theme: "light", language: "en" };
const userPrefs = { language: "fr" };
const config = { ...defaults, ...userPrefs };
console.log("Config:", config);

// Nested spreading
const address = { street: "123 Main St", city: "Boston" };
const contact = { email: "alice@example.com", phone: "555-1234" };
const user = {
  ...person,
  ...address,
  contact: { ...contact },
};
console.log("User:", user);
