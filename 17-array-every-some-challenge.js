"use strict";

console.log("=== Array every & some Challenge ===");

// CHALLENGE 1: Short-circuiting behavior deep dive
// Understanding when iteration stops

let everyCallCount = 0;
let someCallCount = 0;

const numbers = [2, 4, 6, 7, 8, 10];

console.log("1a - Testing short-circuiting:");
const everyResult = numbers.every((num) => {
  everyCallCount++;
  console.log(`every: checking ${num}`);
  return num % 2 === 0;
});

console.log(`every result: ${everyResult}, calls made: ${everyCallCount}`);

const someResult = numbers.some((num) => {
  someCallCount++;
  console.log(`some: checking ${num}`);
  return num > 5;
});

console.log(`some result: ${someResult}, calls made: ${someCallCount}`);

// CHALLENGE 2: Complex validation scenarios
// Real-world validation patterns

const users = [
  {
    id: 1,
    name: "Alice",
    email: "alice@company.com",
    age: 30,
    roles: ["user", "admin"],
    active: true,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@company.com",
    age: 25,
    roles: ["user"],
    active: true,
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@external.com",
    age: 35,
    roles: ["user", "moderator"],
    active: false,
  },
  {
    id: 4,
    name: "Diana",
    email: "diana@company.com",
    age: 28,
    roles: ["user"],
    active: true,
  },
];

// Check if all users are from company domain
const allCompanyUsers = users.every((user) =>
  user.email.endsWith("@company.com")
);

// Check if any user has admin role
const hasAdmin = users.some((user) => user.roles.includes("admin"));

// Check if all active users are adults
const allActiveUsersAdults = users
  .filter((user) => user.active)
  .every((user) => user.age >= 18);

// Check if any inactive user exists
const hasInactiveUsers = users.some((user) => !user.active);

console.log("2a - All company users:", allCompanyUsers);
console.log("2b - Has admin:", hasAdmin);
console.log("2c - All active users are adults:", allActiveUsersAdults);
console.log("2d - Has inactive users:", hasInactiveUsers);

// CHALLENGE 3: Empty array edge cases
// Understanding vacuous truth and false

const emptyArray = [];

// every returns true for empty arrays (vacuous truth)
const emptyEveryTrue = emptyArray.every((x) => x > 100);
const emptyEveryFalse = emptyArray.every((x) => false);

// some returns false for empty arrays
const emptySomeTrue = emptyArray.some((x) => true);
const emptySomeFalse = emptyArray.some((x) => x > 100);

console.log("3a - Empty array every (true condition):", emptyEveryTrue);
console.log("3b - Empty array every (false condition):", emptyEveryFalse);
console.log("3c - Empty array some (true condition):", emptySomeTrue);
console.log("3d - Empty array some (false condition):", emptySomeFalse);

// CHALLENGE 4: Nested array validation
// Validating complex nested structures

const orders = [
  {
    id: 1,
    items: [
      { product: "laptop", price: 1000, quantity: 1 },
      { product: "mouse", price: 25, quantity: 2 },
    ],
    customer: { type: "premium", verified: true },
  },
  {
    id: 2,
    items: [{ product: "keyboard", price: 75, quantity: 1 }],
    customer: { type: "standard", verified: true },
  },
  {
    id: 3,
    items: [
      { product: "monitor", price: 300, quantity: 1 },
      { product: "cable", price: 15, quantity: 3 },
    ],
    customer: { type: "premium", verified: false },
  },
];

// Check if all orders have verified customers
const allVerifiedCustomers = orders.every((order) => order.customer.verified);

// Check if any order has premium customer
const hasPremiumCustomer = orders.some(
  (order) => order.customer.type === "premium"
);

// Check if all orders have items with positive prices
const allPositivePrices = orders.every((order) =>
  order.items.every((item) => item.price > 0)
);

// Check if any order has expensive items (>500)
const hasExpensiveItems = orders.some((order) =>
  order.items.some((item) => item.price > 500)
);

// Check if all premium customers have high-value orders (>200)
const premiumHighValue = orders
  .filter((order) => order.customer.type === "premium")
  .every((order) => {
    const total = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return total > 200;
  });

console.log("4a - All verified customers:", allVerifiedCustomers);
console.log("4b - Has premium customer:", hasPremiumCustomer);
console.log("4c - All positive prices:", allPositivePrices);
console.log("4d - Has expensive items:", hasExpensiveItems);
console.log("4e - Premium customers high value:", premiumHighValue);

// CHALLENGE 5: Type validation and duck typing
// Advanced type checking scenarios

const mixedData = [
  { name: "Alice", age: 30, getId: () => 1 },
  { name: "Bob", age: 25, getId: () => 2 },
  { name: "Charlie", age: 35 }, // Missing getId
  "invalid",
  null,
  { name: "", age: -5, getId: () => 3 },
];

// Duck typing validation
function isValidUser(obj) {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === "object" &&
    typeof obj.name === "string" &&
    obj.name.trim() !== "" &&
    typeof obj.age === "number" &&
    obj.age >= 0 &&
    obj.age <= 120 &&
    typeof obj.getId === "function"
  );
}

const allValidUsers = mixedData.every(isValidUser);
const hasValidUser = mixedData.some(isValidUser);
const validUserCount = mixedData.filter(isValidUser).length;

console.log("5a - All valid users:", allValidUsers);
console.log("5b - Has valid user:", hasValidUser);
console.log("5c - Valid user count:", validUserCount);

// CHALLENGE 6: Async validation patterns
// Combining every/some with async operations

async function validateAsync(user) {
  // Simulate async validation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user.email && user.email.includes("@"));
    }, Math.random() * 50);
  });
}

const testUsers = [
  { name: "Alice", email: "alice@test.com" },
  { name: "Bob", email: "bob@test.com" },
  { name: "Charlie", email: "invalid-email" },
];

// WRONG: every/some don't wait for promises
const wrongAsyncEvery = testUsers.every(
  async (user) => await validateAsync(user)
);
console.log("6a - Wrong async every (returns promises):", wrongAsyncEvery);

// CORRECT: Use Promise.all with every/some
async function validateAllUsers() {
  const validations = await Promise.all(
    testUsers.map((user) => validateAsync(user))
  );
  return validations.every((isValid) => isValid);
}

async function validateAnyUser() {
  const validations = await Promise.all(
    testUsers.map((user) => validateAsync(user))
  );
  return validations.some((isValid) => isValid);
}

validateAllUsers().then((result) => {
  console.log("6b - Correct async every:", result);
});

validateAnyUser().then((result) => {
  console.log("6c - Correct async some:", result);
});

// CHALLENGE 7: Performance optimization
// When every/some can be more efficient than alternatives

const largeDataset = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  value: Math.random() * 1000,
  active: Math.random() > 0.5,
}));

// Using every for existence check
console.time("7a - every for all check");
const allActive = largeDataset.every((item) => item.active);
console.timeEnd("7a - every for all check");

// Using filter + length (less efficient)
console.time("7b - filter + length check");
const allActiveFilter =
  largeDataset.filter((item) => item.active).length === largeDataset.length;
console.timeEnd("7b - filter + length check");

// Using some for existence check
console.time("7c - some for any check");
const anyHighValue = largeDataset.some((item) => item.value > 900);
console.timeEnd("7c - some for any check");

// Using find (similar performance but different purpose)
console.time("7d - find for existence");
const foundHighValue =
  largeDataset.find((item) => item.value > 900) !== undefined;
console.timeEnd("7d - find for existence");

console.log("Results:", {
  allActive,
  allActiveFilter,
  anyHighValue,
  foundHighValue,
});

// CHALLENGE 8: Custom every/some implementations
// Understanding the algorithms

Array.prototype.customEvery = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // Handle sparse arrays
      if (!callback.call(thisArg, this[i], i, this)) {
        return false; // Short-circuit on first false
      }
    }
  }

  return true; // All elements passed (or empty array)
};

Array.prototype.customSome = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // Handle sparse arrays
      if (callback.call(thisArg, this[i], i, this)) {
        return true; // Short-circuit on first true
      }
    }
  }

  return false; // No elements passed (or empty array)
};

const testArray = [2, 4, 6, 8];
const testArrayWithOdd = [2, 4, 5, 8];

console.log(
  "8a - Custom every (all even):",
  testArray.customEvery((x) => x % 2 === 0)
);
console.log(
  "8b - Native every (all even):",
  testArray.every((x) => x % 2 === 0)
);
console.log(
  "8c - Custom some (has odd):",
  testArrayWithOdd.customSome((x) => x % 2 === 1)
);
console.log(
  "8d - Native some (has odd):",
  testArrayWithOdd.some((x) => x % 2 === 1)
);

// CHALLENGE 9: Complex business rules validation
// Real-world validation scenarios

const financialRecords = [
  {
    account: "ACC001",
    balance: 1500,
    transactions: [100, -50, 200],
    riskLevel: "low",
  },
  {
    account: "ACC002",
    balance: 500,
    transactions: [-100, -200, 50],
    riskLevel: "medium",
  },
  {
    account: "ACC003",
    balance: 2000,
    transactions: [300, -100, 150],
    riskLevel: "low",
  },
  {
    account: "ACC004",
    balance: -100,
    transactions: [-500, 200, -300],
    riskLevel: "high",
  },
];

// Business rule: All accounts must have positive balance
const allPositiveBalance = financialRecords.every(
  (record) => record.balance > 0
);

// Business rule: Any high-risk account triggers review
const needsReview = financialRecords.some(
  (record) => record.riskLevel === "high"
);

// Business rule: All low-risk accounts must have stable transactions (no single transaction > 50% of balance)
const lowRiskStable = financialRecords
  .filter((record) => record.riskLevel === "low")
  .every((record) =>
    record.transactions.every(
      (transaction) => Math.abs(transaction) <= record.balance * 0.5
    )
  );

// Business rule: Any account with 3+ consecutive negative transactions
const hasConsecutiveNegative = financialRecords.some((record) => {
  const negativeStreak = record.transactions.reduce((streak, transaction) => {
    if (transaction < 0) {
      return streak + 1;
    }
    return 0;
  }, 0);
  return negativeStreak >= 3;
});

console.log("9a - All positive balance:", allPositiveBalance);
console.log("9b - Needs review:", needsReview);
console.log("9c - Low risk stable:", lowRiskStable);
console.log("9d - Has consecutive negative:", hasConsecutiveNegative);

// CHALLENGE 10: Matrix and grid validation
// 2D array validation patterns

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const invalidMatrix = [
  [1, 2, 3],
  [4, 5], // Missing element
  [7, 8, 9],
];

// Check if matrix is rectangular (all rows same length)
function isRectangularMatrix(matrix) {
  if (matrix.length === 0) return true;
  const expectedLength = matrix[0].length;
  return matrix.every(
    (row) => Array.isArray(row) && row.length === expectedLength
  );
}

// Check if matrix contains any negative numbers
function hasNegativeNumbers(matrix) {
  return matrix.some((row) => row.some((cell) => cell < 0));
}

// Check if all elements are numbers
function allNumberMatrix(matrix) {
  return matrix.every((row) =>
    row.every((cell) => typeof cell === "number" && !isNaN(cell))
  );
}

console.log("10a - Valid matrix rectangular:", isRectangularMatrix(matrix));
console.log(
  "10b - Invalid matrix rectangular:",
  isRectangularMatrix(invalidMatrix)
);
console.log("10c - Has negative numbers:", hasNegativeNumbers(matrix));
console.log("10d - All numbers:", allNumberMatrix(matrix));

// CHALLENGE 11: Set operations with every/some
// Using every/some for set-like operations

const set1 = [1, 2, 3, 4, 5];
const set2 = [3, 4, 5, 6, 7];
const subset = [2, 3, 4];

// Check if subset is contained in set1
const isSubset = subset.every((element) => set1.includes(element));

// Check if sets have any common elements (intersection)
const hasIntersection = set1.some((element) => set2.includes(element));

// Check if set1 is completely different from set2 (disjoint)
const areDisjoint = set1.every((element) => !set2.includes(element));

console.log("11a - Is subset:", isSubset);
console.log("11b - Has intersection:", hasIntersection);
console.log("11c - Are disjoint:", areDisjoint);

// CHALLENGE 12: Form validation patterns
// Comprehensive form validation

const formData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    age: 30,
  },
  preferences: {
    newsletter: true,
    notifications: false,
    theme: "dark",
  },
  requiredFields: ["firstName", "lastName", "email"],
};

const formValidation = {
  // Check if all required fields are present and non-empty
  hasAllRequiredFields: function (data) {
    return data.requiredFields.every((field) => {
      const value = data.personalInfo[field];
      return (
        value !== undefined && value !== null && String(value).trim() !== ""
      );
    });
  },

  // Check if any preference is enabled
  hasAnyPreference: function (data) {
    return Object.values(data.preferences).some((value) => value === true);
  },

  // Validate all personal info fields meet criteria
  isValidPersonalInfo: function (data) {
    const info = data.personalInfo;

    return [
      typeof info.firstName === "string" && info.firstName.length >= 2,
      typeof info.lastName === "string" && info.lastName.length >= 2,
      typeof info.email === "string" && info.email.includes("@"),
      typeof info.age === "number" && info.age >= 18 && info.age <= 120,
    ].every((condition) => condition);
  },
};

console.log(
  "12a - Has all required fields:",
  formValidation.hasAllRequiredFields(formData)
);
console.log(
  "12b - Has any preference:",
  formValidation.hasAnyPreference(formData)
);
console.log(
  "12c - Valid personal info:",
  formValidation.isValidPersonalInfo(formData)
);

// CHALLENGE 13: Tree structure validation
// Validating hierarchical data

const fileSystem = {
  name: "root",
  type: "directory",
  children: [
    {
      name: "documents",
      type: "directory",
      children: [
        { name: "file1.txt", type: "file", size: 1024 },
        { name: "file2.pdf", type: "file", size: 2048 },
      ],
    },
    {
      name: "images",
      type: "directory",
      children: [
        { name: "photo1.jpg", type: "file", size: 5120 },
        { name: "photo2.png", type: "file", size: 3072 },
      ],
    },
    { name: "readme.txt", type: "file", size: 512 },
  ],
};

function validateFileSystem(node) {
  // Every node must have name and type
  const hasRequiredProps = node.name && node.type;

  if (node.type === "directory") {
    // Directories must have children array
    const hasChildren = Array.isArray(node.children);
    // All children must be valid
    const allChildrenValid = hasChildren
      ? node.children.every((child) => validateFileSystem(child))
      : false;

    return hasRequiredProps && hasChildren && allChildrenValid;
  } else if (node.type === "file") {
    // Files must have size
    return hasRequiredProps && typeof node.size === "number" && node.size >= 0;
  }

  return false;
}

function hasLargeFiles(node, threshold = 4000) {
  if (node.type === "file") {
    return node.size > threshold;
  }

  if (node.type === "directory" && node.children) {
    return node.children.some((child) => hasLargeFiles(child, threshold));
  }

  return false;
}

console.log("13a - Valid file system:", validateFileSystem(fileSystem));
console.log("13b - Has large files:", hasLargeFiles(fileSystem));

// CHALLENGE 14: Game state validation
// Complex game rule validation

const gameState = {
  players: [
    {
      id: 1,
      name: "Alice",
      health: 100,
      inventory: ["sword", "potion"],
      level: 5,
    },
    { id: 2, name: "Bob", health: 80, inventory: ["bow", "arrow"], level: 4 },
    { id: 3, name: "Charlie", health: 0, inventory: ["staff"], level: 3 },
  ],
  rules: {
    minPlayers: 2,
    maxPlayers: 6,
    minLevel: 1,
    maxLevel: 100,
  },
};

const gameValidation = {
  // All players must be alive to continue
  allPlayersAlive: (state) =>
    state.players.every((player) => player.health > 0),

  // At least one player must have healing items
  hasHealingSupport: (state) =>
    state.players.some(
      (player) =>
        player.inventory.includes("potion") ||
        player.inventory.includes("staff")
    ),

  // All players must be within level range
  validLevelRange: (state) =>
    state.players.every(
      (player) =>
        player.level >= state.rules.minLevel &&
        player.level <= state.rules.maxLevel
    ),

  // Player count within limits
  validPlayerCount: (state) =>
    state.players.length >= state.rules.minPlayers &&
    state.players.length <= state.rules.maxPlayers,
};

console.log(
  "14a - All players alive:",
  gameValidation.allPlayersAlive(gameState)
);
console.log(
  "14b - Has healing support:",
  gameValidation.hasHealingSupport(gameState)
);
console.log(
  "14c - Valid level range:",
  gameValidation.validLevelRange(gameState)
);
console.log(
  "14d - Valid player count:",
  gameValidation.validPlayerCount(gameState)
);

// CHALLENGE 15: Advanced utility functions
// Building sophisticated validation utilities

class ValidationUtils {
  // Check if all elements satisfy multiple conditions
  static satisfiesAll(array, ...conditions) {
    return array.every((element) =>
      conditions.every((condition) => condition(element))
    );
  }

  // Check if any element satisfies all conditions
  static anySatisfiesAll(array, ...conditions) {
    return array.some((element) =>
      conditions.every((condition) => condition(element))
    );
  }

  // Validate with detailed results
  static validateWithDetails(array, validator) {
    const results = array.map((item, index) => ({
      index,
      item,
      valid: validator(item),
      error: validator(item) ? null : "Validation failed",
    }));

    return {
      allValid: results.every((result) => result.valid),
      anyValid: results.some((result) => result.valid),
      validCount: results.filter((result) => result.valid).length,
      totalCount: results.length,
      details: results,
    };
  }

  // Conditional validation
  static validateWhen(array, condition, validator) {
    return array.every((item) => !condition(item) || validator(item));
  }
}

const products = [
  { name: "Laptop", price: 1000, category: "electronics", inStock: true },
  { name: "Book", price: 20, category: "books", inStock: false },
  { name: "Phone", price: 800, category: "electronics", inStock: true },
];

const isExpensive = (product) => product.price > 500;
const isElectronics = (product) => product.category === "electronics";
const isInStock = (product) => product.inStock;

console.log(
  "15a - All expensive electronics in stock:",
  ValidationUtils.satisfiesAll(
    products.filter(isElectronics),
    isExpensive,
    isInStock
  )
);

console.log(
  "15b - Any product satisfies all conditions:",
  ValidationUtils.anySatisfiesAll(
    products,
    isExpensive,
    isElectronics,
    isInStock
  )
);

const validation = ValidationUtils.validateWithDetails(
  products,
  (product) => product.price > 0 && product.name.length > 0
);

console.log("15c - Validation summary:", {
  allValid: validation.allValid,
  validCount: validation.validCount,
  totalCount: validation.totalCount,
});

console.log("\n=== Discussion Questions ===");
console.log(
  "1. When is every/some more efficient than filter + length checks?"
);
console.log("2. How do every/some handle sparse arrays?");
console.log(
  "3. What are the differences between some() and find() for existence checks?"
);
console.log("4. How can you use every/some for set operations?");
console.log("5. What are best practices for complex nested validations?");
