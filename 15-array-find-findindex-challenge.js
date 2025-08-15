"use strict";

console.log("=== Array find & findIndex Challenge ===");

// CHALLENGE 1: find vs findIndex return value differences
// Understanding what each method returns

const numbers = [10, 20, 30, 40, 50];

const foundValue = numbers.find((num) => num > 25);
const foundIndex = numbers.findIndex((num) => num > 25);
const notFoundValue = numbers.find((num) => num > 100);
const notFoundIndex = numbers.findIndex((num) => num > 100);

console.log("1a - Found value:", foundValue); // 30
console.log("1b - Found index:", foundIndex); // 2
console.log("1c - Not found value:", notFoundValue); // undefined
console.log("1d - Not found index:", notFoundIndex); // -1

// CHALLENGE 2: Short-circuiting behavior
// Understanding when iteration stops

let findCallCount = 0;
let findIndexCallCount = 0;

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("2a - Testing short-circuiting:");
const findResult = testArray.find((num) => {
  findCallCount++;
  console.log(`  find: checking ${num}`);
  return num > 5;
});

console.log(`find result: ${findResult}, calls made: ${findCallCount}`);

const findIndexResult = testArray.findIndex((num) => {
  findIndexCallCount++;
  console.log(`  findIndex: checking ${num}`);
  return num > 5;
});

console.log(
  `findIndex result: ${findIndexResult}, calls made: ${findIndexCallCount}`
);

// CHALLENGE 3: Complex object searching
// Real-world scenarios with objects

const employees = [
  {
    id: 1,
    name: "Alice",
    department: "Engineering",
    salary: 75000,
    active: true,
  },
  { id: 2, name: "Bob", department: "Marketing", salary: 55000, active: false },
  {
    id: 3,
    name: "Charlie",
    department: "Engineering",
    salary: 85000,
    active: true,
  },
  { id: 4, name: "Diana", department: "Design", salary: 65000, active: true },
  {
    id: 5,
    name: "Eve",
    department: "Engineering",
    salary: 90000,
    active: false,
  },
];

// Find by single property
const engineerEmployee = employees.find(
  (emp) => emp.department === "Engineering"
);
const engineerIndex = employees.findIndex(
  (emp) => emp.department === "Engineering"
);

console.log("3a - First engineer:", engineerEmployee?.name);
console.log("3b - First engineer index:", engineerIndex);

// Find by multiple criteria
const highPaidActiveEngineer = employees.find(
  (emp) => emp.department === "Engineering" && emp.active && emp.salary > 80000
);

const inactiveEmployeeIndex = employees.findIndex((emp) => !emp.active);

console.log("3c - High-paid active engineer:", highPaidActiveEngineer?.name);
console.log("3d - First inactive employee index:", inactiveEmployeeIndex);

// CHALLENGE 4: find vs filter differences
// When to use which method

const products = [
  { name: "Laptop", price: 1000, category: "electronics", inStock: true },
  { name: "Mouse", price: 25, category: "electronics", inStock: false },
  { name: "Book", price: 20, category: "books", inStock: true },
  { name: "Phone", price: 800, category: "electronics", inStock: true },
  { name: "Pen", price: 2, category: "stationery", inStock: true },
];

// find returns first match only
const firstElectronic = products.find((p) => p.category === "electronics");

// filter returns all matches
const allElectronics = products.filter((p) => p.category === "electronics");

// find for existence check
const hasExpensiveItem = products.find((p) => p.price > 500) !== undefined;

// some() is better for existence checks
const hasExpensiveItemBetter = products.some((p) => p.price > 500);

console.log("4a - First electronic:", firstElectronic.name);
console.log("4b - All electronics count:", allElectronics.length);
console.log("4c - Has expensive item (find):", hasExpensiveItem);
console.log("4d - Has expensive item (some):", hasExpensiveItemBetter);

// CHALLENGE 5: Working with indices for updates
// Practical use of findIndex for modifications

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity = 1) {
    const existingIndex = this.items.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingIndex !== -1) {
      // Item exists, update quantity
      this.items[existingIndex].quantity += quantity;
    } else {
      // New item
      this.items.push({ product, quantity });
    }
  }

  removeItem(productId) {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  updateQuantity(productId, newQuantity) {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index !== -1) {
      if (newQuantity <= 0) {
        this.items.splice(index, 1);
      } else {
        this.items[index].quantity = newQuantity;
      }
      return true;
    }
    return false;
  }

  findItem(productId) {
    return this.items.find((item) => item.product.id === productId);
  }

  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}

const cart = new ShoppingCart();
const laptop = { id: 1, name: "Laptop", price: 1000 };
const mouse = { id: 2, name: "Mouse", price: 25 };

cart.addItem(laptop, 1);
cart.addItem(mouse, 2);
cart.addItem(laptop, 1); // Should update existing

console.log(
  "5a - Cart items:",
  cart.items.map((item) => `${item.product.name} x${item.quantity}`)
);
console.log("5b - Cart total:", cart.getTotal());

cart.updateQuantity(2, 1); // Reduce mouse quantity
console.log(
  "5c - After update:",
  cart.items.map((item) => `${item.product.name} x${item.quantity}`)
);

// CHALLENGE 6: Performance comparisons
// find/findIndex vs other search methods

const largeArray = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  value: Math.random() * 1000,
  category: i % 10,
}));

const targetId = 75000;

console.time("6a - find by id");
const foundById = largeArray.find((item) => item.id === targetId);
console.timeEnd("6a - find by id");

console.time("6b - findIndex by id");
const foundIndexById = largeArray.findIndex((item) => item.id === targetId);
console.timeEnd("6b - findIndex by id");

console.time("6c - for loop search");
let forLoopResult = null;
for (let i = 0; i < largeArray.length; i++) {
  if (largeArray[i].id === targetId) {
    forLoopResult = largeArray[i];
    break;
  }
}
console.timeEnd("6c - for loop search");

console.time("6d - filter (gets all matches)");
const filterResult = largeArray.filter((item) => item.id === targetId);
console.timeEnd("6d - filter (gets all matches)");

console.log(
  "Results found:",
  foundById !== undefined,
  foundIndexById !== -1,
  forLoopResult !== null,
  filterResult.length > 0
);

// CHALLENGE 7: Custom comparison functions
// Complex search predicates

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@company.com",
    tags: ["admin", "developer"],
  },
  { id: 2, name: "Bob Smith", email: "bob@external.com", tags: ["user"] },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@company.com",
    tags: ["developer", "manager"],
  },
  { id: 4, name: "Diana Prince", email: "diana@company.com", tags: ["admin"] },
];

// Complex search functions
const searchFunctions = {
  // Search by partial name match (case insensitive)
  byPartialName: (searchTerm) => (user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),

  // Search by email domain
  byEmailDomain: (domain) => (user) => user.email.endsWith(`@${domain}`),

  // Search by tag intersection
  byTags: (requiredTags) => (user) =>
    requiredTags.every((tag) => user.tags.includes(tag)),

  // Search by multiple criteria
  byMultipleCriteria: (criteria) => (user) => {
    if (
      criteria.name &&
      !user.name.toLowerCase().includes(criteria.name.toLowerCase())
    ) {
      return false;
    }
    if (criteria.domain && !user.email.endsWith(`@${criteria.domain}`)) {
      return false;
    }
    if (
      criteria.tags &&
      !criteria.tags.every((tag) => user.tags.includes(tag))
    ) {
      return false;
    }
    return true;
  },
};

console.log(
  "7a - Search by partial name 'Bob':",
  users.find(searchFunctions.byPartialName("Bob"))?.name
);

console.log(
  "7b - Search by company domain:",
  users.filter(searchFunctions.byEmailDomain("company.com")).length
);

console.log(
  "7c - Search by admin tag:",
  users.find(searchFunctions.byTags(["admin"]))?.name
);

console.log(
  "7d - Search by multiple criteria:",
  users.find(
    searchFunctions.byMultipleCriteria({
      domain: "company.com",
      tags: ["developer"],
    })
  )?.name
);

// CHALLENGE 8: Error handling in search predicates
// Robust searching with error recovery

const problematicData = [
  { id: 1, name: "Alice", profile: { age: 30 } },
  { id: 2, name: "Bob", profile: null },
  { id: 3, name: "Charlie" }, // Missing profile
  null, // Null item
  { id: 4, name: "Diana", profile: { age: "invalid" } },
];

function safeFind(array, predicate, errorHandler = () => false) {
  return array.find((item, index) => {
    try {
      return predicate(item, index);
    } catch (error) {
      return errorHandler(error, item, index);
    }
  });
}

function safeFindIndex(array, predicate, errorHandler = () => false) {
  return array.findIndex((item, index) => {
    try {
      return predicate(item, index);
    } catch (error) {
      return errorHandler(error, item, index);
    }
  });
}

// Safe search with error handling
const safeAgeSearch = safeFind(
  problematicData,
  (user) => user.profile.age > 25, // This will throw for some items
  (error, item, index) => {
    console.log(`8a - Error at index ${index}:`, error.message);
    return false; // Skip problematic items
  }
);

console.log("8b - Safe age search result:", safeAgeSearch?.name);

// More robust approach with validation
function findUserWithAge(users, minAge) {
  return users.find((user) => {
    if (!user || typeof user !== "object") return false;
    if (!user.profile || typeof user.profile !== "object") return false;
    if (typeof user.profile.age !== "number") return false;
    return user.profile.age >= minAge;
  });
}

console.log(
  "8c - Robust age search:",
  findUserWithAge(problematicData, 25)?.name
);

// CHALLENGE 9: Working with nested arrays
// Finding in complex nested structures

const organizations = [
  {
    id: 1,
    name: "TechCorp",
    departments: [
      {
        name: "Engineering",
        employees: [
          { id: 101, name: "Alice", skills: ["JavaScript", "React"] },
          { id: 102, name: "Bob", skills: ["Python", "Django"] },
        ],
      },
      {
        name: "Design",
        employees: [
          { id: 201, name: "Charlie", skills: ["Figma", "Photoshop"] },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "DesignStudio",
    departments: [
      {
        name: "Creative",
        employees: [
          { id: 301, name: "Diana", skills: ["Illustrator", "Figma"] },
        ],
      },
    ],
  },
];

// Find employee by ID across all organizations
function findEmployeeById(orgs, employeeId) {
  for (const org of orgs) {
    for (const dept of org.departments) {
      const employee = dept.employees.find((emp) => emp.id === employeeId);
      if (employee) {
        return {
          employee,
          department: dept.name,
          organization: org.name,
        };
      }
    }
  }
  return null;
}

// Find employee by skill
function findEmployeeBySkill(orgs, skill) {
  for (const org of orgs) {
    for (const dept of org.departments) {
      const employee = dept.employees.find((emp) => emp.skills.includes(skill));
      if (employee) {
        return {
          employee,
          department: dept.name,
          organization: org.name,
        };
      }
    }
  }
  return null;
}

console.log("9a - Find employee 102:", findEmployeeById(organizations, 102));
console.log(
  "9b - Find Figma expert:",
  findEmployeeBySkill(organizations, "Figma")
);

// CHALLENGE 10: Custom find implementations
// Understanding the algorithms by implementing them

Array.prototype.customFind = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // Handle sparse arrays
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }

  return undefined;
};

Array.prototype.customFindIndex = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // Handle sparse arrays
      if (callback.call(thisArg, this[i], i, this)) {
        return i;
      }
    }
  }

  return -1;
};

const testArray2 = [1, 2, 3, 4, 5];
console.log(
  "10a - Custom find:",
  testArray2.customFind((x) => x > 3)
);
console.log(
  "10b - Native find:",
  testArray2.find((x) => x > 3)
);
console.log(
  "10c - Custom findIndex:",
  testArray2.customFindIndex((x) => x > 3)
);
console.log(
  "10d - Native findIndex:",
  testArray2.findIndex((x) => x > 3)
);

// CHALLENGE 11: Sparse array handling
// How find/findIndex work with holes in arrays

const sparseArray = [1, , 3, , 5];
console.log("11a - Sparse array:", sparseArray);

let findIterations = 0;
const sparseResult = sparseArray.find((value, index) => {
  findIterations++;
  console.log(
    `11b - find iteration ${findIterations}: index ${index}, value ${value}`
  );
  return value === undefined;
});

console.log("11c - Sparse find result:", sparseResult);
console.log("11d - Total find iterations:", findIterations);

// Compare with dense array
const denseArray = [1, undefined, 3, undefined, 5];
let denseIterations = 0;
const denseResult = denseArray.find((value, index) => {
  denseIterations++;
  console.log(
    `11e - dense iteration ${denseIterations}: index ${index}, value ${value}`
  );
  return value === undefined;
});

console.log("11f - Dense find result:", denseResult);

// CHALLENGE 12: Building search utilities
// Advanced search functionality

class SearchUtils {
  // Find multiple items (like filter but with limit)
  static findMultiple(array, predicate, limit = Infinity) {
    const results = [];
    for (let i = 0; i < array.length && results.length < limit; i++) {
      if (predicate(array[i], i, array)) {
        results.push(array[i]);
      }
    }
    return results;
  }

  // Find with timeout (for expensive predicates)
  static findWithTimeout(array, predicate, timeoutMs = 1000) {
    const startTime = Date.now();

    for (let i = 0; i < array.length; i++) {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error("Search timeout exceeded");
      }

      if (predicate(array[i], i, array)) {
        return { found: true, value: array[i], index: i };
      }
    }

    return { found: false, value: undefined, index: -1 };
  }

  // Find with path (for nested objects)
  static findByPath(array, path, value) {
    return array.find((item) => {
      let current = item;
      for (const key of path.split(".")) {
        current = current?.[key];
        if (current === undefined) return false;
      }
      return current === value;
    });
  }

  // Binary search (for sorted arrays)
  static binaryFind(sortedArray, target, compareFn = (a, b) => a - b) {
    let left = 0;
    let right = sortedArray.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const comparison = compareFn(sortedArray[mid], target);

      if (comparison === 0) {
        return { found: true, value: sortedArray[mid], index: mid };
      } else if (comparison < 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return { found: false, value: undefined, index: -1 };
  }
}

const testData = [
  { id: 1, user: { profile: { name: "Alice" } } },
  { id: 2, user: { profile: { name: "Bob" } } },
  { id: 3, user: { profile: { name: "Charlie" } } },
];

console.log(
  "12a - Find multiple (limit 2):",
  SearchUtils.findMultiple(testData, (item) => item.id > 1, 2)
);

console.log(
  "12b - Find by path:",
  SearchUtils.findByPath(testData, "user.profile.name", "Bob")?.id
);

const sortedNumbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log("12c - Binary search:", SearchUtils.binaryFind(sortedNumbers, 7));

// CHALLENGE 13: Real-world data scenarios
// Complex business logic searches

const inventory = [
  {
    sku: "LAP001",
    name: "Laptop Pro",
    price: 1200,
    category: "electronics",
    stock: 5,
    vendor: { id: 1, name: "TechSupplier" },
  },
  {
    sku: "MOU001",
    name: "Wireless Mouse",
    price: 45,
    category: "electronics",
    stock: 0,
    vendor: { id: 2, name: "AccessoryWorld" },
  },
  {
    sku: "BOO001",
    name: "JavaScript Guide",
    price: 35,
    category: "books",
    stock: 12,
    vendor: { id: 3, name: "BookStore" },
  },
  {
    sku: "LAP002",
    name: "Laptop Basic",
    price: 800,
    category: "electronics",
    stock: 3,
    vendor: { id: 1, name: "TechSupplier" },
  },
];

class InventoryManager {
  constructor(inventory) {
    this.inventory = inventory;
  }

  findBySku(sku) {
    return this.inventory.find((item) => item.sku === sku);
  }

  findAvailableInCategory(category) {
    return this.inventory.find(
      (item) => item.category === category && item.stock > 0
    );
  }

  findCheapestInPriceRange(minPrice, maxPrice) {
    const inRange = this.inventory.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    return inRange.reduce(
      (cheapest, current) =>
        !cheapest || current.price < cheapest.price ? current : cheapest,
      null
    );
  }

  findByVendorWithStock(vendorId) {
    return this.inventory.find(
      (item) => item.vendor.id === vendorId && item.stock > 0
    );
  }

  findReorderNeeded(threshold = 5) {
    return this.inventory.find((item) => item.stock <= threshold);
  }
}

const inventoryMgr = new InventoryManager(inventory);

console.log("13a - Find by SKU:", inventoryMgr.findBySku("LAP001")?.name);
console.log(
  "13b - Available electronics:",
  inventoryMgr.findAvailableInCategory("electronics")?.name
);
console.log(
  "13c - Cheapest in range $30-$50:",
  inventoryMgr.findCheapestInPriceRange(30, 50)?.name
);
console.log(
  "13d - Vendor 1 with stock:",
  inventoryMgr.findByVendorWithStock(1)?.name
);
console.log("13e - Needs reorder:", inventoryMgr.findReorderNeeded(3)?.name);

// CHALLENGE 14: Performance optimization patterns
// When to use find vs other approaches

class OptimizedSearch {
  constructor(data) {
    this.data = data;
    this.indexCache = new Map();
  }

  // Build index for frequent searches
  buildIndex(keyPath) {
    const index = new Map();

    this.data.forEach((item, i) => {
      const key = this.getValueByPath(item, keyPath);
      if (!index.has(key)) {
        index.set(key, []);
      }
      index.get(key).push({ item, index: i });
    });

    this.indexCache.set(keyPath, index);
    return index;
  }

  // Fast lookup using index
  findByIndexedKey(keyPath, value) {
    let index = this.indexCache.get(keyPath);
    if (!index) {
      index = this.buildIndex(keyPath);
    }

    const matches = index.get(value);
    return matches ? matches[0] : null;
  }

  // Regular find for comparison
  findByPath(keyPath, value) {
    return this.data.find(
      (item) => this.getValueByPath(item, keyPath) === value
    );
  }

  getValueByPath(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }
}

const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  category: `cat${i % 100}`,
  price: Math.random() * 1000,
}));

const optimizer = new OptimizedSearch(largeDataset);

console.time("14a - Build category index");
optimizer.buildIndex("category");
console.timeEnd("14a - Build category index");

console.time("14b - Indexed search");
const indexedResult = optimizer.findByIndexedKey("category", "cat50");
console.timeEnd("14b - Indexed search");

console.time("14c - Regular find search");
const regularResult = optimizer.findByPath("category", "cat50");
console.timeEnd("14c - Regular find search");

console.log(
  "14d - Results equal:",
  indexedResult?.item.id === regularResult?.id
);

// CHALLENGE 15: Advanced patterns and edge cases
// Complex scenarios and gotchas

const advancedChallenges = {
  // Challenge: find with side effects (anti-pattern)
  findWithSideEffects: function () {
    const log = [];
    const data = [1, 2, 3, 4, 5];

    const result = data.find((num) => {
      log.push(`Checking ${num}`); // Side effect
      return num > 3;
    });

    return { result, log };
  },

  // Challenge: find with async predicate (doesn't work)
  findWithAsync: function () {
    const data = [1, 2, 3, 4, 5];

    // This doesn't work as expected
    const result = data.find(async (num) => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      return num > 3;
    });

    return result; // Returns a Promise, not the expected value
  },

  // Challenge: find with changing array during iteration
  findWithMutation: function () {
    const data = [1, 2, 3, 4, 5];

    const result = data.find((num, index, arr) => {
      if (index === 2) {
        arr.push(6); // Mutate array during iteration
      }
      return num > 10;
    });

    return { result, finalArray: data };
  },

  // Challenge: find with NaN comparison
  findNaN: function () {
    const data = [1, NaN, 3, NaN, 5];

    const foundNaN1 = data.find((x) => x === NaN); // Wrong way
    const foundNaN2 = data.find((x) => Number.isNaN(x)); // Correct way
    const foundNaN3 = data.find((x) => x !== x); // Alternative way

    return { foundNaN1, foundNaN2, foundNaN3 };
  },
};

console.log(
  "15a - Find with side effects:",
  advancedChallenges.findWithSideEffects()
);
console.log(
  "15b - Find with async (broken):",
  typeof advancedChallenges.findWithAsync()
);
console.log("15c - Find with mutation:", advancedChallenges.findWithMutation());
console.log("15d - Find NaN:", advancedChallenges.findNaN());

// CHALLENGE 16: Building a sophisticated search engine
// Comprehensive search functionality

class SearchEngine {
  constructor(data) {
    this.data = data;
    this.indexes = new Map();
  }

  // Flexible search with multiple criteria
  search(criteria) {
    return this.data.filter((item) => {
      return Object.entries(criteria).every(([key, value]) => {
        if (typeof value === "function") {
          return value(this.getNestedValue(item, key));
        }

        if (value && typeof value === "object" && value.operator) {
          return this.evaluateCondition(
            this.getNestedValue(item, key),
            value.operator,
            value.value
          );
        }

        return this.getNestedValue(item, key) === value;
      });
    });
  }

  // Find first match with complex criteria
  findFirst(criteria) {
    return this.data.find((item) => {
      return Object.entries(criteria).every(([key, value]) => {
        if (typeof value === "function") {
          return value(this.getNestedValue(item, key));
        }
        return this.getNestedValue(item, key) === value;
      });
    });
  }

  evaluateCondition(itemValue, operator, targetValue) {
    switch (operator) {
      case "gt":
        return itemValue > targetValue;
      case "gte":
        return itemValue >= targetValue;
      case "lt":
        return itemValue < targetValue;
      case "lte":
        return itemValue <= targetValue;
      case "contains":
        return itemValue && itemValue.includes(targetValue);
      case "startsWith":
        return itemValue && itemValue.startsWith(targetValue);
      case "in":
        return Array.isArray(targetValue) && targetValue.includes(itemValue);
      default:
        return itemValue === targetValue;
    }
  }

  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }
}

const searchData = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 30,
    department: "Engineering",
    skills: ["JavaScript", "React"],
    salary: 75000,
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 25,
    department: "Marketing",
    skills: ["SEO", "Analytics"],
    salary: 55000,
  },
  {
    id: 3,
    name: "Charlie Brown",
    age: 35,
    department: "Engineering",
    skills: ["Python", "Django"],
    salary: 85000,
  },
  {
    id: 4,
    name: "Diana Prince",
    age: 28,
    department: "Design",
    skills: ["Figma", "Photoshop"],
    salary: 65000,
  },
];

const searchEngine = new SearchEngine(searchData);

console.log(
  "16a - Find first engineer:",
  searchEngine.findFirst({ department: "Engineering" })?.name
);

console.log(
  "16b - Search high earners:",
  searchEngine
    .search({
      salary: { operator: "gt", value: 60000 },
    })
    .map((p) => p.name)
);

console.log(
  "16c - Search by name pattern:",
  searchEngine
    .search({
      name: { operator: "contains", value: "o" },
    })
    .map((p) => p.name)
);

console.log(
  "16d - Complex search:",
  searchEngine
    .search({
      department: "Engineering",
      age: { operator: "gte", value: 30 },
      skills: (skills) => skills.includes("JavaScript"),
    })
    .map((p) => p.name)
);

console.log("\n=== Discussion Questions ===");
console.log("1. When should you use find() vs filter()[0] vs some()?");
console.log("2. How do find() and findIndex() handle sparse arrays?");
console.log(
  "3. What are the performance implications of complex search predicates?"
);
console.log("4. How can you optimize frequent searches in large datasets?");
console.log(
  "5. What are common pitfalls when using find() with async operations?"
);
