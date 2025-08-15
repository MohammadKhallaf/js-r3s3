"use strict";

console.log("=== Destructuring ===");

// Array destructuring
const colors = ["red", "green", "blue", "yellow"];

const [primary, secondary] = colors;
console.log("Primary:", primary, "Secondary:", secondary);

// Skipping elements
const [first, , third] = colors;
console.log("First:", first, "Third:", third);

// Default values
const [a, b, c, d, e = "default"] = colors;
console.log("Fifth color:", e);

// Swapping variables
let x = 1,
  y = 2;
[x, y] = [y, x];
console.log("After swap - x:", x, "y:", y);

// Object destructuring
const person = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
  address: {
    street: "123 Main St",
    city: "Boston",
    country: "USA",
  },
};

const { name, age } = person;
console.log("Name:", name, "Age:", age);

// Renaming variables
const { name: personName, email: contactEmail } = person;
console.log("Person name:", personName, "Contact:", contactEmail);

// Default values in objects
const { name: userName, phone = "No phone" } = person;
console.log("User:", userName, "Phone:", phone);

// Nested destructuring
const {
  address: { city, country },
} = person;
console.log("Location:", city, country);

// Function parameter destructuring
function printUser({ name, age, email = "No email" }) {
  console.log(`User: ${name}, Age: ${age}, Email: ${email}`);
}

printUser(person);
printUser({ name: "Bob", age: 25 });

// Array of objects destructuring
const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "moderator" },
];

const [{ name: firstUserName }, { role: secondUserRole }] = users;
console.log("First user:", firstUserName, "Second user role:", secondUserRole);

// Rest with destructuring
const numbers = [1, 2, 3, 4, 5];
const [firstNum, secondNum, ...restNums] = numbers;
console.log("First:", firstNum, "Second:", secondNum, "Rest:", restNums);

const { name: fullName, ...otherProps } = person;
console.log("Full name:", fullName, "Other props:", otherProps);

// Destructuring in loops
const employees = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Marketing" },
  { name: "Charlie", department: "Sales" },
];

for (const { name, department } of employees) {
  console.log(`${name} works in ${department}`);
}
