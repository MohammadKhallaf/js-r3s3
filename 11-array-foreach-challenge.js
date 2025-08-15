"use strict";

console.log("=== Array forEach Challenge ===");

// CHALLENGE 1: forEach vs other iteration methods
// When should you use forEach vs alternatives?

const numbers = [1, 2, 3, 4, 5];
let forEachSum = 0;
let forSum = 0;
let whileSum = 0;

// forEach approach
console.time("1a - forEach performance");
numbers.forEach((num) => {
  forEachSum += num;
});
console.timeEnd("1a - forEach performance");

// Traditional for loop
console.time("1b - for loop performance");
for (let i = 0; i < numbers.length; i++) {
  forSum += numbers[i];
}
console.timeEnd("1b - for loop performance");

// While loop
console.time("1c - while loop performance");
let i = 0;
while (i < numbers.length) {
  whileSum += numbers[i];
  i++;
}
console.timeEnd("1c - while loop performance");

console.log("All sums equal:", forEachSum === forSum && forSum === whileSum);

// CHALLENGE 2: forEach with async operations
// Common pitfalls with async operations in forEach

const urls = ["url1", "url2", "url3"];

async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), Math.random() * 100);
  });
}

// WRONG: This doesn't wait for async operations
console.log("2a - Wrong async approach:");
async function wrongAsyncForEach() {
  const results = [];

  urls.forEach(async (url) => {
    const data = await fetchData(url);
    results.push(data);
    console.log(`Processed: ${data}`);
  });

  console.log("Results immediately:", results.length); // Will be 0

  // Wait a bit to see the async operations complete
  setTimeout(() => {
    console.log("Results after delay:", results.length);
  }, 200);
}

wrongAsyncForEach();

// CORRECT: Use for...of for async operations
async function correctAsyncIteration() {
  const results = [];

  for (const url of urls) {
    const data = await fetchData(url);
    results.push(data);
    console.log(`Processed sequentially: ${data}`);
  }

  console.log("2b - Sequential results:", results.length);
}

setTimeout(() => correctAsyncIteration(), 300);

// CHALLENGE 3: forEach with different array types
// How forEach behaves with sparse arrays, array-like objects

const sparseArray = [1, , 3, , 5];
const denseArray = [1, undefined, 3, undefined, 5];
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };

console.log("3a - Sparse array forEach:");
sparseArray.forEach((value, index) => {
  console.log(`Index ${index}: ${value}`);
});

console.log("3b - Dense array forEach:");
denseArray.forEach((value, index) => {
  console.log(`Index ${index}: ${value}`);
});

console.log("3c - Array-like forEach (will fail):");
try {
  arrayLike.forEach((value, index) => {
    console.log(`Index ${index}: ${value}`);
  });
} catch (error) {
  console.log("Error:", error.message);
}

// Convert array-like to real array
console.log("3d - Converted array-like:");
Array.from(arrayLike).forEach((value, index) => {
  console.log(`Index ${index}: ${value}`);
});

// CHALLENGE 4: forEach with this binding
// Understanding thisArg parameter

const processor = {
  multiplier: 10,

  processWithoutThis: function (numbers) {
    const results = [];
    numbers.forEach(function (num) {
      // 'this' is undefined in strict mode
      console.log("4a - this is:", this);
      results.push(num * 2); // Can't use this.multiplier
    });
    return results;
  },

  processWithThis: function (numbers) {
    const results = [];
    numbers.forEach(function (num) {
      console.log("4b - this.multiplier:", this.multiplier);
      results.push(num * this.multiplier);
    }, this); // Pass 'this' as thisArg
    return results;
  },

  processWithArrow: function (numbers) {
    const results = [];
    numbers.forEach((num) => {
      console.log("4c - arrow this.multiplier:", this.multiplier);
      results.push(num * this.multiplier);
    });
    return results;
  },
};

const testNumbers = [1, 2, 3];
console.log("4a - Without this:", processor.processWithoutThis(testNumbers));
console.log("4b - With this binding:", processor.processWithThis(testNumbers));
console.log(
  "4c - With arrow function:",
  processor.processWithArrow(testNumbers)
);

// CHALLENGE 5: forEach return value and early termination
// Understanding limitations of forEach

const items = ["a", "b", "c", "d", "e"];

// forEach always returns undefined
const forEachResult = items.forEach((item) => item.toUpperCase());
console.log("5a - forEach return value:", forEachResult);

// Can't break out of forEach
console.log("5b - Trying to break forEach:");
try {
  items.forEach((item, index) => {
    console.log(`Processing: ${item}`);
    if (index === 2) {
      // break; // SyntaxError: Illegal break statement
      return; // This only skips current iteration
    }
    console.log(`Finished processing: ${item}`);
  });
} catch (error) {
  console.log("Error:", error.message);
}

// Alternative with some() for early termination
console.log("5c - Using some() for early termination:");
items.some((item, index) => {
  console.log(`Processing with some: ${item}`);
  if (index === 2) {
    console.log("Breaking out of some");
    return true; // Break out of some()
  }
  return false; // Continue iteration
});

// CHALLENGE 6: forEach with nested arrays
// Complex nested iteration patterns

const nestedArrays = [[1, 2, [3, 4]], [5, [6, 7, [8, 9]]], [10]];

function flattenWithForEach(arr, result = []) {
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      flattenWithForEach(item, result);
    } else {
      result.push(item);
    }
  });
  return result;
}

console.log("6a - Flattened with forEach:", flattenWithForEach(nestedArrays));

// CHALLENGE 7: forEach with object arrays and property access
// Working with complex object structures

const users = [
  { id: 1, name: "Alice", posts: [{ title: "Post 1" }, { title: "Post 2" }] },
  { id: 2, name: "Bob", posts: [{ title: "Post 3" }] },
  { id: 3, name: "Charlie", posts: [] },
];

const allPosts = [];
const userSummary = {};

users.forEach((user) => {
  // Build user summary
  userSummary[user.id] = {
    name: user.name,
    postCount: user.posts.length,
  };

  // Collect all posts
  user.posts.forEach((post) => {
    allPosts.push({
      ...post,
      authorId: user.id,
      authorName: user.name,
    });
  });
});

console.log("7a - User summary:", userSummary);
console.log("7b - All posts:", allPosts);

// CHALLENGE 8: forEach with Set and Map
// Using forEach with other iterable types

const uniqueNumbers = new Set([1, 2, 2, 3, 3, 4]);
const userMap = new Map([
  ["alice", { age: 30, role: "admin" }],
  ["bob", { age: 25, role: "user" }],
  ["charlie", { age: 35, role: "moderator" }],
]);

console.log("8a - Set forEach:");
uniqueNumbers.forEach((value, valueAgain, set) => {
  console.log(
    `Set value: ${value}, same value: ${valueAgain}, set size: ${set.size}`
  );
});

console.log("8b - Map forEach:");
userMap.forEach((value, key, map) => {
  console.log(
    `Map entry: ${key} -> ${JSON.stringify(value)}, map size: ${map.size}`
  );
});

// CHALLENGE 9: Performance considerations with forEach
// When forEach might be slower than alternatives

const largeArray = Array.from({ length: 100000 }, (_, i) => i);
let sum1 = 0,
  sum2 = 0,
  sum3 = 0;

console.time("9a - forEach large array");
largeArray.forEach((num) => {
  sum1 += num;
});
console.timeEnd("9a - forEach large array");

console.time("9b - for loop large array");
for (let i = 0; i < largeArray.length; i++) {
  sum2 += largeArray[i];
}
console.timeEnd("9b - for loop large array");

console.time("9c - for...of large array");
for (const num of largeArray) {
  sum3 += num;
}
console.timeEnd("9c - for...of large array");

console.log("All sums equal:", sum1 === sum2 && sum2 === sum3);

// CHALLENGE 10: forEach with mutations
// How forEach handles array mutations during iteration

const mutableArray = [1, 2, 3, 4, 5];

console.log("10a - Original array:", [...mutableArray]);

mutableArray.forEach((value, index, array) => {
  console.log(
    `Processing index ${index}, value ${value}, array length: ${array.length}`
  );

  if (index === 2) {
    array.push(6); // Add element during iteration
    console.log("Added element during iteration");
  }

  if (index === 1) {
    array[4] = 99; // Modify future element
    console.log("Modified future element");
  }
});

console.log("10b - Array after forEach:", mutableArray);

// CHALLENGE 11: Custom forEach implementation
// Understand forEach by implementing it

Array.prototype.customForEach = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const len = this.length;
  for (let i = 0; i < len; i++) {
    // Only call callback for existing elements (handle sparse arrays)
    if (i in this) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  return undefined;
};

const testArray = [1, , 3, 4];
console.log("11a - Custom forEach:");
testArray.customForEach((value, index) => {
  console.log(`Custom: index ${index}, value ${value}`);
});

// CHALLENGE 12: forEach with error handling
// Proper error handling patterns

const mixedData = [1, "2", null, undefined, {}, [], 3];

function safeProcess(value, index) {
  try {
    if (typeof value === "number") {
      return value * 2;
    } else if (typeof value === "string") {
      return parseInt(value) * 2;
    } else {
      throw new Error(`Cannot process ${typeof value} at index ${index}`);
    }
  } catch (error) {
    console.log(`Error processing index ${index}:`, error.message);
    return null;
  }
}

const results = [];
mixedData.forEach((value, index) => {
  const processed = safeProcess(value, index);
  if (processed !== null) {
    results.push(processed);
  }
});

console.log("12a - Safely processed results:", results);

// CHALLENGE 13: forEach vs functional alternatives
// When to choose forEach vs map/filter/reduce

const products = [
  { name: "Laptop", price: 1000, category: "electronics" },
  { name: "Book", price: 20, category: "education" },
  { name: "Phone", price: 800, category: "electronics" },
  { name: "Pen", price: 2, category: "education" },
];

// Using forEach (imperative style)
const electronicsForEach = [];
let totalPriceForEach = 0;

products.forEach((product) => {
  if (product.category === "electronics") {
    electronicsForEach.push(product.name);
    totalPriceForEach += product.price;
  }
});

console.log("13a - forEach approach:", {
  electronicsForEach,
  totalPriceForEach,
});

// Using functional methods (declarative style)
const electronicsFunctional = products
  .filter((product) => product.category === "electronics")
  .map((product) => product.name);

const totalPriceFunctional = products
  .filter((product) => product.category === "electronics")
  .reduce((total, product) => total + product.price, 0);

console.log("13b - Functional approach:", {
  electronicsFunctional,
  totalPriceFunctional,
});

// CHALLENGE 14: Real-world forEach scenarios
// Complex real-world use cases

class DataProcessor {
  constructor() {
    this.processed = 0;
    this.errors = [];
    this.results = new Map();
  }

  processDataBatch(dataArray) {
    dataArray.forEach((item, index) => {
      try {
        this.processItem(item, index);
        this.processed++;
      } catch (error) {
        this.errors.push({ index, error: error.message, item });
      }
    });

    return {
      processed: this.processed,
      errors: this.errors.length,
      results: this.results.size,
    };
  }

  processItem(item, index) {
    if (!item || typeof item !== "object") {
      throw new Error("Invalid item format");
    }

    const processed = {
      ...item,
      processedAt: new Date().toISOString(),
      index,
    };

    this.results.set(item.id || index, processed);
  }
}

const processor = new DataProcessor();
const sampleData = [
  { id: 1, name: "Valid Item 1", value: 100 },
  null,
  { id: 2, name: "Valid Item 2", value: 200 },
  "invalid",
  { id: 3, name: "Valid Item 3", value: 300 },
];

const summary = processor.processDataBatch(sampleData);
console.log("14a - Processing summary:", summary);

// CHALLENGE 15: Creating forEach utilities
// Build utilities that enhance forEach functionality

class ForEachUtils {
  // forEach with index filtering
  static forEachWhere(array, predicate, callback) {
    array.forEach((item, index, arr) => {
      if (predicate(item, index, arr)) {
        callback(item, index, arr);
      }
    });
  }

  // forEach with batching
  static forEachBatch(array, batchSize, callback) {
    for (let i = 0; i < array.length; i += batchSize) {
      const batch = array.slice(i, i + batchSize);
      callback(batch, Math.floor(i / batchSize));
    }
  }

  // forEach with progress tracking
  static forEachWithProgress(array, callback, progressCallback) {
    const total = array.length;
    array.forEach((item, index, arr) => {
      callback(item, index, arr);
      if (progressCallback) {
        progressCallback({
          current: index + 1,
          total,
          percentage: Math.round(((index + 1) / total) * 100),
        });
      }
    });
  }

  // Async forEach equivalent
  static async forEachAsync(array, asyncCallback) {
    for (let i = 0; i < array.length; i++) {
      await asyncCallback(array[i], i, array);
    }
  }
}

const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("15a - forEach where even:");
ForEachUtils.forEachWhere(
  testData,
  (num, index) => num % 2 === 0,
  (num, index) => console.log(`Even number at ${index}: ${num}`)
);

console.log("15b - forEach in batches:");
ForEachUtils.forEachBatch(testData, 3, (batch, batchIndex) => {
  console.log(`Batch ${batchIndex}:`, batch);
});

console.log("15c - forEach with progress:");
ForEachUtils.forEachWithProgress(
  testData,
  (num) => num * 2, // Process each number
  (progress) => {
    if (progress.current % 3 === 0) {
      console.log(
        `Progress: ${progress.percentage}% (${progress.current}/${progress.total})`
      );
    }
  }
);

console.log("\n=== Discussion Questions ===");
console.log("1. When should you use forEach vs map/filter/reduce?");
console.log("2. Why can't you break out of forEach early?");
console.log(
  "3. How does forEach handle sparse arrays differently than for loops?"
);
console.log(
  "4. What are the performance implications of forEach vs traditional loops?"
);
console.log("5. Why is forEach problematic with async operations?");
