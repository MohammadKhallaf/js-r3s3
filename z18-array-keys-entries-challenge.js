"use strict";

console.log("=== Array keys & entries Challenge ===");

// CHALLENGE 1: Sparse array behavior
// How keys() and entries() handle holes in arrays

const sparseArray = [1, , , 4, , 6];
const denseArray = [1, undefined, undefined, 4, undefined, 6];

console.log("1a - Sparse array:", sparseArray);
console.log("1b - Sparse array length:", sparseArray.length);

// keys() includes indices for holes
const sparseKeys = Array.from(sparseArray.keys());
const denseKeys = Array.from(denseArray.keys());

console.log("1c - Sparse keys:", sparseKeys);
console.log("1d - Dense keys:", denseKeys);

// entries() includes holes with undefined values
const sparseEntries = Array.from(sparseArray.entries());
const denseEntries = Array.from(denseArray.entries());

console.log("1e - Sparse entries:", sparseEntries);
console.log("1f - Dense entries:", denseEntries);

// Manual iteration comparison
console.log("1g - Manual sparse iteration:");
for (let i = 0; i < sparseArray.length; i++) {
  console.log(
    `  Index ${i}: ${sparseArray[i]} (has property: ${i in sparseArray})`
  );
}

// CHALLENGE 2: Iterator protocol understanding
// Working with iterators directly

const fruits = ["apple", "banana", "cherry"];

const keysIterator = fruits.keys();
const entriesIterator = fruits.entries();

console.log("2a - Keys iterator next():");
console.log("  First:", keysIterator.next());
console.log("  Second:", keysIterator.next());
console.log("  Third:", keysIterator.next());
console.log("  Fourth:", keysIterator.next()); // Should be done

console.log("2b - Entries iterator:");
let entryResult = entriesIterator.next();
while (!entryResult.done) {
  console.log(`  Entry:`, entryResult.value);
  entryResult = entriesIterator.next();
}

// Iterator reuse - each call creates new iterator
const freshKeysIterator = fruits.keys();
console.log("2c - Fresh iterator:", freshKeysIterator.next());

// CHALLENGE 3: Performance comparisons
// keys/entries vs traditional loops

const largeArray = Array.from({ length: 100000 }, (_, i) => `item-${i}`);

console.time("3a - for loop indices");
const forLoopIndices = [];
for (let i = 0; i < largeArray.length; i++) {
  forLoopIndices.push(i);
}
console.timeEnd("3a - for loop indices");

console.time("3b - Array.keys()");
const keysArray = Array.from(largeArray.keys());
console.timeEnd("3b - Array.keys()");

console.time("3c - for...of entries");
const forOfEntries = [];
for (const [index, value] of largeArray.entries()) {
  forOfEntries.push([index, value]);
}
console.timeEnd("3c - for...of entries");

console.time("3d - traditional indexed loop");
const traditionalEntries = [];
for (let i = 0; i < largeArray.length; i++) {
  traditionalEntries.push([i, largeArray[i]]);
}
console.timeEnd("3d - traditional indexed loop");

console.log(
  "Results equal:",
  forLoopIndices.length === keysArray.length &&
    forOfEntries.length === traditionalEntries.length
);

// CHALLENGE 4: Destructuring with entries
// Advanced destructuring patterns

const products = [
  { name: "Laptop", price: 1000, category: "electronics" },
  { name: "Book", price: 20, category: "education" },
  { name: "Coffee", price: 5, category: "food" },
];

// Destructure index and object properties
console.log("4a - Destructuring entries:");
for (const [index, { name, price, category }] of products.entries()) {
  console.log(`  ${index + 1}. ${name} ($${price}) - ${category}`);
}

// Skip certain indices
console.log("4b - Conditional processing:");
for (const [index, product] of products.entries()) {
  if (index % 2 === 0) {
    // Only even indices
    console.log(`  Even index ${index}: ${product.name}`);
  }
}

// Multiple destructuring levels
const nestedData = [
  { user: { name: "Alice", profile: { age: 30 } }, posts: [1, 2] },
  { user: { name: "Bob", profile: { age: 25 } }, posts: [3, 4, 5] },
];

for (const [
  index,
  {
    user: {
      name,
      profile: { age },
    },
    posts,
  },
] of nestedData.entries()) {
  console.log(`4c - User ${index}: ${name} (${age}) has ${posts.length} posts`);
}

// CHALLENGE 5: Creating lookup tables and mappings
// Practical applications of keys/entries

const colors = ["red", "green", "blue", "yellow", "purple"];

// Create index-to-value mapping
const colorMap = new Map(colors.entries());
console.log("5a - Color map:", Object.fromEntries(colorMap));

// Create value-to-index mapping
const colorIndexMap = new Map(
  Array.from(colors.entries(), ([index, color]) => [color, index])
);
console.log("5b - Color index map:", Object.fromEntries(colorIndexMap));

// Create grouped mappings
const words = ["apple", "apricot", "banana", "blueberry", "cherry"];
const groupedByFirstLetter = Array.from(words.entries()).reduce(
  (groups, [index, word]) => {
    const firstLetter = word[0];
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push({ index, word });
    return groups;
  },
  {}
);

console.log("5c - Grouped by first letter:", groupedByFirstLetter);

// CHALLENGE 6: Array modification during iteration
// What happens when array changes during iteration

const mutableArray = [1, 2, 3, 4, 5];
const keysIter = mutableArray.keys();
const entriesIter = mutableArray.entries();

console.log("6a - Before modification:");
console.log("  Next key:", keysIter.next());
console.log("  Next entry:", entriesIter.next());

// Modify array
mutableArray.push(6);
mutableArray[1] = "modified";

console.log("6b - After modification:");
console.log("  Array:", mutableArray);
console.log("  Next key:", keysIter.next());
console.log("  Next entry:", entriesIter.next());

// Create new iterators after modification
const newKeysIter = mutableArray.keys();
const newEntriesIter = mutableArray.entries();

console.log("6c - New iterators:");
console.log("  New keys:", Array.from(newKeysIter));
console.log("  New entries:", Array.from(newEntriesIter));

// CHALLENGE 7: Custom iterator implementations
// Understanding by implementing keys/entries

Array.prototype.customKeys = function* () {
  for (let i = 0; i < this.length; i++) {
    yield i;
  }
};

Array.prototype.customEntries = function* () {
  for (let i = 0; i < this.length; i++) {
    yield [i, this[i]];
  }
};

const testArray = ["a", "b", "c"];

console.log("7a - Custom keys:", Array.from(testArray.customKeys()));
console.log("7b - Native keys:", Array.from(testArray.keys()));
console.log("7c - Custom entries:", Array.from(testArray.customEntries()));
console.log("7d - Native entries:", Array.from(testArray.entries()));

// CHALLENGE 8: Working with typed arrays
// keys/entries with different array types

const int32Array = new Int32Array([10, 20, 30, 40]);
const float64Array = new Float64Array([1.1, 2.2, 3.3]);

console.log("8a - Int32Array keys:", Array.from(int32Array.keys()));
console.log("8b - Int32Array entries:", Array.from(int32Array.entries()));
console.log("8c - Float64Array keys:", Array.from(float64Array.keys()));
console.log("8d - Float64Array entries:", Array.from(float64Array.entries()));

// Compare with regular array
const regularArray = Array.from(int32Array);
console.log("8e - Regular array entries:", Array.from(regularArray.entries()));

// CHALLENGE 9: Filtering and mapping with indices
// Combining entries with other array methods

const numbers = [10, 15, 20, 25, 30, 35, 40];

// Filter with index information
const evenIndexValues = Array.from(numbers.entries())
  .filter(([index, value]) => index % 2 === 0)
  .map(([index, value]) => ({ index, value, doubled: value * 2 }));

console.log("9a - Even index values:", evenIndexValues);

// Find with index context
const firstLargeValue = Array.from(numbers.entries()).find(
  ([index, value]) => value > 25
);

console.log("9b - First large value:", firstLargeValue);

// Reduce with index tracking
const indexWeightedSum = Array.from(numbers.entries()).reduce(
  (sum, [index, value]) => sum + value * (index + 1),
  0
);

console.log("9c - Index weighted sum:", indexWeightedSum);

// CHALLENGE 10: Parallel iteration
// Iterating multiple arrays simultaneously

const names = ["Alice", "Bob", "Charlie"];
const ages = [30, 25, 35];
const cities = ["New York", "London", "Tokyo"];

// Combine multiple arrays using entries
const combinedData = Array.from(names.entries()).map(([index, name]) => ({
  index,
  name,
  age: ages[index],
  city: cities[index],
}));

console.log("10a - Combined data:", combinedData);

// Zip function using entries
function zip(...arrays) {
  const minLength = Math.min(...arrays.map((arr) => arr.length));
  return Array.from({ length: minLength }, (_, index) =>
    arrays.map((arr) => arr[index])
  );
}

const zipped = zip(names, ages, cities);
console.log("10b - Zipped arrays:", zipped);

// Using entries for validation across arrays
const validationResult = Array.from(names.entries()).every(
  ([index, name]) => name && ages[index] > 0 && cities[index]
);

console.log("10c - All data valid:", validationResult);

// CHALLENGE 11: Memory efficiency considerations
// When keys/entries might use more memory

function memoryTest() {
  const data = Array.from({ length: 10000 }, (_, i) => `item-${i}`);

  // Method 1: Using entries() - creates iterator
  console.time("11a - entries() iteration");
  let count1 = 0;
  for (const [index, value] of data.entries()) {
    if (index % 1000 === 0) count1++;
  }
  console.timeEnd("11a - entries() iteration");

  // Method 2: Traditional loop - no extra objects
  console.time("11b - traditional loop");
  let count2 = 0;
  for (let i = 0; i < data.length; i++) {
    if (i % 1000 === 0) count2++;
  }
  console.timeEnd("11b - traditional loop");

  // Method 3: forEach with index - function call overhead
  console.time("11c - forEach with index");
  let count3 = 0;
  data.forEach((value, index) => {
    if (index % 1000 === 0) count3++;
  });
  console.timeEnd("11c - forEach with index");

  console.log("Counts equal:", count1 === count2 && count2 === count3);
}

memoryTest();

// CHALLENGE 12: Real-world data processing
// Practical applications

const salesData = [
  { month: "Jan", sales: 1000, region: "North" },
  { month: "Feb", sales: 1200, region: "North" },
  { month: "Mar", sales: 800, region: "North" },
  { month: "Apr", sales: 1500, region: "South" },
  { month: "May", sales: 1800, region: "South" },
  { month: "Jun", sales: 1300, region: "South" },
];

// Add quarter information using index
const salesWithQuarter = Array.from(salesData.entries()).map(
  ([index, data]) => ({
    ...data,
    quarter: Math.floor(index / 3) + 1,
    monthIndex: index,
    isFirstMonth: index === 0,
    isLastMonth: index === salesData.length - 1,
  })
);

console.log("12a - Sales with quarter info:", salesWithQuarter);

// Calculate running totals using entries
const salesWithRunningTotal = Array.from(salesData.entries()).map(
  ([index, data]) => {
    const runningTotal = salesData
      .slice(0, index + 1)
      .reduce((sum, item) => sum + item.sales, 0);

    return {
      ...data,
      runningTotal,
      percentageOfTotal: Math.round(
        (runningTotal / salesData.reduce((sum, item) => sum + item.sales, 0)) *
          100
      ),
    };
  }
);

console.log("12b - Sales with running totals:", salesWithRunningTotal);

// CHALLENGE 13: Error handling and edge cases
// Robust iteration patterns

const problematicArrays = [
  [], // Empty array
  [undefined], // Single undefined
  [null, undefined, 0, false], // Falsy values
  new Array(3), // Sparse array from constructor
  ["a", , "c"], // Mixed sparse array
];

problematicArrays.forEach((arr, arrayIndex) => {
  console.log(
    `13${String.fromCharCode(97 + arrayIndex)} - Array ${arrayIndex}:`
  );
  console.log(`  Original:`, arr);
  console.log(`  Keys:`, Array.from(arr.keys()));
  console.log(`  Entries:`, Array.from(arr.entries()));

  // Safe iteration with validation
  const validEntries = Array.from(arr.entries()).filter(([index, value]) => {
    return index >= 0 && value !== undefined;
  });
  console.log(`  Valid entries:`, validEntries);
});

// CHALLENGE 14: Advanced patterns
// Complex iteration scenarios

class DataTable {
  constructor(data) {
    this.data = data;
    this.columns = data.length > 0 ? Object.keys(data[0]) : [];
  }

  // Get row data with metadata
  *rowsWithMetadata() {
    for (const [index, row] of this.data.entries()) {
      yield {
        index,
        row,
        isFirst: index === 0,
        isLast: index === this.data.length - 1,
        metadata: {
          rowNumber: index + 1,
          columnCount: this.columns.length,
          hasAllColumns: this.columns.every((col) => col in row),
        },
      };
    }
  }

  // Get cell data with coordinates
  *cellsWithCoordinates() {
    for (const [rowIndex, row] of this.data.entries()) {
      for (const [colIndex, column] of this.columns.entries()) {
        yield {
          row: rowIndex,
          col: colIndex,
          column,
          value: row[column],
          address: `${column}${rowIndex + 1}`, // Like Excel
        };
      }
    }
  }
}

const tableData = [
  { name: "Alice", age: 30, city: "New York" },
  { name: "Bob", age: 25, city: "London" },
  { name: "Charlie", age: 35, city: "Tokyo" },
];

const table = new DataTable(tableData);

console.log("14a - Rows with metadata:");
for (const rowData of table.rowsWithMetadata()) {
  console.log(
    `  Row ${rowData.metadata.rowNumber}: ${rowData.row.name} (first: ${rowData.isFirst}, last: ${rowData.isLast})`
  );
}

console.log("14b - First few cells:");
let cellCount = 0;
for (const cell of table.cellsWithCoordinates()) {
  if (cellCount++ < 6) {
    console.log(`  ${cell.address}: ${cell.value}`);
  } else {
    break;
  }
}

// CHALLENGE 15: Building utilities
// Creating helper functions for common patterns

class ArrayUtils {
  // Enumerate with custom start
  static enumerate(array, start = 0) {
    return Array.from(array.entries(), ([index, value]) => [
      index + start,
      value,
    ]);
  }

  // Reverse enumerate
  static reverseEnumerate(array) {
    return Array.from(array.entries(), ([index, value]) => [
      array.length - 1 - index,
      value,
    ]);
  }

  // Windows of elements with indices
  static windows(array, size) {
    const result = [];
    for (const [index, value] of array.entries()) {
      if (index + size <= array.length) {
        const window = array.slice(index, index + size);
        const indices = Array.from({ length: size }, (_, i) => index + i);
        result.push({ startIndex: index, indices, values: window });
      }
    }
    return result;
  }

  // Find duplicates with positions
  static findDuplicatesWithPositions(array) {
    const seen = new Map();

    for (const [index, value] of array.entries()) {
      const key = JSON.stringify(value);
      if (!seen.has(key)) {
        seen.set(key, []);
      }
      seen.get(key).push(index);
    }

    return Array.from(seen.entries())
      .filter(([key, positions]) => positions.length > 1)
      .map(([key, positions]) => ({ value: JSON.parse(key), positions }));
  }

  // Batch processing with indices
  static processBatches(array, batchSize, processor) {
    const results = [];

    for (let i = 0; i < array.length; i += batchSize) {
      const batch = array.slice(i, i + batchSize);
      const batchIndices = Array.from(
        { length: batch.length },
        (_, j) => i + j
      );
      const result = processor(batch, batchIndices, Math.floor(i / batchSize));
      results.push(result);
    }

    return results;
  }
}

const testData = [1, 2, 3, 2, 4, 5, 1];

console.log("15a - Enumerate from 1:", ArrayUtils.enumerate(testData, 1));
console.log("15b - Reverse enumerate:", ArrayUtils.reverseEnumerate(testData));
console.log("15c - Windows of size 3:", ArrayUtils.windows(testData, 3));
console.log(
  "15d - Duplicates with positions:",
  ArrayUtils.findDuplicatesWithPositions(testData)
);

const batchResults = ArrayUtils.processBatches(
  testData,
  3,
  (batch, indices, batchNum) => ({
    batchNumber: batchNum,
    indices,
    sum: batch.reduce((a, b) => a + b, 0),
    average: batch.reduce((a, b) => a + b, 0) / batch.length,
  })
);

console.log("15e - Batch processing results:", batchResults);

console.log("\n=== Discussion Questions ===");
console.log(
  "1. When are keys() and entries() more useful than traditional loops?"
);
console.log("2. How do these methods handle sparse arrays differently?");
console.log(
  "3. What are the performance trade-offs of using entries() vs forEach?"
);
console.log("4. How do keys() and entries() work with array-like objects?");
console.log(
  "5. What are practical applications for the index information in entries()?"
);
