"use strict";

console.log("=== Array filter ===");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Basic filtering
const evenNumbers = numbers.filter((num) => num % 2 === 0);
const oddNumbers = numbers.filter((num) => num % 2 !== 0);
const greaterThanFive = numbers.filter((num) => num > 5);

console.log("Original:", numbers);
console.log("Even numbers:", evenNumbers);
console.log("Odd numbers:", oddNumbers);
console.log("Greater than 5:", greaterThanFive);

// Filter with objects
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 17, active: false },
  { name: "Charlie", age: 30, active: true },
  { name: "Diana", age: 16, active: true },
  { name: "Eve", age: 35, active: false },
];

const activeUsers = users.filter((user) => user.active);
const adults = users.filter((user) => user.age >= 18);
const activeAdults = users.filter((user) => user.active && user.age >= 18);

console.log("Active users:", activeUsers);
console.log("Adults:", adults);
console.log("Active adults:", activeAdults);

// Using index parameter
const fruitsWithIndex = ["apple", "banana", "orange", "grape", "kiwi"];
const evenIndexFruits = fruitsWithIndex.filter(
  (fruit, index) => index % 2 === 0
);
console.log("Fruits at even indices:", evenIndexFruits);

// Filter with string methods
const words = ["hello", "world", "javascript", "filter", "array"];
const longWords = words.filter((word) => word.length > 5);
const wordsWithA = words.filter((word) => word.includes("a"));
const wordsStartingWithF = words.filter((word) => word.startsWith("f"));

console.log("Long words:", longWords);
console.log("Words with 'a':", wordsWithA);
console.log("Words starting with 'f':", wordsStartingWithF);

// Removing falsy values
const mixedArray = [1, 0, "hello", "", null, "world", undefined, false, true];
const truthyValues = mixedArray.filter(Boolean);
console.log("Mixed array:", mixedArray);
console.log("Truthy values:", truthyValues);

// Custom truthy filter
const truthyCustom = mixedArray.filter((item) => !!item);
console.log("Truthy custom:", truthyCustom);

// Filter with complex conditions
const products = [
  { name: "Phone", price: 800, category: "electronics", inStock: true },
  { name: "Laptop", price: 1200, category: "electronics", inStock: false },
  { name: "Book", price: 20, category: "books", inStock: true },
  { name: "Headphones", price: 150, category: "electronics", inStock: true },
  { name: "Notebook", price: 5, category: "books", inStock: false },
];

const affordableElectronics = products.filter(
  (product) =>
    product.category === "electronics" &&
    product.price < 1000 &&
    product.inStock
);

console.log("Affordable electronics in stock:", affordableElectronics);

// Filter unique values
const numbersWithDuplicates = [1, 2, 2, 3, 3, 3, 4, 4, 5];
const uniqueNumbers = numbersWithDuplicates.filter(
  (num, index, array) => array.indexOf(num) === index
);
console.log("Numbers with duplicates:", numbersWithDuplicates);
console.log("Unique numbers:", uniqueNumbers);

// Filter with external data
const allowedCategories = ["electronics", "books"];
const allowedProducts = products.filter((product) =>
  allowedCategories.includes(product.category)
);
console.log("Allowed products:", allowedProducts);

// Chaining filter with other methods
const result = numbers
  .filter((num) => num > 3) // [4, 5, 6, 7, 8, 9, 10]
  .filter((num) => num % 2 === 0) // [4, 6, 8, 10]
  .map((num) => num * 2); // [8, 12, 16, 20]

console.log("Chained operations result:", result);

// Filter with regular expressions
const emails = [
  "user@gmail.com",
  "admin@company.com",
  "invalid-email",
  "test@yahoo.com",
  "another@gmail.com",
];

const gmailEmails = emails.filter((email) => email.includes("@gmail.com"));
const validEmails = emails.filter((email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
);

console.log("Gmail emails:", gmailEmails);
console.log("Valid emails:", validEmails);

// Performance consideration
const largeArray = Array.from({ length: 1000000 }, (_, i) => i + 1);
console.time("Filter large array");
const filteredLarge = largeArray.filter((num) => num % 1000 === 0);
console.timeEnd("Filter large array");
console.log("Filtered large array length:", filteredLarge.length);
