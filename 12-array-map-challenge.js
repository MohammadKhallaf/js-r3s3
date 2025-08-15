"use strict";

console.log("=== Array map Challenge ===");

// CHALLENGE 1: map return value requirements
// Understanding what map expects from the callback

const numbers = [1, 2, 3, 4, 5];

// What happens when callback doesn't return anything?
const undefinedResults = numbers.map((num) => {
  num * 2; // No return statement
});

console.log("1a - No return:", undefinedResults);

// What about conditional returns?
const conditionalResults = numbers.map((num) => {
  if (num > 3) {
    return num * 2;
  }
  // No return for numbers <= 3
});

console.log("1b - Conditional return:", conditionalResults);

// Correct approach
const correctResults = numbers.map((num) => {
  return num > 3 ? num * 2 : num;
});

console.log("1c - Correct conditional:", correctResults);

// CHALLENGE 2: map vs forEach - when to use which
// Understanding the fundamental differences

const products = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 800 },
  { name: "Tablet", price: 600 },
];

// WRONG: Using map for side effects
console.log("2a - Wrong map usage:");
const mapSideEffect = products.map((product) => {
  console.log(`Processing ${product.name}`); // Side effect
  return product.name; // But we're returning something
});

// CORRECT: Use forEach for side effects
console.log("2b - Correct forEach for side effects:");
products.forEach((product) => {
  console.log(`Logging ${product.name}`);
});

// CORRECT: Use map for transformation
console.log("2c - Correct map for transformation:");
const productNames = products.map((product) => product.name);
console.log("Product names:", productNames);

// CHALLENGE 3: Complex object transformations
// Advanced mapping patterns

const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    roles: ["user", "admin"],
    profile: { age: 30, city: "Boston" },
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    roles: ["user"],
    profile: { age: 25, city: "New York" },
  },
];

// Transform to different structure
const transformedUsers = users.map((user) => ({
  id: user.id,
  fullName: `${user.firstName} ${user.lastName}`,
  contact: user.email,
  isAdmin: user.roles.includes("admin"),
  location: user.profile.city,
  displayAge: `${user.profile.age} years old`,
  roleCount: user.roles.length,
}));

console.log("3a - Transformed users:", transformedUsers);

// CHALLENGE 4: map with different data types
// How map behaves with various input types

const mixedArray = [1, "2", null, undefined, [], {}, true, false];

const typeTransformed = mixedArray.map((item, index) => ({
  originalValue: item,
  type: typeof item,
  index,
  isArray: Array.isArray(item),
  isTruthy: !!item,
  stringified: String(item),
}));

console.log("4a - Type transformation:", typeTransformed);

// CHALLENGE 5: map with async operations (common mistake)
// Why map doesn't work well with async

async function fetchUserDetails(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}`, details: "fetched" });
    }, Math.random() * 100);
  });
}

const userIds = [1, 2, 3, 4, 5];

// WRONG: This returns promises, not resolved values
console.log("5a - Wrong async map:");
const wrongAsyncMap = userIds.map(async (id) => {
  return await fetchUserDetails(id);
});

console.log("Wrong result type:", wrongAsyncMap); // Array of Promises

// CORRECT: Use Promise.all with map
console.log("5b - Correct async map:");
Promise.all(userIds.map((id) => fetchUserDetails(id))).then((users) => {
  console.log("Correct async result:", users);
});

// CHALLENGE 6: Chaining map operations
// Multiple transformations

const rawData = ["  john doe  ", "  JANE SMITH  ", "  bob johnson  "];

const processedNames = rawData
  .map((name) => name.trim()) // Remove whitespace
  .map((name) => name.toLowerCase()) // Convert to lowercase
  .map((name) => name.split(" ")) // Split into parts
  .map((parts) =>
    parts.map(
      (
        part // Capitalize each part
      ) => part.charAt(0).toUpperCase() + part.slice(1)
    )
  )
  .map((parts) => parts.join(" ")); // Join back together

console.log("6a - Chained transformations:", processedNames);

// More efficient single map
const efficientProcessed = rawData.map((name) => {
  return name
    .trim()
    .toLowerCase()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
});

console.log("6b - Single map transformation:", efficientProcessed);

// CHALLENGE 7: map with index and array parameters
// Using all callback parameters effectively

const items = ["a", "b", "c", "d", "e"];

const indexAwareMap = items.map((item, index, array) => ({
  value: item,
  position: index,
  isFirst: index === 0,
  isLast: index === array.length - 1,
  next: array[index + 1] || null,
  previous: array[index - 1] || null,
  totalItems: array.length,
}));

console.log("7a - Index aware mapping:", indexAwareMap);

// CHALLENGE 8: map with sparse arrays
// Understanding how map handles holes in arrays

const sparseArray = [1, , 3, , 5, , 7];
const denseArray = [1, undefined, 3, undefined, 5, undefined, 7];

console.log("8a - Sparse array:", sparseArray);
console.log("8b - Dense array:", denseArray);

const sparseResult = sparseArray.map((x) => x * 2);
const denseResult = denseArray.map((x) => x * 2);

console.log("8c - Sparse result:", sparseResult);
console.log("8d - Dense result:", denseResult);

// CHALLENGE 9: Performance considerations
// When map might not be the best choice

const largeArray = Array.from({ length: 100000 }, (_, i) => i);

console.time("9a - map performance");
const mappedResult = largeArray.map((x) => x * 2);
console.timeEnd("9a - map performance");

console.time("9b - for loop performance");
const forResult = [];
for (let i = 0; i < largeArray.length; i++) {
  forResult[i] = largeArray[i] * 2;
}
console.timeEnd("9b - for loop performance");

console.time("9c - for...of performance");
const forOfResult = [];
for (const [index, value] of largeArray.entries()) {
  forOfResult[index] = value * 2;
}
console.timeEnd("9c - for...of performance");

console.log(
  "Results equal length:",
  mappedResult.length === forResult.length &&
    forResult.length === forOfResult.length
);

// CHALLENGE 10: map with this binding
// Understanding thisArg parameter

const processor = {
  multiplier: 10,
  prefix: "Result: ",

  processNumbers: function (numbers) {
    // Without thisArg - 'this' is undefined in strict mode
    const withoutThis = numbers.map(function (num) {
      return num * 2; // Can't use this.multiplier
    });

    // With thisArg
    const withThis = numbers.map(function (num) {
      return this.prefix + num * this.multiplier;
    }, this);

    // Arrow function (ignores thisArg)
    const withArrow = numbers.map((num) => {
      return this.prefix + num * this.multiplier;
    });

    return { withoutThis, withThis, withArrow };
  },
};

const testNumbers = [1, 2, 3];
const thisResults = processor.processNumbers(testNumbers);
console.log("10a - Without this:", thisResults.withoutThis);
console.log("10b - With this binding:", thisResults.withThis);
console.log("10c - With arrow function:", thisResults.withArrow);

// CHALLENGE 11: map creating different array lengths
// When map doesn't preserve array length (advanced cases)

const nestedData = [[1, 2], [3, 4, 5], [6]];

// This preserves length but creates nested structure
const nestedMap = nestedData.map((subArray) => subArray.map((num) => num * 2));

console.log("11a - Nested map:", nestedMap);

// Use flatMap for flattening
const flatMapped = nestedData.flatMap((subArray) =>
  subArray.map((num) => num * 2)
);

console.log("11b - Flat mapped:", flatMapped);

// CHALLENGE 12: Error handling in map
// Proper error handling patterns

const riskyData = [1, "2", null, undefined, {}, 4];

// Map with error handling
const safeMap = riskyData.map((item, index) => {
  try {
    if (typeof item === "number") {
      return item * 2;
    } else if (typeof item === "string") {
      const num = parseFloat(item);
      if (isNaN(num)) {
        throw new Error(`Invalid string: ${item}`);
      }
      return num * 2;
    } else {
      throw new Error(`Cannot process ${typeof item}`);
    }
  } catch (error) {
    console.log(`Error at index ${index}:`, error.message);
    return null; // Or some default value
  }
});

console.log("12a - Safe map result:", safeMap);

// Filter out errors and map
const filterAndMap = riskyData
  .filter((item) => typeof item === "number")
  .map((item) => item * 2);

console.log("12b - Filter then map:", filterAndMap);

// CHALLENGE 13: Custom map implementation
// Understanding map by implementing it

Array.prototype.customMap = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const result = [];
  const len = this.length;

  for (let i = 0; i < len; i++) {
    // Handle sparse arrays - only process existing elements
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
    // For sparse arrays, leave holes in result
  }

  return result;
};

const testArray = [1, , 3, 4];
const customResult = testArray.customMap((x) => x * 2);
const nativeResult = testArray.map((x) => x * 2);

console.log("13a - Custom map:", customResult);
console.log("13b - Native map:", nativeResult);
console.log(
  "13c - Results equal:",
  JSON.stringify(customResult) === JSON.stringify(nativeResult)
);

// CHALLENGE 14: Advanced transformation patterns
// Complex real-world mapping scenarios

const salesData = [
  {
    id: 1,
    date: "2023-01-15",
    customer: { name: "Alice", tier: "gold" },
    items: [
      { product: "laptop", price: 1000, quantity: 1 },
      { product: "mouse", price: 25, quantity: 2 },
    ],
  },
  {
    id: 2,
    date: "2023-01-16",
    customer: { name: "Bob", tier: "silver" },
    items: [{ product: "keyboard", price: 75, quantity: 1 }],
  },
];

const salesSummary = salesData.map((sale) => {
  const total = sale.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = sale.items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const discount =
    sale.customer.tier === "gold"
      ? 0.1
      : sale.customer.tier === "silver"
      ? 0.05
      : 0;

  return {
    saleId: sale.id,
    date: new Date(sale.date),
    customerName: sale.customer.name,
    customerTier: sale.customer.tier,
    itemCount,
    subtotal: total,
    discount: total * discount,
    total: total * (1 - discount),
    items: sale.items.map((item) => ({
      name: item.product,
      lineTotal: item.price * item.quantity,
    })),
  };
});

console.log("14a - Sales summary:", salesSummary);

// CHALLENGE 15: Map utility functions
// Building useful map utilities

class MapUtils {
  // Map with retry logic for transformations that might fail
  static mapWithRetry(array, transform, maxRetries = 3) {
    return array.map((item, index) => {
      let attempts = 0;

      while (attempts <= maxRetries) {
        try {
          return transform(item, index);
        } catch (error) {
          attempts++;
          if (attempts > maxRetries) {
            console.log(
              `Failed to transform item at index ${index} after ${maxRetries} retries`
            );
            return null;
          }
        }
      }
    });
  }

  // Map with conditional transformation
  static mapWhere(array, predicate, transform, defaultTransform = (x) => x) {
    return array.map((item, index) => {
      return predicate(item, index)
        ? transform(item, index)
        : defaultTransform(item, index);
    });
  }

  // Map with progress callback
  static mapWithProgress(array, transform, progressCallback) {
    return array.map((item, index) => {
      const result = transform(item, index);

      if (
        progressCallback &&
        (index + 1) % Math.ceil(array.length / 10) === 0
      ) {
        progressCallback({
          current: index + 1,
          total: array.length,
          percentage: Math.round(((index + 1) / array.length) * 100),
        });
      }

      return result;
    });
  }

  // Map that groups results
  static mapAndGroup(array, keyFn, valueFn) {
    const grouped = new Map();

    array.map((item, index) => {
      const key = keyFn(item, index);
      const value = valueFn(item, index);

      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key).push(value);
    });

    return grouped;
  }
}

// Test the utilities
const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("15a - Map where even numbers doubled:");
const conditionalMap = MapUtils.mapWhere(
  testData,
  (num) => num % 2 === 0,
  (num) => num * 2,
  (num) => num
);
console.log(conditionalMap);

console.log("15b - Map with progress:");
MapUtils.mapWithProgress(
  testData,
  (num) => num ** 2,
  (progress) => console.log(`Progress: ${progress.percentage}%`)
);

console.log("15c - Map and group by odd/even:");
const grouped = MapUtils.mapAndGroup(
  testData,
  (num) => (num % 2 === 0 ? "even" : "odd"),
  (num) => num * 2
);
console.log("Grouped results:", Object.fromEntries(grouped));

console.log("\n=== Discussion Questions ===");
console.log("1. When should you use map vs forEach vs for loops?");
console.log("2. Why is it important that map callbacks return a value?");
console.log("3. How does map handle sparse arrays differently than forEach?");
console.log(
  "4. What are the performance implications of chaining multiple maps?"
);
console.log("5. How do you handle errors in map transformations?");
