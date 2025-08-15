"use strict";

console.log("=== Array flatMap Challenge ===");

// CHALLENGE 1: flatMap vs map + flat
// Understanding the performance and behavior differences

const nestedData = [
  [1, 2],
  [3, 4],
  [5, 6],
];

console.time("1a - map + flat");
const mapThenFlat = nestedData.map((arr) => arr.map((x) => x * 2)).flat();
console.timeEnd("1a - map + flat");

console.time("1b - flatMap");
const flatMapped = nestedData.flatMap((arr) => arr.map((x) => x * 2));
console.timeEnd("1b - flatMap");

console.log(
  "Results equal:",
  JSON.stringify(mapThenFlat) === JSON.stringify(flatMapped)
);

// CHALLENGE 2: flatMap with different return types
// What happens when callbacks return different types?

const mixedReturns = [1, 2, 3, 4, 5];

const differentReturns = mixedReturns.flatMap((num, index) => {
  if (index === 0) return num; // Single value
  if (index === 1) return [num, num]; // Array
  if (index === 2) return []; // Empty array
  if (index === 3) return [num, [num]]; // Nested array
  return [[num, num]]; // Double nested
});

console.log("2a - Different return types:", differentReturns);

// CHALLENGE 3: flatMap for conditional flattening
// Using flatMap to conditionally include elements

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Include only even numbers, doubled
const evenDoubled = numbers.flatMap((num) => (num % 2 === 0 ? [num * 2] : []));

console.log("3a - Even numbers doubled:", evenDoubled);

// Include number and its square for multiples of 3
const multiplesOf3Extended = numbers.flatMap((num) =>
  num % 3 === 0 ? [num, num * num] : [num]
);

console.log("3b - Multiples of 3 extended:", multiplesOf3Extended);

// CHALLENGE 4: Deep flattening with flatMap
// Flattening multiple levels

const deeplyNested = [
  [1, [2, 3]],
  [4, [5, [6, 7]]],
  [8, [9, 10]],
];

// One level flattening
const oneLevel = deeplyNested.flatMap((arr) => arr);
console.log("4a - One level:", oneLevel);

// Custom deep flatten with flatMap
function deepFlattenWithFlatMap(arr) {
  return arr.flatMap((item) =>
    Array.isArray(item) ? deepFlattenWithFlatMap(item) : [item]
  );
}

console.log("4b - Deep flattened:", deepFlattenWithFlatMap(deeplyNested));

// CHALLENGE 5: flatMap with async operations (common pitfall)
// Why flatMap doesn't work well with async

async function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([`data-${id}-1`, `data-${id}-2`]), 50);
  });
}

const ids = [1, 2, 3];

// WRONG: This returns promises
const wrongAsync = ids.flatMap(async (id) => await fetchData(id));
console.log("5a - Wrong async (promises):", wrongAsync);

// CORRECT: Use Promise.all + flatMap
Promise.all(ids.map((id) => fetchData(id))).then((results) => {
  const flattened = results.flatMap((data) => data);
  console.log("5b - Correct async:", flattened);
});

// CHALLENGE 6: String processing with flatMap
// Text processing scenarios

const sentences = [
  "Hello world",
  "JavaScript is awesome",
  "Array methods are powerful",
];

// Split into words and flatten
const allWords = sentences.flatMap((sentence) => sentence.split(" "));
console.log("6a - All words:", allWords);

// Extract words starting with specific letters
const wordsStartingWithA = sentences.flatMap((sentence) =>
  sentence.split(" ").filter((word) => word.toLowerCase().startsWith("a"))
);
console.log("6b - Words starting with 'a':", wordsStartingWithA);

// Create character frequency map
const allChars = sentences.flatMap((sentence) =>
  sentence
    .toLowerCase()
    .split("")
    .filter((char) => char !== " ")
);

const charFrequency = allChars.reduce((freq, char) => {
  freq[char] = (freq[char] || 0) + 1;
  return freq;
}, {});

console.log("6c - Character frequency:", charFrequency);

// CHALLENGE 7: Object property extraction with flatMap
// Working with complex object structures

const users = [
  {
    id: 1,
    name: "Alice",
    posts: [
      { title: "Post 1", tags: ["js", "react"] },
      { title: "Post 2", tags: ["node", "express"] },
    ],
  },
  {
    id: 2,
    name: "Bob",
    posts: [{ title: "Post 3", tags: ["python", "django"] }],
  },
  {
    id: 3,
    name: "Charlie",
    posts: [], // No posts
  },
];

// Extract all post titles
const allTitles = users.flatMap((user) => user.posts.map((post) => post.title));
console.log("7a - All post titles:", allTitles);

// Extract all unique tags
const allTags = users.flatMap((user) =>
  user.posts.flatMap((post) => post.tags)
);
const uniqueTags = [...new Set(allTags)];
console.log("7b - All unique tags:", uniqueTags);

// Create user-tag relationships
const userTags = users.flatMap((user) =>
  user.posts.flatMap((post) =>
    post.tags.map((tag) => ({ user: user.name, tag }))
  )
);
console.log("7c - User-tag relationships:", userTags);

// CHALLENGE 8: Mathematical operations with flatMap
// Number sequence generation

function generateSequence(start, count) {
  return Array.from({ length: count }, (_, i) => start + i);
}

const ranges = [
  { start: 1, count: 3 },
  { start: 10, count: 2 },
  { start: 100, count: 4 },
];

const allNumbers = ranges.flatMap((range) =>
  generateSequence(range.start, range.count)
);
console.log("8a - Generated sequences:", allNumbers);

// Matrix operations
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Get all elements
const allElements = matrix.flatMap((row) => row);
console.log("8b - Matrix elements:", allElements);

// Get diagonal elements
const diagonalElements = matrix.flatMap((row, i) =>
  row.filter((_, j) => i === j)
);
console.log("8c - Diagonal elements:", diagonalElements);

// CHALLENGE 9: Error handling and filtering with flatMap
// Robust data processing

const riskyData = [
  { type: "number", value: 42 },
  { type: "array", value: [1, 2, 3] },
  { type: "string", value: "hello" },
  { type: "object", value: { nested: true } },
  null,
  undefined,
  { type: "number", value: "not a number" },
];

const processedData = riskyData.flatMap((item, index) => {
  try {
    if (!item || !item.type) {
      console.log(`Skipping invalid item at index ${index}`);
      return [];
    }

    switch (item.type) {
      case "number":
        const num = Number(item.value);
        if (isNaN(num)) {
          throw new Error("Invalid number");
        }
        return [{ type: "processed_number", value: num * 2 }];

      case "array":
        if (!Array.isArray(item.value)) {
          throw new Error("Value is not an array");
        }
        return item.value.map((v) => ({ type: "array_element", value: v }));

      case "string":
        return [{ type: "processed_string", value: item.value.toUpperCase() }];

      default:
        return [{ type: "unknown", value: "processed" }];
    }
  } catch (error) {
    console.log(`Error processing item at index ${index}:`, error.message);
    return [];
  }
});

console.log("9a - Processed data:", processedData);

// CHALLENGE 10: Performance comparison
// When flatMap might be slower than alternatives

const largeNestedArray = Array.from({ length: 1000 }, (_, i) =>
  Array.from({ length: 10 }, (_, j) => i * 10 + j)
);

console.time("10a - flatMap large array");
const flatMapResult = largeNestedArray.flatMap((arr) => arr.map((x) => x * 2));
console.timeEnd("10a - flatMap large array");

console.time("10b - for loops large array");
const forLoopResult = [];
for (let i = 0; i < largeNestedArray.length; i++) {
  for (let j = 0; j < largeNestedArray[i].length; j++) {
    forLoopResult.push(largeNestedArray[i][j] * 2);
  }
}
console.timeEnd("10b - for loops large array");

console.time("10c - concat + map large array");
const concatResult = [].concat(...largeNestedArray).map((x) => x * 2);
console.timeEnd("10c - concat + map large array");

console.log(
  "Results equal length:",
  flatMapResult.length === forLoopResult.length &&
    forLoopResult.length === concatResult.length
);

// CHALLENGE 11: Custom flatMap implementation
// Understanding flatMap by implementing it

Array.prototype.customFlatMap = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      const mapped = callback.call(thisArg, this[i], i, this);

      if (Array.isArray(mapped)) {
        result.push(...mapped);
      } else {
        result.push(mapped);
      }
    }
  }

  return result;
};

const testArray = [1, 2, 3];
const customResult = testArray.customFlatMap((x) => [x, x * 2]);
const nativeResult = testArray.flatMap((x) => [x, x * 2]);

console.log("11a - Custom flatMap:", customResult);
console.log("11b - Native flatMap:", nativeResult);
console.log(
  "11c - Results equal:",
  JSON.stringify(customResult) === JSON.stringify(nativeResult)
);

// CHALLENGE 12: flatMap with generators
// Using generators with flatMap

function* numberGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const generatorRanges = [
  { start: 1, end: 3 },
  { start: 10, end: 12 },
  { start: 20, end: 22 },
];

const generatedNumbers = generatorRanges.flatMap((range) => [
  ...numberGenerator(range.start, range.end),
]);

console.log("12a - Generated numbers:", generatedNumbers);

// CHALLENGE 13: Real-world data transformation
// Complex CSV-like data processing

const csvData = [
  "name,age,hobbies",
  "Alice,30,reading;swimming",
  "Bob,25,gaming;cooking;hiking",
  "Charlie,35,painting",
];

const [header, ...rows] = csvData;
const headers = header.split(",");

const processedRecords = rows.flatMap((row, rowIndex) => {
  try {
    const values = row.split(",");
    const record = {};

    headers.forEach((header, index) => {
      record[header] = values[index];
    });

    // Handle hobbies specially - split and create separate entries
    if (record.hobbies) {
      const hobbies = record.hobbies.split(";");
      return hobbies.map((hobby) => ({
        name: record.name,
        age: parseInt(record.age),
        hobby: hobby.trim(),
      }));
    }

    return [{ ...record, hobby: null }];
  } catch (error) {
    console.log(`Error processing row ${rowIndex}:`, error.message);
    return [];
  }
});

console.log("13a - Processed CSV records:", processedRecords);

// CHALLENGE 14: Tree traversal with flatMap
// Flattening tree structures

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        { value: 4, children: [] },
        { value: 5, children: [] },
      ],
    },
    {
      value: 3,
      children: [{ value: 6, children: [] }],
    },
  ],
};

function flattenTree(node) {
  return [node.value, ...node.children.flatMap((child) => flattenTree(child))];
}

const flattenedValues = flattenTree(tree);
console.log("14a - Flattened tree values:", flattenedValues);

// Get all nodes with their depth
function flattenTreeWithDepth(node, depth = 0) {
  return [
    { value: node.value, depth },
    ...node.children.flatMap((child) => flattenTreeWithDepth(child, depth + 1)),
  ];
}

const nodesWithDepth = flattenTreeWithDepth(tree);
console.log("14b - Nodes with depth:", nodesWithDepth);

// CHALLENGE 15: Advanced flatMap utilities
// Building sophisticated flatMap utilities

class FlatMapUtils {
  // flatMap with depth control
  static flatMapToDepth(array, callback, depth = 1) {
    if (depth <= 0) {
      return array.map(callback);
    }

    return array.flatMap((item) => {
      const result = callback(item);
      if (Array.isArray(result) && depth > 1) {
        return this.flatMapToDepth(result, (x) => x, depth - 1);
      }
      return result;
    });
  }

  // flatMap with size limit
  static flatMapWithLimit(array, callback, maxItems = Infinity) {
    const result = [];

    for (let i = 0; i < array.length && result.length < maxItems; i++) {
      const mapped = callback(array[i], i, array);

      if (Array.isArray(mapped)) {
        for (const item of mapped) {
          if (result.length >= maxItems) break;
          result.push(item);
        }
      } else {
        if (result.length < maxItems) {
          result.push(mapped);
        }
      }
    }

    return result;
  }

  // flatMap with type filtering
  static flatMapTyped(array, callback, type) {
    return array.flatMap(callback).filter((item) => typeof item === type);
  }

  // flatMap with unique values
  static flatMapUnique(array, callback, keyFn = (x) => x) {
    const seen = new Set();

    return array.flatMap(callback).filter((item) => {
      const key = keyFn(item);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}

const testData = [[1, 2, [3, 4]], [5, [6, 7, [8, 9]]], [10]];

console.log(
  "15a - FlatMap to depth 2:",
  FlatMapUtils.flatMapToDepth(testData, (x) => x, 2)
);

console.log(
  "15b - FlatMap with limit 5:",
  FlatMapUtils.flatMapWithLimit([1, 2, 3, 4, 5], (x) => [x, x * 2], 5)
);

console.log(
  "15c - FlatMap typed numbers:",
  FlatMapUtils.flatMapTyped(
    [1, "2", 3, "4"],
    (x) => [x, x.toString()],
    "number"
  )
);

const duplicateData = [
  [1, 2, 1],
  [2, 3, 2],
  [3, 4, 3],
];

console.log(
  "15d - FlatMap unique:",
  FlatMapUtils.flatMapUnique(duplicateData, (x) => x)
);

console.log("\n=== Discussion Questions ===");
console.log("1. When should you use flatMap vs map().flat()?");
console.log(
  "2. How does flatMap handle different return types from callbacks?"
);
console.log(
  "3. What are the performance implications of flatMap vs nested loops?"
);
console.log("4. How can flatMap be used for conditional filtering?");
console.log(
  "5. What are common pitfalls when using flatMap with async operations?"
);
