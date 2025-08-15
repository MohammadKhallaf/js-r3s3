"use strict";

console.log("=== Array reduce & reduceRight Challenge ===");

// CHALLENGE 1: Understanding accumulator patterns
// Different ways to use the accumulator

const numbers = [1, 2, 3, 4, 5];

// Traditional sum
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// Building an object accumulator
const numberInfo = numbers.reduce(
  (acc, curr, index) => {
    acc.sum += curr;
    acc.count += 1;
    acc.average = acc.sum / acc.count;
    acc.items.push({ value: curr, index });
    return acc;
  },
  { sum: 0, count: 0, average: 0, items: [] }
);

console.log("1a - Sum:", sum);
console.log("1b - Number info:", numberInfo);

// CHALLENGE 2: reduce without initial value - edge cases
// Understanding when initial value matters

const emptyArray = [];
const singleElement = [42];
const multipleElements = [1, 2, 3];

try {
  const emptySum = emptyArray.reduce((acc, curr) => acc + curr);
  console.log("2a - Empty array sum:", emptySum);
} catch (error) {
  console.log("2a - Empty array error:", error.message);
}

const singleSum = singleElement.reduce((acc, curr) => acc + curr);
console.log("2b - Single element sum:", singleSum);

const multipleSum = multipleElements.reduce((acc, curr) => acc + curr);
console.log("2c - Multiple elements sum:", multipleSum);

// With initial value, all work
const emptySumSafe = emptyArray.reduce((acc, curr) => acc + curr, 0);
const singleSumSafe = singleElement.reduce((acc, curr) => acc + curr, 0);

console.log("2d - Empty with initial:", emptySumSafe);
console.log("2e - Single with initial:", singleSumSafe);

// CHALLENGE 3: Complex object transformations
// Converting between data structures

const students = [
  { id: 1, name: "Alice", grade: 85, subject: "Math" },
  { id: 1, name: "Alice", grade: 92, subject: "Science" },
  { id: 2, name: "Bob", grade: 78, subject: "Math" },
  { id: 2, name: "Bob", grade: 88, subject: "Science" },
  { id: 3, name: "Charlie", grade: 95, subject: "Math" },
];

// Group by student ID
const groupedByStudent = students.reduce((acc, student) => {
  if (!acc[student.id]) {
    acc[student.id] = {
      name: student.name,
      grades: {},
    };
  }
  acc[student.id].grades[student.subject] = student.grade;
  return acc;
}, {});

console.log("3a - Grouped by student:", groupedByStudent);

// Calculate averages per student
const averageGrades = students.reduce((acc, student) => {
  if (!acc[student.id]) {
    acc[student.id] = {
      name: student.name,
      totalGrades: 0,
      subjectCount: 0,
      subjects: [],
    };
  }

  acc[student.id].totalGrades += student.grade;
  acc[student.id].subjectCount += 1;
  acc[student.id].subjects.push(student.subject);
  acc[student.id].average =
    acc[student.id].totalGrades / acc[student.id].subjectCount;

  return acc;
}, {});

console.log("3b - Average grades:", averageGrades);

// CHALLENGE 4: Flattening nested structures
// Different levels of flattening with reduce

const nestedArrays = [[1, 2], [3, [4, 5]], [6, [7, [8, 9]]], 10];

// Flatten one level
const flattenOne = nestedArrays.reduce((acc, curr) => {
  if (Array.isArray(curr)) {
    return acc.concat(curr);
  }
  return acc.concat([curr]);
}, []);

console.log("4a - Flatten one level:", flattenOne);

// Deep flatten
function deepFlatten(arr) {
  return arr.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      return acc.concat(deepFlatten(curr));
    }
    return acc.concat([curr]);
  }, []);
}

console.log("4b - Deep flatten:", deepFlatten(nestedArrays));

// CHALLENGE 5: reduceRight vs reduce differences
// Understanding order dependency

const operations = [
  { operation: "add", value: 5 },
  { operation: "multiply", value: 2 },
  { operation: "subtract", value: 3 },
];

function applyOperation(acc, op) {
  switch (op.operation) {
    case "add":
      return acc + op.value;
    case "multiply":
      return acc * op.value;
    case "subtract":
      return acc - op.value;
    default:
      return acc;
  }
}

const leftToRight = operations.reduce(applyOperation, 10);
const rightToLeft = operations.reduceRight(applyOperation, 10);

console.log("5a - Left to right (reduce):", leftToRight);
console.log("5b - Right to left (reduceRight):", rightToLeft);

// Function composition
const functions = [(x) => x + 1, (x) => x * 2, (x) => x - 3];

// Compose (right to left)
const compose = functions.reduceRight((acc, fn) => (value) => acc(fn(value)));
// Pipe (left to right)
const pipe = functions.reduce((acc, fn) => (value) => fn(acc(value)));

console.log("5c - Compose result:", compose(5)); // ((5 + 1) * 2) - 3 = 9
console.log("5d - Pipe result:", pipe(5)); // ((5 + 1) * 2) - 3 = 9

// CHALLENGE 6: Performance optimization with reduce
// When reduce might be slower than alternatives

const largeArray = Array.from({ length: 100000 }, (_, i) => i + 1);

console.time("6a - reduce sum");
const reduceSum = largeArray.reduce((sum, num) => sum + num, 0);
console.timeEnd("6a - reduce sum");

console.time("6b - for loop sum");
let forSum = 0;
for (let i = 0; i < largeArray.length; i++) {
  forSum += largeArray[i];
}
console.timeEnd("6b - for loop sum");

console.time("6c - while loop sum");
let whileSum = 0;
let index = 0;
while (index < largeArray.length) {
  whileSum += largeArray[index];
  index++;
}
console.timeEnd("6c - while loop sum");

console.log("All sums equal:", reduceSum === forSum && forSum === whileSum);

// CHALLENGE 7: Error handling in reduce
// Robust reduce operations

const riskyData = [1, "2", null, undefined, {}, [], 3, "invalid"];

function safeReduce(array, reducer, initialValue) {
  return array.reduce((acc, curr, index) => {
    try {
      return reducer(acc, curr, index);
    } catch (error) {
      console.log(`Reduce error at index ${index}:`, error.message);
      return acc; // Continue with current accumulator
    }
  }, initialValue);
}

const safeSum = safeReduce(
  riskyData,
  (acc, curr) => {
    const num = Number(curr);
    if (isNaN(num)) {
      throw new Error(`Cannot convert ${typeof curr} to number`);
    }
    return acc + num;
  },
  0
);

console.log("7a - Safe reduce sum:", safeSum);

// CHALLENGE 8: Async operations with reduce
// Sequential async processing

async function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, data: `Data for ${id}` });
    }, Math.random() * 100);
  });
}

const ids = [1, 2, 3, 4, 5];

// WRONG: This doesn't wait for each promise
async function wrongAsyncReduce() {
  const result = ids.reduce(async (acc, id) => {
    const current = await acc;
    const data = await fetchData(id);
    return [...current, data];
  }, Promise.resolve([]));

  return result;
}

// CORRECT: Sequential processing
async function correctAsyncReduce() {
  const result = await ids.reduce(async (accPromise, id) => {
    const acc = await accPromise;
    const data = await fetchData(id);
    return [...acc, data];
  }, Promise.resolve([]));

  return result;
}

console.log("8a - Starting async reduce tests...");
wrongAsyncReduce().then((result) => {
  console.log("8b - Wrong async reduce:", result.length);
});

correctAsyncReduce().then((result) => {
  console.log("8c - Correct async reduce:", result.length);
});

// CHALLENGE 9: Building complex data structures
// Creating maps, sets, and custom structures

const transactions = [
  { id: 1, userId: "alice", amount: 100, category: "food", date: "2023-01-01" },
  {
    id: 2,
    userId: "bob",
    amount: 50,
    category: "transport",
    date: "2023-01-01",
  },
  { id: 3, userId: "alice", amount: 75, category: "food", date: "2023-01-02" },
  {
    id: 4,
    userId: "charlie",
    amount: 200,
    category: "entertainment",
    date: "2023-01-02",
  },
  { id: 5, userId: "bob", amount: 30, category: "food", date: "2023-01-03" },
];

// Build a complex report structure
const transactionReport = transactions.reduce(
  (report, transaction) => {
    const { userId, amount, category, date } = transaction;

    // User totals
    if (!report.userTotals.has(userId)) {
      report.userTotals.set(userId, 0);
    }
    report.userTotals.set(userId, report.userTotals.get(userId) + amount);

    // Category totals
    if (!report.categoryTotals.has(category)) {
      report.categoryTotals.set(category, 0);
    }
    report.categoryTotals.set(
      category,
      report.categoryTotals.get(category) + amount
    );

    // Daily totals
    if (!report.dailyTotals.has(date)) {
      report.dailyTotals.set(date, 0);
    }
    report.dailyTotals.set(date, report.dailyTotals.get(date) + amount);

    // User-category breakdown
    const userCategoryKey = `${userId}-${category}`;
    if (!report.userCategoryTotals.has(userCategoryKey)) {
      report.userCategoryTotals.set(userCategoryKey, 0);
    }
    report.userCategoryTotals.set(
      userCategoryKey,
      report.userCategoryTotals.get(userCategoryKey) + amount
    );

    // Overall stats
    report.totalAmount += amount;
    report.transactionCount += 1;
    report.averageTransaction = report.totalAmount / report.transactionCount;

    return report;
  },
  {
    userTotals: new Map(),
    categoryTotals: new Map(),
    dailyTotals: new Map(),
    userCategoryTotals: new Map(),
    totalAmount: 0,
    transactionCount: 0,
    averageTransaction: 0,
  }
);

console.log(
  "9a - User totals:",
  Object.fromEntries(transactionReport.userTotals)
);
console.log(
  "9b - Category totals:",
  Object.fromEntries(transactionReport.categoryTotals)
);
console.log(
  "9c - Daily totals:",
  Object.fromEntries(transactionReport.dailyTotals)
);
console.log("9d - Overall stats:", {
  total: transactionReport.totalAmount,
  count: transactionReport.transactionCount,
  average: Math.round(transactionReport.averageTransaction),
});

// CHALLENGE 10: Custom reduce implementations
// Understanding reduce by implementing it

Array.prototype.customReduce = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  let hasInitialValue = arguments.length >= 2;
  let accumulator = hasInitialValue ? initialValue : undefined;
  let startIndex = hasInitialValue ? 0 : 1;

  if (!hasInitialValue && this.length === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  if (!hasInitialValue) {
    accumulator = this[0];
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};

const testArray = [1, 2, 3, 4, 5];
const customSum = testArray.customReduce((acc, curr) => acc + curr, 0);
const nativeSum = testArray.reduce((acc, curr) => acc + curr, 0);

console.log("10a - Custom reduce:", customSum);
console.log("10b - Native reduce:", nativeSum);
console.log("10c - Results equal:", customSum === nativeSum);

// CHALLENGE 11: Mathematical operations with reduce
// Complex mathematical computations

const points = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
  { x: 7, y: 8 },
];

// Calculate centroid
const centroid = points.reduce(
  (acc, point, index, array) => {
    acc.x += point.x / array.length;
    acc.y += point.y / array.length;
    return acc;
  },
  { x: 0, y: 0 }
);

console.log("11a - Centroid:", centroid);

// Calculate distances from origin
const distances = points.reduce((acc, point) => {
  const distance = Math.sqrt(point.x ** 2 + point.y ** 2);
  acc.push(distance);
  return acc;
}, []);

console.log(
  "11b - Distances:",
  distances.map((d) => Math.round(d * 100) / 100)
);

// Statistical calculations
const values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const statistics = values.reduce(
  (stats, value, index, array) => {
    // Running calculations
    stats.sum += value;
    stats.count = index + 1;
    stats.mean = stats.sum / stats.count;

    // For variance calculation
    stats.squaredDifferences += (value - stats.sum / stats.count) ** 2;

    // Min/Max
    stats.min = Math.min(stats.min, value);
    stats.max = Math.max(stats.max, value);

    // On last iteration, finalize calculations
    if (index === array.length - 1) {
      stats.variance = stats.squaredDifferences / stats.count;
      stats.standardDeviation = Math.sqrt(stats.variance);
    }

    return stats;
  },
  {
    sum: 0,
    count: 0,
    mean: 0,
    squaredDifferences: 0,
    variance: 0,
    standardDeviation: 0,
    min: Infinity,
    max: -Infinity,
  }
);

console.log("11c - Statistics:", {
  mean: Math.round(statistics.mean),
  variance: Math.round(statistics.variance),
  stdDev: Math.round(statistics.standardDeviation * 100) / 100,
  min: statistics.min,
  max: statistics.max,
});

// CHALLENGE 12: State machines with reduce
// Building finite state machines

const stateTransitions = [
  { event: "start", data: "initial" },
  { event: "load", data: "loading data" },
  { event: "success", data: "data loaded" },
  { event: "error", data: "load failed" },
  { event: "retry", data: "retrying" },
  { event: "success", data: "data loaded" },
];

const stateMachine = {
  idle: {
    start: "loading",
  },
  loading: {
    success: "success",
    error: "error",
  },
  success: {
    start: "loading",
  },
  error: {
    retry: "loading",
    start: "loading",
  },
};

const finalState = stateTransitions.reduce(
  (state, transition) => {
    const currentState = state.current;
    const nextState = stateMachine[currentState]?.[transition.event];

    if (nextState) {
      state.current = nextState;
      state.history.push({
        from: currentState,
        event: transition.event,
        to: nextState,
        data: transition.data,
        timestamp: Date.now(),
      });
    } else {
      console.log(
        `Invalid transition: ${transition.event} from ${currentState}`
      );
    }

    return state;
  },
  { current: "idle", history: [] }
);

console.log("12a - Final state:", finalState.current);
console.log(
  "12b - State history:",
  finalState.history.map((h) => `${h.from} --${h.event}--> ${h.to}`)
);

// CHALLENGE 13: Advanced reduce patterns
// Sophisticated data processing patterns

const logEntries = [
  {
    timestamp: "2023-01-01T10:00:00Z",
    level: "INFO",
    message: "Server started",
    user: "system",
  },
  {
    timestamp: "2023-01-01T10:01:00Z",
    level: "DEBUG",
    message: "User login",
    user: "alice",
  },
  {
    timestamp: "2023-01-01T10:02:00Z",
    level: "ERROR",
    message: "Database connection failed",
    user: "system",
  },
  {
    timestamp: "2023-01-01T10:03:00Z",
    level: "INFO",
    message: "User action",
    user: "alice",
  },
  {
    timestamp: "2023-01-01T10:04:00Z",
    level: "WARN",
    message: "High memory usage",
    user: "system",
  },
  {
    timestamp: "2023-01-01T10:05:00Z",
    level: "ERROR",
    message: "Request timeout",
    user: "bob",
  },
];

// Complex log analysis
const logAnalysis = logEntries.reduce(
  (analysis, entry) => {
    // Level counts
    analysis.levelCounts[entry.level] =
      (analysis.levelCounts[entry.level] || 0) + 1;

    // User activity
    if (!analysis.userActivity[entry.user]) {
      analysis.userActivity[entry.user] = { count: 0, levels: new Set() };
    }
    analysis.userActivity[entry.user].count++;
    analysis.userActivity[entry.user].levels.add(entry.level);

    // Error patterns
    if (entry.level === "ERROR") {
      analysis.errors.push({
        timestamp: entry.timestamp,
        message: entry.message,
        user: entry.user,
      });
    }

    // Time-based analysis
    const hour = new Date(entry.timestamp).getHours();
    analysis.hourlyActivity[hour] = (analysis.hourlyActivity[hour] || 0) + 1;

    // Message keywords
    const keywords = entry.message.toLowerCase().split(" ");
    keywords.forEach((keyword) => {
      if (keyword.length > 3) {
        // Ignore short words
        analysis.keywords[keyword] = (analysis.keywords[keyword] || 0) + 1;
      }
    });

    return analysis;
  },
  {
    levelCounts: {},
    userActivity: {},
    errors: [],
    hourlyActivity: {},
    keywords: {},
  }
);

// Convert Sets to Arrays for display
Object.values(logAnalysis.userActivity).forEach((activity) => {
  activity.levels = Array.from(activity.levels);
});

console.log("13a - Level counts:", logAnalysis.levelCounts);
console.log("13b - User activity:", logAnalysis.userActivity);
console.log("13c - Error count:", logAnalysis.errors.length);
console.log(
  "13d - Top keywords:",
  Object.entries(logAnalysis.keywords)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
);

// CHALLENGE 14: Memory-efficient reduce operations
// Handling large datasets efficiently

function createLargeDataset(size) {
  return Array.from({ length: size }, (_, i) => ({
    id: i,
    value: Math.random() * 1000,
    category: Math.floor(Math.random() * 10),
    timestamp: Date.now() + i * 1000,
  }));
}

const largeDataset = createLargeDataset(10000);

// Memory-efficient aggregation
console.time("14a - Memory efficient reduce");
const aggregation = largeDataset.reduce(
  (acc, item) => {
    // Category stats
    if (!acc.categoryStats[item.category]) {
      acc.categoryStats[item.category] = {
        count: 0,
        sum: 0,
        min: Infinity,
        max: -Infinity,
      };
    }

    const stats = acc.categoryStats[item.category];
    stats.count++;
    stats.sum += item.value;
    stats.min = Math.min(stats.min, item.value);
    stats.max = Math.max(stats.max, item.value);
    stats.average = stats.sum / stats.count;

    // Overall stats
    acc.overallStats.count++;
    acc.overallStats.sum += item.value;
    acc.overallStats.average = acc.overallStats.sum / acc.overallStats.count;

    return acc;
  },
  {
    categoryStats: {},
    overallStats: { count: 0, sum: 0, average: 0 },
  }
);
console.timeEnd("14a - Memory efficient reduce");

console.log(
  "14b - Category count:",
  Object.keys(aggregation.categoryStats).length
);
console.log(
  "14c - Overall average:",
  Math.round(aggregation.overallStats.average)
);

// CHALLENGE 15: Reduce utility library
// Building a comprehensive reduce utility

class ReduceUtils {
  // Reduce with early termination
  static reduceUntil(array, callback, predicate, initialValue) {
    let accumulator = initialValue;

    for (let i = 0; i < array.length; i++) {
      accumulator = callback(accumulator, array[i], i, array);
      if (predicate(accumulator, array[i], i)) {
        break;
      }
    }

    return accumulator;
  }

  // Reduce with batching
  static reduceBatched(array, callback, batchSize, initialValue) {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }

    return batches.reduce((acc, batch) => {
      return batch.reduce(callback, acc);
    }, initialValue);
  }

  // Parallel reduce simulation
  static async reduceParallel(array, callback, combiner, initialValue) {
    const chunkSize = Math.ceil(array.length / 4);
    const chunks = [];

    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }

    const chunkResults = await Promise.all(
      chunks.map((chunk) =>
        Promise.resolve(chunk.reduce(callback, initialValue))
      )
    );

    return chunkResults.reduce(combiner, initialValue);
  }

  // Reduce with progress tracking
  static reduceWithProgress(array, callback, initialValue, progressCallback) {
    return array.reduce((acc, curr, index) => {
      const result = callback(acc, curr, index, array);

      if (progressCallback && index % Math.ceil(array.length / 10) === 0) {
        progressCallback({
          current: index + 1,
          total: array.length,
          percentage: Math.round(((index + 1) / array.length) * 100),
        });
      }

      return result;
    }, initialValue);
  }
}

const testData = Array.from({ length: 100 }, (_, i) => i + 1);

console.log(
  "15a - Reduce until sum > 50:",
  ReduceUtils.reduceUntil(
    testData,
    (acc, curr) => acc + curr,
    (acc) => acc > 50,
    0
  )
);

console.log(
  "15b - Batched reduce (batch size 10):",
  ReduceUtils.reduceBatched(testData, (acc, curr) => acc + curr, 10, 0)
);

console.log("15c - Reduce with progress:");
ReduceUtils.reduceWithProgress(
  testData,
  (acc, curr) => acc + curr,
  0,
  (progress) => {
    if (progress.current % 20 === 0) {
      console.log(`Progress: ${progress.percentage}%`);
    }
  }
);

console.log("\n=== Discussion Questions ===");
console.log("1. When should you provide an initial value to reduce?");
console.log("2. How does reduce compare to for loops in terms of performance?");
console.log(
  "3. What are common patterns for complex object transformations with reduce?"
);
console.log("4. How do you handle errors in reduce operations?");
console.log("5. When is reduceRight more appropriate than reduce?");
