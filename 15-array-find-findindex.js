"use strict";

console.log("=== Array find & findIndex ===");

const numbers = [1, 3, 5, 8, 12, 15, 20];

// Basic find - returns first matching element
const firstEven = numbers.find((num) => num % 2 === 0);
const firstGreaterThanTen = numbers.find((num) => num > 10);
const notFound = numbers.find((num) => num > 100);

console.log("First even number:", firstEven); // 8
console.log("First > 10:", firstGreaterThanTen); // 12
console.log("Not found:", notFound); // undefined

// findIndex - returns index of first match
const firstEvenIndex = numbers.findIndex((num) => num % 2 === 0);
const firstGreaterThanTenIndex = numbers.findIndex((num) => num > 10);
const notFoundIndex = numbers.findIndex((num) => num > 100);

console.log("Index of first even:", firstEvenIndex); // 3
console.log("Index of first > 10:", firstGreaterThanTenIndex); // 4
console.log("Index when not found:", notFoundIndex); // -1

// Working with objects
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "moderator" },
  { id: 4, name: "Diana", role: "user" },
];

// Find by property
const admin = users.find((user) => user.role === "admin");
const userBob = users.find((user) => user.name === "Bob");
const userById = users.find((user) => user.id === 3);

console.log("Admin user:", admin);
console.log("User Bob:", userBob);
console.log("User by ID 3:", userById);

// Find index for objects
const adminIndex = users.findIndex((user) => user.role === "admin");
const bobIndex = users.findIndex((user) => user.name === "Bob");
const moderatorIndex = users.findIndex((user) => user.role === "moderator");

console.log("Admin index:", adminIndex);
console.log("Bob index:", bobIndex);
console.log("Moderator index:", moderatorIndex);

// Complex search conditions
const products = [
  { name: "Phone", price: 800, category: "electronics", rating: 4.5 },
  { name: "Laptop", price: 1200, category: "electronics", rating: 4.8 },
  { name: "Book", price: 20, category: "books", rating: 4.2 },
  { name: "Headphones", price: 150, category: "electronics", rating: 4.0 },
];

const expensiveElectronic = products.find(
  (product) => product.category === "electronics" && product.price > 1000
);

const highRatedAffordable = products.find(
  (product) => product.rating >= 4.5 && product.price < 500
);

console.log("Expensive electronic:", expensiveElectronic);
console.log("High rated affordable:", highRatedAffordable);

// Using with destructuring
const { name: foundProductName } =
  products.find((product) => product.rating > 4.7) || {};
console.log("High rated product name:", foundProductName);

// find vs filter comparison
console.log("\nfind vs filter:");

// find returns first match or undefined
const findResult = numbers.find((num) => num > 5);
console.log("find result:", findResult); // 8 (first match)

// filter returns array of all matches
const filterResult = numbers.filter((num) => num > 5);
console.log("filter result:", filterResult); // [8, 12, 15, 20]

// Practical examples
const inventory = [
  { sku: "ABC123", name: "Widget A", quantity: 0 },
  { sku: "DEF456", name: "Widget B", quantity: 5 },
  { sku: "GHI789", name: "Widget C", quantity: 12 },
  { sku: "JKL012", name: "Widget D", quantity: 0 },
];

// Find first available item
const availableItem = inventory.find((item) => item.quantity > 0);
console.log("First available item:", availableItem);

// Find item by SKU
function findBySku(sku) {
  return inventory.find((item) => item.sku === sku);
}

console.log("Item with SKU DEF456:", findBySku("DEF456"));
console.log("Item with SKU XYZ999:", findBySku("XYZ999"));

// Check if item exists and update
function updateQuantity(sku, newQuantity) {
  const index = inventory.findIndex((item) => item.sku === sku);
  if (index !== -1) {
    inventory[index].quantity = newQuantity;
    return inventory[index];
  }
  return null;
}

console.log("Updated item:", updateQuantity("ABC123", 10));
console.log("Inventory after update:", inventory);

// Early termination demonstration
console.log("\nEarly termination:");
const largeArray = Array.from({ length: 1000000 }, (_, i) => i + 1);

console.time("find in large array");
const foundInLarge = largeArray.find((num) => num === 5000);
console.timeEnd("find in large array");
console.log("Found:", foundInLarge);

// String search
const texts = [
  "Hello world",
  "JavaScript is awesome",
  "Array methods are powerful",
  "Find method is useful",
];

const textWithArray = texts.find((text) => text.includes("Array"));
const textIndex = texts.findIndex((text) => text.startsWith("Find"));

console.log("Text with 'Array':", textWithArray);
console.log("Index of text starting with 'Find':", textIndex);

// Edge cases
const emptyArray = [];
const findInEmpty = emptyArray.find((x) => x);
const findIndexInEmpty = emptyArray.findIndex((x) => x);

console.log("Find in empty array:", findInEmpty); // undefined
console.log("FindIndex in empty array:", findIndexInEmpty); // -1
