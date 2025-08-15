"use strict";

console.log("=== Rest Parameters ===");

// Basic rest parameters
function sum(...numbers) {
  console.log("numbers is:", numbers);
  return numbers.reduce((total, num) => total + num, 0);
}

console.log("Sum of 1,2,3:", sum(1, 2, 3));
console.log("Sum of 1,2,3,4,5:", sum(1, 2, 3, 4, 5));

// Rest with regular parameters
function introduce(name, age, ...hobbies) {
  console.log(`Name: ${name}, Age: ${age}`);
  console.log("Hobbies:", hobbies);
}

introduce("Alice", 25, "reading", "swimming", "coding");

// vs arguments object (old way)
function oldWaySum() {
  console.log("arguments object:", arguments);
  // arguments is not a real array
  const argsArray = Array.from(arguments);
  return argsArray.reduce((total, num) => total + num, 0);
}

function newWaySum(...numbers) {
  console.log("rest parameters:", numbers);
  // numbers is a real array
  return numbers.reduce((total, num) => total + num, 0);
}

console.log("Old way:", oldWaySum(1, 2, 3));
console.log("New way:", newWaySum(1, 2, 3));

// Rest in arrow functions
const multiply = (...numbers) => {
  return numbers.reduce((product, num) => product * num, 1);
};

console.log("Product:", multiply(2, 3, 4));

// Collecting remaining arguments
function processData(action, ...data) {
  switch (action) {
    case "sum":
      return data.reduce((a, b) => a + b, 0);
    case "multiply":
      return data.reduce((a, b) => a * b, 1);
    case "concat":
      return data.join("");
    default:
      return data;
  }
}

console.log("Sum action:", processData("sum", 1, 2, 3, 4));
console.log("Multiply action:", processData("multiply", 2, 3, 4));
console.log("Concat action:", processData("concat", "Hello", " ", "World"));
