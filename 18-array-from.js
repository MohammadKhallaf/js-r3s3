"use strict";

console.log("=== Array.from ===");

// Converting array-like objects
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const realArray = Array.from(arrayLike);
console.log("Array-like object:", arrayLike);
console.log("Converted to array:", realArray);

// Converting strings
const stringToArray = Array.from("Hello");
console.log("String to array:", stringToArray); // ["H", "e", "l", "l", "o"]

// Converting Sets
const uniqueNumbers = new Set([1, 2, 3, 3, 4, 4, 5]);
const arrayFromSet = Array.from(uniqueNumbers);
console.log("Set:", uniqueNumbers);
console.log("Array from Set:", arrayFromSet);

// Converting Maps
const map = new Map([
  ["name", "Alice"],
  ["age", 30],
  ["city", "Boston"],
]);
const arrayFromMap = Array.from(map);
console.log("Map:", map);
console.log("Array from Map:", arrayFromMap); // [["name", "Alice"], ["age", 30], ["city", "Boston"]]

// NodeList to Array (browser environment simulation)
function simulateNodeList() {
  const nodeList = {
    0: { tagName: "DIV", textContent: "First" },
    1: { tagName: "P", textContent: "Second" },
    2: { tagName: "SPAN", textContent: "Third" },
    length: 3,
  };
  return Array.from(nodeList);
}
console.log("Simulated NodeList to Array:", simulateNodeList());

// Array.from with mapping function (second parameter)
const numbersFromRange = Array.from({ length: 5 }, (_, index) => index + 1);
console.log("Numbers 1-5:", numbersFromRange); // [1, 2, 3, 4, 5]

const squares = Array.from({ length: 5 }, (_, index) => (index + 1) ** 2);
console.log("Squares 1-5:", squares); // [1, 4, 9, 16, 25]

// Creating arrays with specific values
const zeros = Array.from({ length: 3 }, () => 0);
const randomNumbers = Array.from({ length: 5 }, () => Math.random());
console.log("Zeros:", zeros);
console.log("Random numbers:", randomNumbers);

// String manipulation
const upperCaseLetters = Array.from("hello", (char) => char.toUpperCase());
console.log("Uppercase letters:", upperCaseLetters); // ["H", "E", "L", "L", "O"]

// Working with Unicode
const emoji = "👋🌍✨";
const emojiArray = Array.from(emoji);
console.log("Emoji string:", emoji);
console.log("Emoji array:", emojiArray); // ["👋", "🌍", "✨"]

// Compare with split (which doesn't handle Unicode properly)
const splitEmoji = emoji.split("");
console.log("Split emoji (incorrect):", splitEmoji);
console.log("Array.from emoji (correct):", emojiArray);

// Converting arguments object
function demonstrateArguments() {
  console.log("arguments object:", arguments);
  const argsArray = Array.from(arguments);
  console.log("arguments as array:", argsArray);

  // Now we can use array methods
  const doubledArgs = argsArray.map((arg) => arg * 2);
  console.log("doubled arguments:", doubledArgs);
}
demonstrateArguments(1, 2, 3, 4, 5);

// Creating a range function
function range(start, end, step = 1) {
  const length = Math.ceil((end - start) / step);
  return Array.from({ length }, (_, index) => start + index * step);
}

console.log("Range 0-10:", range(0, 10));
console.log("Range 1-20 step 2:", range(1, 20, 2));
console.log("Range 10-0 step -1:", range(10, 0, -1));

// Matrix creation
function createMatrix(rows, cols, defaultValue = 0) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => defaultValue)
  );
}

const matrix = createMatrix(3, 4, 1);
console.log("3x4 matrix:", matrix);

// Identity matrix
function createIdentityMatrix(size) {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => (row === col ? 1 : 0))
  );
}

const identityMatrix = createIdentityMatrix(4);
console.log("4x4 identity matrix:", identityMatrix);

// Alphabet generation
const alphabet = Array.from(
  { length: 26 },
  (_, i) => String.fromCharCode(65 + i) // ASCII A-Z
);
console.log("Alphabet:", alphabet);

// Converting iterables
const generator = function* () {
  yield 1;
  yield 2;
  yield 3;
};

const arrayFromGenerator = Array.from(generator());
console.log("Array from generator:", arrayFromGenerator);

// Third parameter: thisArg
const multiplier = {
  factor: 10,
  multiply(x) {
    return x * this.factor;
  },
};

const multipliedNumbers = Array.from(
  [1, 2, 3],
  multiplier.multiply,
  multiplier
);
console.log("Multiplied numbers:", multipliedNumbers); // [10, 20, 30]

// Practical examples
console.log("\nPractical Examples:");

// Remove duplicates from array
function removeDuplicates(array) {
  return Array.from(new Set(array));
}

const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
console.log("Remove duplicates:", removeDuplicates(duplicates));

// Create array of DOM elements (simulation)
function createElements(count, tagName) {
  return Array.from({ length: count }, (_, index) => ({
    tagName: tagName.toUpperCase(),
    id: `${tagName}-${index + 1}`,
    index: index,
  }));
}

const divElements = createElements(5, "div");
console.log("Created div elements:", divElements);

// Pagination helper
function createPagination(totalItems, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return Array.from({ length: totalPages }, (_, index) => ({
    page: index + 1,
    startItem: index * itemsPerPage + 1,
    endItem: Math.min((index + 1) * itemsPerPage, totalItems),
  }));
}

const pagination = createPagination(100, 10);
console.log("Pagination info:", pagination.slice(0, 3)); // Show first 3 pages

// Performance comparison
console.log("\nPerformance comparison:");
const largeArrayLike = { length: 10000 };

console.time("Array.from with mapping");
const fromWithMap = Array.from(largeArrayLike, (_, i) => i);
console.timeEnd("Array.from with mapping");

console.time("Traditional approach");
const traditional = [];
for (let i = 0; i < largeArrayLike.length; i++) {
  traditional.push(i);
}
console.timeEnd("Traditional approach");

console.log("Results equal:", fromWithMap.length === traditional.length);
