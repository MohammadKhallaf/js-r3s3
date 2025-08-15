"use strict";

console.log("=== Array filter Challenge ===");

// CHALLENGE 1: filter with complex conditions
// Multi-criteria filtering

const employees = [
  {
    name: "Alice",
    age: 30,
    department: "engineering",
    salary: 75000,
    active: true,
  },
  {
    name: "Bob",
    age: 25,
    department: "marketing",
    salary: 55000,
    active: true,
  },
  {
    name: "Charlie",
    age: 35,
    department: "engineering",
    salary: 85000,
    active: false,
  },
  { name: "Diana", age: 28, department: "design", salary: 65000, active: true },
  {
    name: "Eve",
    age: 32,
    department: "engineering",
    salary: 90000,
    active: true,
  },
];

// Complex multi-criteria filter
const seniorActiveEngineers = employees.filter(
  (emp) =>
    emp.department === "engineering" &&
    emp.active &&
    emp.age >= 30 &&
    emp.salary >= 80000
);

console.log("1a - Senior active engineers:", seniorActiveEngineers);

// Dynamic filtering function
function createEmployeeFilter(criteria) {
  return employees.filter((emp) => {
    return Object.entries(criteria).every(([key, value]) => {
      if (typeof value === "function") {
        return value(emp[key]);
      }
      return emp[key] === value;
    });
  });
}

const customFiltered = createEmployeeFilter({
  active: true,
  age: (age) => age >= 28,
  salary: (salary) => salary > 60000,
});

console.log("1b - Custom filtered:", customFiltered);

// CHALLENGE 2: filter performance with large datasets
// Understanding performance implications

const largeDataset = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  value: Math.random() * 1000,
  category: i % 10,
  active: Math.random() > 0.5,
}));

console.time("2a - Single filter");
const singleFilter = largeDataset.filter(
  (item) => item.active && item.value > 500 && item.category < 5
);
console.timeEnd("2a - Single filter");

console.time("2b - Chained filters");
const chainedFilters = largeDataset
  .filter((item) => item.active)
  .filter((item) => item.value > 500)
  .filter((item) => item.category < 5);
console.timeEnd("2b - Chained filters");

console.time("2c - For loop equivalent");
const forLoopResult = [];
for (let i = 0; i < largeDataset.length; i++) {
  const item = largeDataset[i];
  if (item.active && item.value > 500 && item.category < 5) {
    forLoopResult.push(item);
  }
}
console.timeEnd("2c - For loop equivalent");

console.log(
  "Results equal length:",
  singleFilter.length === chainedFilters.length &&
    chainedFilters.length === forLoopResult.length
);

// CHALLENGE 3: filter with side effects (anti-pattern)
// Why filter shouldn't have side effects

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const processed = [];

// WRONG: Using filter for side effects
const wrongUsage = numbers.filter((num) => {
  if (num % 2 === 0) {
    processed.push(num * 2); // Side effect!
    return true;
  }
  return false;
});

console.log("3a - Wrong filter usage:", wrongUsage);
console.log("3b - Side effect result:", processed);

// CORRECT: Separate filtering and processing
const evenNumbers = numbers.filter((num) => num % 2 === 0);
const processedCorrect = evenNumbers.map((num) => num * 2);

console.log("3c - Correct approach - filtered:", evenNumbers);
console.log("3d - Correct approach - processed:", processedCorrect);

// CHALLENGE 4: filter with type checking and validation
// Robust filtering with type safety

const mixedData = [
  { id: 1, name: "Alice", age: 30 },
  { id: "2", name: "Bob", age: "25" },
  { id: 3, name: null, age: 35 },
  null,
  undefined,
  { id: 4, age: 40 },
  { id: 5, name: "Charlie", age: -5 },
  "invalid",
  { id: 6, name: "", age: 0 },
];

function isValidUser(item) {
  return (
    item !== null &&
    item !== undefined &&
    typeof item === "object" &&
    typeof item.id === "number" &&
    typeof item.name === "string" &&
    item.name.trim() !== "" &&
    typeof item.age === "number" &&
    item.age >= 0 &&
    item.age <= 120
  );
}

const validUsers = mixedData.filter(isValidUser);
console.log("4a - Valid users:", validUsers);

// Complex validation with error logging
const validatedUsers = mixedData.filter((item, index) => {
  if (item === null || item === undefined) {
    console.log(`Invalid: null/undefined at index ${index}`);
    return false;
  }

  if (typeof item !== "object") {
    console.log(`Invalid: not an object at index ${index}`);
    return false;
  }

  if (typeof item.id !== "number") {
    console.log(`Invalid: id not a number at index ${index}`);
    return false;
  }

  if (typeof item.name !== "string" || item.name.trim() === "") {
    console.log(`Invalid: name invalid at index ${index}`);
    return false;
  }

  if (typeof item.age !== "number" || item.age < 0 || item.age > 120) {
    console.log(`Invalid: age invalid at index ${index}`);
    return false;
  }

  return true;
});

console.log("4b - Validated users count:", validatedUsers.length);

// CHALLENGE 5: filter with regex patterns
// Text filtering and pattern matching

const emails = [
  "user@gmail.com",
  "admin@company.co.uk",
  "invalid-email",
  "test@yahoo.com",
  "user.name+tag@domain.com",
  "user@.com",
  "user@domain.",
  "another@gmail.com",
  "@domain.com",
  "user@domain",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validEmails = emails.filter((email) => emailRegex.test(email));

console.log("5a - Valid emails:", validEmails);

// Domain-specific filtering
const gmailEmails = validEmails.filter((email) => email.endsWith("@gmail.com"));
const corporateEmails = validEmails.filter(
  (email) =>
    !email.includes("gmail") &&
    !email.includes("yahoo") &&
    !email.includes("hotmail")
);

console.log("5b - Gmail emails:", gmailEmails);
console.log("5c - Corporate emails:", corporateEmails);

// CHALLENGE 6: filter with date and time conditions
// Temporal filtering

const events = [
  { name: "Meeting 1", date: new Date("2023-01-15T10:00:00"), duration: 60 },
  { name: "Meeting 2", date: new Date("2023-01-15T14:00:00"), duration: 30 },
  { name: "Meeting 3", date: new Date("2023-01-16T09:00:00"), duration: 90 },
  { name: "Meeting 4", date: new Date("2023-01-16T16:00:00"), duration: 45 },
  { name: "Meeting 5", date: new Date("2023-01-17T11:00:00"), duration: 120 },
];

const today = new Date("2023-01-16");
const startOfDay = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);
const endOfDay = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 1
);

// Events today
const todaysEvents = events.filter(
  (event) => event.date >= startOfDay && event.date < endOfDay
);

console.log("6a - Today's events:", todaysEvents);

// Morning events (before 12:00)
const morningEvents = events.filter((event) => event.date.getHours() < 12);

// Long meetings (over 1 hour)
const longMeetings = events.filter((event) => event.duration > 60);

console.log("6b - Morning events:", morningEvents);
console.log("6c - Long meetings:", longMeetings);

// CHALLENGE 7: filter with nested array conditions
// Complex nested filtering

const projects = [
  {
    name: "Project A",
    team: [
      { name: "Alice", role: "developer", skills: ["js", "react", "node"] },
      { name: "Bob", role: "designer", skills: ["figma", "photoshop"] },
    ],
  },
  {
    name: "Project B",
    team: [
      { name: "Charlie", role: "developer", skills: ["python", "django"] },
      { name: "Diana", role: "developer", skills: ["js", "vue", "node"] },
    ],
  },
  {
    name: "Project C",
    team: [{ name: "Eve", role: "manager", skills: ["leadership", "agile"] }],
  },
];

// Projects with JavaScript developers
const jsProjects = projects.filter((project) =>
  project.team.some(
    (member) => member.role === "developer" && member.skills.includes("js")
  )
);

console.log(
  "7a - JS projects:",
  jsProjects.map((p) => p.name)
);

// Projects with at least 2 developers
const multiDevProjects = projects.filter((project) => {
  const devCount = project.team.filter(
    (member) => member.role === "developer"
  ).length;
  return devCount >= 2;
});

console.log(
  "7b - Multi-developer projects:",
  multiDevProjects.map((p) => p.name)
);

// CHALLENGE 8: Custom filter implementations
// Understanding filter by implementing it

Array.prototype.customFilter = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // Handle sparse arrays
      if (callback.call(thisArg, this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }

  return result;
};

const testArray = [1, 2, 3, 4, 5];
const customResult = testArray.customFilter((x) => x > 3);
const nativeResult = testArray.filter((x) => x > 3);

console.log("8a - Custom filter:", customResult);
console.log("8b - Native filter:", nativeResult);
console.log(
  "8c - Results equal:",
  JSON.stringify(customResult) === JSON.stringify(nativeResult)
);

// CHALLENGE 9: filter with memoization
// Optimizing expensive filter predicates

const expensiveData = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  value: Math.random() * 1000,
  category: Math.floor(Math.random() * 100),
}));

// Expensive predicate function
function expensivePredicate(item) {
  // Simulate expensive calculation
  let result = 0;
  for (let i = 0; i < 1000; i++) {
    result += Math.sin(item.value + i);
  }
  return result > 0;
}

// Memoized version
const memoCache = new Map();
function memoizedPredicate(item) {
  const key = `${item.id}-${item.value}`;
  if (memoCache.has(key)) {
    return memoCache.get(key);
  }

  const result = expensivePredicate(item);
  memoCache.set(key, result);
  return result;
}

console.time("9a - Without memoization");
const withoutMemo = expensiveData.slice(0, 1000).filter(expensivePredicate);
console.timeEnd("9a - Without memoization");

console.time("9b - With memoization (first run)");
const withMemoFirst = expensiveData.slice(0, 1000).filter(memoizedPredicate);
console.timeEnd("9b - With memoization (first run)");

console.time("9c - With memoization (second run)");
const withMemoSecond = expensiveData.slice(0, 1000).filter(memoizedPredicate);
console.timeEnd("9c - With memoization (second run)");

// CHALLENGE 10: filter with error handling
// Robust filtering with error recovery

const problematicData = [
  { process: () => true },
  {
    process: () => {
      throw new Error("Processing error");
    },
  },
  { process: () => false },
  null,
  { process: "not a function" },
  { process: () => true },
];

function safeFilter(array, predicate) {
  return array.filter((item, index) => {
    try {
      return predicate(item, index);
    } catch (error) {
      console.log(`Filter error at index ${index}:`, error.message);
      return false; // Exclude problematic items
    }
  });
}

const safeFiltered = safeFilter(problematicData, (item, index) => {
  if (!item || typeof item.process !== "function") {
    throw new Error("Invalid item");
  }
  return item.process();
});

console.log("10a - Safe filtered length:", safeFiltered.length);

// CHALLENGE 11: Advanced filtering patterns
// Complex real-world filtering scenarios

const inventory = [
  {
    id: 1,
    name: "Laptop",
    category: "electronics",
    price: 1000,
    stock: 5,
    tags: ["computer", "work"],
  },
  {
    id: 2,
    name: "Mouse",
    category: "electronics",
    price: 25,
    stock: 0,
    tags: ["computer", "accessory"],
  },
  {
    id: 3,
    name: "Book",
    category: "education",
    price: 20,
    stock: 10,
    tags: ["learning", "reference"],
  },
  {
    id: 4,
    name: "Chair",
    category: "furniture",
    price: 150,
    stock: 3,
    tags: ["office", "comfort"],
  },
  {
    id: 5,
    name: "Phone",
    category: "electronics",
    price: 800,
    stock: 2,
    tags: ["mobile", "communication"],
  },
];

// Multi-criteria inventory filter
function createInventoryFilter(criteria) {
  return inventory.filter((item) => {
    // Price range
    if (criteria.minPrice !== undefined && item.price < criteria.minPrice)
      return false;
    if (criteria.maxPrice !== undefined && item.price > criteria.maxPrice)
      return false;

    // Category
    if (criteria.categories && !criteria.categories.includes(item.category))
      return false;

    // Stock availability
    if (criteria.inStock && item.stock === 0) return false;

    // Tag matching
    if (criteria.tags && !criteria.tags.some((tag) => item.tags.includes(tag)))
      return false;

    // Name search
    if (
      criteria.search &&
      !item.name.toLowerCase().includes(criteria.search.toLowerCase())
    )
      return false;

    return true;
  });
}

const searchCriteria = {
  minPrice: 50,
  maxPrice: 500,
  categories: ["electronics", "furniture"],
  inStock: true,
  tags: ["computer", "office"],
};

const filteredInventory = createInventoryFilter(searchCriteria);
console.log("11a - Filtered inventory:", filteredInventory);

// CHALLENGE 12: filter with statistical analysis
// Filtering based on statistical properties

const salesData = [
  { month: "Jan", sales: 1000, region: "North" },
  { month: "Feb", sales: 1200, region: "North" },
  { month: "Mar", sales: 800, region: "North" },
  { month: "Jan", sales: 1500, region: "South" },
  { month: "Feb", sales: 1800, region: "South" },
  { month: "Mar", sales: 1300, region: "South" },
  { month: "Jan", sales: 900, region: "East" },
  { month: "Feb", sales: 1100, region: "East" },
  { month: "Mar", sales: 950, region: "East" },
];

// Calculate statistics
const allSales = salesData.map((item) => item.sales);
const average =
  allSales.reduce((sum, sales) => sum + sales, 0) / allSales.length;
const sortedSales = allSales.sort((a, b) => a - b);
const median = sortedSales[Math.floor(sortedSales.length / 2)];

// Filter above-average performers
const aboveAverage = salesData.filter((item) => item.sales > average);

// Filter outliers (top 10% and bottom 10%)
const topTenPercentThreshold =
  sortedSales[Math.floor(sortedSales.length * 0.9)];
const bottomTenPercentThreshold =
  sortedSales[Math.floor(sortedSales.length * 0.1)];

const outliers = salesData.filter(
  (item) =>
    item.sales >= topTenPercentThreshold ||
    item.sales <= bottomTenPercentThreshold
);

console.log("12a - Above average sales:", aboveAverage);
console.log("12b - Outliers:", outliers);
console.log("12c - Statistics:", { average: Math.round(average), median });

// CHALLENGE 13: filter utility functions
// Building a comprehensive filter utility library

class FilterUtils {
  // Filter with multiple predicates (all must pass)
  static filterAll(array, ...predicates) {
    return array.filter((item) =>
      predicates.every((predicate) => predicate(item))
    );
  }

  // Filter with multiple predicates (any must pass)
  static filterAny(array, ...predicates) {
    return array.filter((item) =>
      predicates.some((predicate) => predicate(item))
    );
  }

  // Filter unique items based on key function
  static filterUnique(array, keyFn = (x) => x) {
    const seen = new Set();
    return array.filter((item) => {
      const key = keyFn(item);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Filter with fuzzy string matching
  static filterFuzzy(array, searchTerm, keyFn = (x) => x) {
    const term = searchTerm.toLowerCase();
    return array.filter((item) => {
      const value = keyFn(item).toLowerCase();
      return value.includes(term) || this.levenshteinDistance(value, term) <= 2;
    });
  }

  // Helper for fuzzy matching
  static levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }
}

const testUsers = [
  { name: "Alice Johnson", age: 30, active: true },
  { name: "Bob Smith", age: 25, active: false },
  { name: "Alice Brown", age: 35, active: true },
  { name: "Charlie Wilson", age: 40, active: true },
  { name: "Diana Johnson", age: 28, active: true },
];

console.log(
  "13a - Filter all (active and age > 30):",
  FilterUtils.filterAll(
    testUsers,
    (user) => user.active,
    (user) => user.age > 30
  )
);

console.log(
  "13b - Filter any (name Alice or age < 30):",
  FilterUtils.filterAny(
    testUsers,
    (user) => user.name.includes("Alice"),
    (user) => user.age < 30
  )
);

console.log(
  "13c - Filter unique by last name:",
  FilterUtils.filterUnique(testUsers, (user) => user.name.split(" ")[1])
);

console.log(
  "13d - Fuzzy filter for 'Alise':",
  FilterUtils.filterFuzzy(testUsers, "Alise", (user) => user.name)
);

console.log("\n=== Discussion Questions ===");
console.log(
  "1. When should you use multiple filter calls vs one complex filter?"
);
console.log("2. How does filter handle sparse arrays?");
console.log(
  "3. What are the performance implications of complex filter predicates?"
);
console.log(
  "4. How can you make filter operations more readable and maintainable?"
);
console.log("5. What are common anti-patterns when using filter?");
