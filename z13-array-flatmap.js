"use strict";

console.log("=== Array flatMap ===");

// flatMap = map + flat (depth 1)
const numbers = [1, 2, 3, 4];

// Regular map with arrays
const mapped = numbers.map((num) => [num, num * 2]);
console.log("Mapped:", mapped); // [[1, 2], [2, 4], [3, 6], [4, 8]]

// flatMap flattens one level
const flatMapped = numbers.flatMap((num) => [num, num * 2]);
console.log("FlatMapped:", flatMapped); // [1, 2, 2, 4, 3, 6, 4, 8]

// Comparison: map + flat vs flatMap
const mapThenFlat = numbers.map((num) => [num, num * 2]).flat();
const flatMapDirect = numbers.flatMap((num) => [num, num * 2]);

console.log("map().flat():", mapThenFlat);
console.log("flatMap():", flatMapDirect);
console.log(
  "Same result:",
  JSON.stringify(mapThenFlat) === JSON.stringify(flatMapDirect)
);

// Practical example: splitting sentences into words
const sentences = ["Hello world", "JavaScript is awesome", "FlatMap is useful"];

const allWords = sentences.flatMap((sentence) => sentence.split(" "));
console.log("All words:", allWords);

// Without flatMap
const wordsWithMap = sentences.map((sentence) => sentence.split(" ")).flat();
console.log("Words with map+flat:", wordsWithMap);

// Filtering and mapping in one step
const users = [
  { name: "Alice", hobbies: ["reading", "swimming"] },
  { name: "Bob", hobbies: ["gaming", "cooking", "hiking"] },
  { name: "Charlie", hobbies: [] },
  { name: "Diana", hobbies: ["dancing", "painting"] },
];

// Get all hobbies from all users
const allHobbies = users.flatMap((user) => user.hobbies);
console.log("All hobbies:", allHobbies);

// Add user context to each hobby
const hobbiesWithUsers = users.flatMap((user) =>
  user.hobbies.map((hobby) => ({ user: user.name, hobby }))
);
console.log("Hobbies with users:", hobbiesWithUsers);

// Conditional flattening
const data = [1, 2, 3, 4, 5];

// Return multiple values for even numbers, single for odd
const conditionalFlat = data.flatMap((num) => {
  if (num % 2 === 0) {
    return [num, num * 10]; // Even: return array
  } else {
    return num; // Odd: return single value
  }
});
console.log("Conditional flat:", conditionalFlat);

// Removing items by returning empty arrays
const numbersWithFilter = [1, 2, 3, 4, 5, 6];
const evenNumbersDoubled = numbersWithFilter.flatMap((num) =>
  num % 2 === 0 ? [num * 2] : []
);
console.log("Even numbers doubled:", evenNumbersDoubled);

// Working with nested data
const categories = [
  {
    name: "Electronics",
    products: [
      { name: "Phone", price: 800 },
      { name: "Laptop", price: 1200 },
    ],
  },
  {
    name: "Books",
    products: [
      { name: "JavaScript Guide", price: 30 },
      { name: "React Handbook", price: 25 },
    ],
  },
  {
    name: "Clothing",
    products: [], // Empty category
  },
];

// Get all products with category info
const allProducts = categories.flatMap((category) =>
  category.products.map((product) => ({
    ...product,
    category: category.name,
  }))
);
console.log("All products:", allProducts);

// Multiple transformations
const ranges = [
  { start: 1, end: 3 },
  { start: 5, end: 7 },
  { start: 10, end: 11 },
];

const expandedRanges = ranges.flatMap((range) => {
  const result = [];
  for (let i = range.start; i <= range.end; i++) {
    result.push(i);
  }
  return result;
});
console.log("Expanded ranges:", expandedRanges);

// Error handling in flatMap
const mixedData = ["1,2,3", "4,5", "invalid", "6,7,8"];

const parsedNumbers = mixedData.flatMap((str) => {
  try {
    return str
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
  } catch (error) {
    return []; // Return empty array for invalid data
  }
});
console.log("Parsed numbers:", parsedNumbers);
