"use strict";

console.log("=== Array.from Challenge ===");

// CHALLENGE 1: Array-like object conversion edge cases
// Understanding what qualifies as array-like

const arrayLikeObjects = [
  { 0: "a", 1: "b", 2: "c", length: 3 }, // Standard array-like
  { 0: "x", 1: "y", length: 2, extra: "ignored" }, // Extra properties
  { 1: "b", 2: "c", length: 3 }, // Missing index 0
  { 0: "a", 1: "b", 2: "c", length: 1 }, // Length shorter than indices
  { 0: "a", 1: "b", 2: "c", length: 5 }, // Length longer than indices
  { 0: "a", 1: "b", 2: "c" }, // No length property
  { length: 0 }, // Empty array-like
  { length: -1 }, // Negative length
  { length: "3", 0: "a", 1: "b", 2: "c" }, // String length
  { length: 3.5, 0: "a", 1: "b", 2: "c" }, // Float length
];

arrayLikeObjects.forEach((obj, index) => {
  try {
    const result = Array.from(obj);
    console.log(
      `1${String.fromCharCode(97 + index)} - Object ${index}:`,
      result
    );
  } catch (error) {
    console.log(
      `1${String.fromCharCode(97 + index)} - Object ${index} error:`,
      error.message
    );
  }
});

// CHALLENGE 2: String conversion complexities
// Unicode, emoji, and special characters

const testStrings = [
  "Hello", // ASCII
  "Héllo", // Accented characters
  "👋🌍✨", // Emoji
  "𝔘𝔫𝔦𝔠𝔬𝔡𝔢", // Mathematical symbols
  "🏳️‍🌈🏳️‍⚧️", // Complex emoji sequences
  "", // Empty string
  " ", // Space
  "a\nb\tc", // With whitespace
  "🇺🇸🇬🇧🇫🇷", // Flag sequences
];

testStrings.forEach((str, index) => {
  const fromArray = Array.from(str);
  const splitArray = str.split("");
  const spreadArray = [...str];

  console.log(`2${String.fromCharCode(97 + index)} - "${str}":`);
  console.log(
    `  Array.from: [${fromArray.join(", ")}] (length: ${fromArray.length})`
  );
  console.log(
    `  split(''): [${splitArray.join(", ")}] (length: ${splitArray.length})`
  );
  console.log(
    `  spread: [${spreadArray.join(", ")}] (length: ${spreadArray.length})`
  );
  console.log(
    `  Equal: ${JSON.stringify(fromArray) === JSON.stringify(spreadArray)}`
  );
});

// CHALLENGE 3: Map and Set conversion with transformation
// Converting collections with mapping functions

const originalSet = new Set([1, 2, 3, 4, 5]);
const originalMap = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

// Convert Set with transformation
const doubledFromSet = Array.from(originalSet, (x) => x * 2);
const squaredFromSet = Array.from(originalSet, (x, index) => ({
  value: x ** 2,
  index,
}));

console.log("3a - Original Set:", [...originalSet]);
console.log("3b - Doubled from Set:", doubledFromSet);
console.log("3c - Squared with index:", squaredFromSet);

// Convert Map entries
const mapEntries = Array.from(originalMap, ([key, value]) => `${key}:${value}`);
const mapKeys = Array.from(originalMap.keys());
const mapValues = Array.from(originalMap.values(), (value) => value * 10);

console.log("3d - Map as strings:", mapEntries);
console.log("3e - Map keys:", mapKeys);
console.log("3f - Map values (x10):", mapValues);

// CHALLENGE 4: Generator function conversion
// Working with generator iterators

function* numberGenerator(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}

function* fibonacciGenerator(limit) {
  let a = 0,
    b = 1;
  while (a <= limit) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* transformGenerator(array, transform) {
  for (const item of array) {
    yield transform(item);
  }
}

// Convert generators to arrays
const numbers = Array.from(numberGenerator(1, 10, 2));
const fibonacci = Array.from(fibonacciGenerator(100));
const transformed = Array.from(transformGenerator([1, 2, 3, 4], (x) => x ** 3));

console.log("4a - Number generator (1-10, step 2):", numbers);
console.log("4b - Fibonacci up to 100:", fibonacci);
console.log("4c - Cubed numbers:", transformed);

// CHALLENGE 5: Custom iterables
// Creating and converting custom iterable objects

class Range {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
  }

  *[Symbol.iterator]() {
    let current = this.start;
    while (current <= this.end) {
      yield current;
      current += this.step;
    }
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(data) {
    const node = { data, next: null };
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }
}

const range = new Range(5, 15, 3);
const rangeArray = Array.from(range);

const linkedList = new LinkedList();
[10, 20, 30, 40].forEach((num) => linkedList.add(num));
const listArray = Array.from(linkedList, (item, index) => ({
  value: item,
  position: index,
}));

console.log("5a - Range array:", rangeArray);
console.log("5b - Linked list array:", listArray);

// CHALLENGE 6: Performance comparisons
// Array.from vs alternatives

const largeSet = new Set(Array.from({ length: 10000 }, (_, i) => i));
const largeString = "x".repeat(10000);

console.time("6a - Array.from(Set)");
const fromSet = Array.from(largeSet);
console.timeEnd("6a - Array.from(Set)");

console.time("6b - Spread Set");
const spreadSet = [...largeSet];
console.timeEnd("6b - Spread Set");

console.time("6c - Array.from(string)");
const fromString = Array.from(largeString);
console.timeEnd("6c - Array.from(string)");

console.time("6d - Spread string");
const spreadString = [...largeString];
console.timeEnd("6d - Spread string");

console.time("6e - String.split('')");
const splitString = largeString.split("");
console.timeEnd("6e - String.split('')");

console.log(
  "Results equal:",
  fromSet.length === spreadSet.length &&
    fromString.length === spreadString.length &&
    spreadString.length === splitString.length
);

// CHALLENGE 7: Array creation patterns
// Different ways to create arrays with Array.from

// Create array of specific length with values
const zeros = Array.from({ length: 5 }, () => 0);
const ones = Array.from({ length: 5 }, () => 1);
const indices = Array.from({ length: 5 }, (_, i) => i);
const evenNumbers = Array.from({ length: 10 }, (_, i) => i * 2);
const randomNumbers = Array.from({ length: 5 }, () => Math.random());

console.log("7a - Zeros:", zeros);
console.log("7b - Ones:", ones);
console.log("7c - Indices:", indices);
console.log("7d - Even numbers:", evenNumbers);
console.log(
  "7e - Random numbers:",
  randomNumbers.map((n) => Math.round(n * 100) / 100)
);

// Create 2D arrays
const matrix = Array.from({ length: 3 }, (_, row) =>
  Array.from({ length: 3 }, (_, col) => row * 3 + col + 1)
);

const identityMatrix = Array.from({ length: 4 }, (_, i) =>
  Array.from({ length: 4 }, (_, j) => (i === j ? 1 : 0))
);

console.log("7f - 3x3 matrix:", matrix);
console.log("7g - 4x4 identity matrix:", identityMatrix);

// CHALLENGE 8: Error handling and edge cases
// What happens when Array.from fails

const problematicInputs = [
  null,
  undefined,
  42,
  true,
  Symbol("test"),
  function () {},
  { notArrayLike: true },
  { length: NaN },
  { length: Infinity },
  { length: -Infinity },
];

problematicInputs.forEach((input, index) => {
  try {
    const result = Array.from(input);
    console.log(
      `8${String.fromCharCode(97 + index)} - Input ${typeof input}:`,
      result
    );
  } catch (error) {
    console.log(
      `8${String.fromCharCode(97 + index)} - Input ${typeof input} error:`,
      error.message
    );
  }
});

// CHALLENGE 9: Complex mapping functions
// Advanced transformation scenarios

const users = [
  { id: 1, name: "Alice", scores: [85, 92, 78] },
  { id: 2, name: "Bob", scores: [90, 87, 95] },
  { id: 3, name: "Charlie", scores: [78, 85, 88] },
];

// Create array with complex transformations
const userSummaries = Array.from(users, (user, index) => ({
  position: index + 1,
  id: user.id,
  name: user.name,
  averageScore:
    user.scores.reduce((sum, score) => sum + score, 0) / user.scores.length,
  highestScore: Math.max(...user.scores),
  grade: (() => {
    const avg =
      user.scores.reduce((sum, score) => sum + score, 0) / user.scores.length;
    if (avg >= 90) return "A";
    if (avg >= 80) return "B";
    if (avg >= 70) return "C";
    return "F";
  })(),
}));

console.log("9a - User summaries:", userSummaries);

// CHALLENGE 10: NodeList simulation and conversion
// Simulating DOM NodeList behavior

class MockNodeList {
  constructor(elements) {
    this.length = elements.length;
    elements.forEach((element, index) => {
      this[index] = element;
    });
  }

  // Make it iterable
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }

  // Add NodeList-like methods
  forEach(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  item(index) {
    return this[index] || null;
  }
}

const mockNodes = [
  { tagName: "DIV", textContent: "Hello" },
  { tagName: "P", textContent: "World" },
  { tagName: "SPAN", textContent: "Test" },
];

const nodeList = new MockNodeList(mockNodes);

// Convert NodeList to array with transformation
const nodeArray = Array.from(nodeList, (node, index) => ({
  index,
  tag: node.tagName.toLowerCase(),
  text: node.textContent,
  id: `element-${index}`,
}));

console.log("10a - Node array:", nodeArray);

// CHALLENGE 11: Async iteration challenges
// Array.from doesn't work with async iterables

async function* asyncGenerator() {
  for (let i = 1; i <= 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10));
    yield i * i;
  }
}

// This won't work - Array.from doesn't handle async iterators
try {
  const asyncResult = Array.from(asyncGenerator());
  console.log("11a - Async generator (wrong):", asyncResult);
} catch (error) {
  console.log("11a - Async generator error:", error.message);
}

// Correct way to handle async iterators
async function asyncIteratorToArray(asyncIterable) {
  const result = [];
  for await (const item of asyncIterable) {
    result.push(item);
  }
  return result;
}

asyncIteratorToArray(asyncGenerator()).then((result) => {
  console.log("11b - Async generator (correct):", result);
});

// CHALLENGE 12: Memory efficiency considerations
// When Array.from might be memory intensive

function createLargeIterable(size) {
  return {
    *[Symbol.iterator]() {
      for (let i = 0; i < size; i++) {
        yield { id: i, data: `Item ${i}`, timestamp: Date.now() };
      }
    },
  };
}

const largeIterable = createLargeIterable(10000);

console.time("12a - Convert large iterable");
const largeArray = Array.from(largeIterable, (item) => ({
  id: item.id,
  summary: `${item.data} at ${item.timestamp}`,
}));
console.timeEnd("12a - Convert large iterable");

console.log("12b - Large array length:", largeArray.length);
console.log("12c - Sample items:", largeArray.slice(0, 3));

// CHALLENGE 13: thisArg parameter usage
// Using the third parameter of Array.from

const processor = {
  multiplier: 10,
  prefix: "Result: ",

  process(value, index) {
    return `${this.prefix}${value * this.multiplier} (index: ${index})`;
  },
};

const inputNumbers = [1, 2, 3, 4, 5];

// Using thisArg to bind context
const processedWithThis = Array.from(
  inputNumbers,
  processor.process,
  processor
);

console.log("13a - Processed with this binding:", processedWithThis);

// Compare without thisArg (will fail)
try {
  const processedWithoutThis = Array.from(inputNumbers, processor.process);
  console.log("13b - Without this binding:", processedWithoutThis);
} catch (error) {
  console.log("13b - Error without this binding:", error.message);
}

// CHALLENGE 14: Polyfill implementation
// Understanding Array.from by implementing it

if (!Array.from) {
  Array.from = function (arrayLike, mapFn, thisArg) {
    if (arrayLike == null) {
      throw new TypeError(
        "Array.from requires an array-like object - not null or undefined"
      );
    }

    const items = Object(arrayLike);
    const len = parseInt(items.length) || 0;

    if (typeof mapFn !== "undefined" && typeof mapFn !== "function") {
      throw new TypeError(
        "Array.from: when provided, the second argument must be a function"
      );
    }

    const result = new Array(len);

    for (let i = 0; i < len; i++) {
      const value = items[i];
      if (mapFn) {
        result[i] =
          typeof thisArg !== "undefined"
            ? mapFn.call(thisArg, value, i)
            : mapFn(value, i);
      } else {
        result[i] = value;
      }
    }

    return result;
  };
}

// Test the polyfill
const polyfillTest = Array.from({ 0: "a", 1: "b", length: 2 }, (x) =>
  x.toUpperCase()
);
console.log("14a - Polyfill test:", polyfillTest);

// CHALLENGE 15: Real-world applications
// Practical uses of Array.from

class DataProcessor {
  constructor() {
    this.processed = 0;
  }

  // Convert CSV-like data
  processCSVRow(row, headers) {
    this.processed++;
    return Array.from(row, (value, index) => ({
      field: headers[index] || `field_${index}`,
      value: value?.toString().trim() || "",
      type: this.detectType(value),
    }));
  }

  detectType(value) {
    if (value === null || value === undefined) return "null";
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";
    if (typeof value === "string") {
      if (/^\d+$/.test(value)) return "numeric_string";
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return "date_string";
      if (value.includes("@")) return "email_string";
    }
    return "string";
  }

  // Create pagination data
  createPagination(totalItems, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return Array.from({ length: totalPages }, (_, index) => ({
      page: index + 1,
      startItem: index * itemsPerPage + 1,
      endItem: Math.min((index + 1) * itemsPerPage, totalItems),
      isFirst: index === 0,
      isLast: index === totalPages - 1,
    }));
  }

  // Generate test data
  generateTestData(count, generator) {
    return Array.from({ length: count }, (_, index) => generator(index, this));
  }
}

const processor = new DataProcessor();

// Test CSV processing
const csvHeaders = ["name", "age", "email", "active"];
const csvRow = ["John Doe", 30, "john@example.com", true];
const processedRow = processor.processCSVRow(csvRow, csvHeaders);

console.log("15a - Processed CSV row:", processedRow);

// Test pagination
const pagination = processor.createPagination(100, 10);
console.log("15b - Pagination (first 3 pages):", pagination.slice(0, 3));

// Test data generation
const testUsers = processor.generateTestData(5, (index, proc) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@test.com`,
  created: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
  processedBy: proc.constructor.name,
}));

console.log("15c - Generated test users:", testUsers);

// BONUS: Array.from vs other methods comparison
const comparisonMethods = {
  arrayFrom: (iterable) => Array.from(iterable),
  spread: (iterable) => [...iterable],
  forOf: (iterable) => {
    const result = [];
    for (const item of iterable) {
      result.push(item);
    }
    return result;
  },
  reduce: (iterable) => {
    return [...iterable].reduce((acc, item) => {
      acc.push(item);
      return acc;
    }, []);
  },
};

const testIterable = new Set([1, 2, 3, 4, 5]);

Object.entries(comparisonMethods).forEach(([method, fn]) => {
  console.time(`Comparison - ${method}`);
  const result = fn(testIterable);
  console.timeEnd(`Comparison - ${method}`);
  console.log(`${method} result length:`, result.length);
});

console.log("\n=== Discussion Questions ===");
console.log("1. When should you use Array.from vs spread operator?");
console.log("2. How does Array.from handle different types of iterables?");
console.log(
  "3. What are the performance implications of the mapping function?"
);
console.log(
  "4. How does Array.from compare to manual iteration for large datasets?"
);
console.log("5. What are common use cases for the thisArg parameter?");
