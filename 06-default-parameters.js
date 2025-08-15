"use strict";

console.log("=== Default Parameters ===");

// Basic default parameters
function greet(name = "World", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log(greet()); // "Hello, World!"
console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob", "Hi")); // "Hi, Bob!"

// Default parameters with expressions
function createUser(name, id = Math.random(), timestamp = Date.now()) {
  return { name, id, timestamp };
}

console.log("User 1:", createUser("Alice"));
console.log("User 2:", createUser("Bob"));

// Default parameters with other parameters
function multiply(a, b = a) {
  return a * b;
}

console.log("Square of 5:", multiply(5)); // 25

// Function calls as defaults
function getDefaultRole() {
  console.log("Getting default role...");
  return "guest";
}

function createAccount(username, role = getDefaultRole()) {
  return { username, role };
}

console.log("Account 1:", createAccount("alice", "admin"));
console.log("Account 2:", createAccount("bob")); // Calls getDefaultRole()

// undefined vs null behavior
function testDefaults(value = "default") {
  return value;
}

console.log("undefined:", testDefaults(undefined)); // "default"
console.log("null:", testDefaults(null)); // null
console.log("empty string:", testDefaults("")); // ""
console.log("0:", testDefaults(0)); // 0
