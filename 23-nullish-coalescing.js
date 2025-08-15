"use strict";

console.log("=== Nullish Coalescing Operator (??) ===");

// Nullish coalescing operator (??) - ES2020
// Returns right side when left side is null or undefined
// Unlike || operator, it doesn't treat falsy values like 0, false, "" as nullish

// Basic examples
const value1 = null ?? "default";
const value2 = undefined ?? "default";
const value3 = "actual value" ?? "default";

console.log("null ?? 'default':", value1); // "default"
console.log("undefined ?? 'default':", value2); // "default"
console.log("'actual value' ?? 'default':", value3); // "actual value"

// Comparison with logical OR (||)
console.log("\n?? vs || operator:");

const testValues = [null, undefined, 0, false, "", "hello", NaN];

testValues.forEach((val) => {
  const orResult = val || "default";
  const nullishResult = val ?? "default";
  console.log(
    `Value: ${val}, || result: "${orResult}", ?? result: "${nullishResult}"`
  );
});

// Common use cases
console.log("\nCommon use cases:");

// 1. Default function parameters with 0 being valid
function setVolume(volume) {
  // Wrong: volume || 50 would use 50 when volume is 0
  // Correct: volume ?? 50 allows 0 as valid volume
  const actualVolume = volume ?? 50;
  console.log(`Volume set to: ${actualVolume}`);
  return actualVolume;
}

setVolume(0); // Should be 0, not 50
setVolume(null); // Should be 50
setVolume(25); // Should be 25
setVolume(); // Should be 50 (undefined)

// 2. Configuration objects
const userConfig = {
  theme: "dark",
  autoSave: false,
  volume: 0,
  // notifications: undefined (missing property)
};

const defaultConfig = {
  theme: "light",
  autoSave: true,
  volume: 50,
  notifications: true,
};

// Using ?? to merge configs while preserving falsy values
const finalConfig = {
  theme: userConfig.theme ?? defaultConfig.theme,
  autoSave: userConfig.autoSave ?? defaultConfig.autoSave,
  volume: userConfig.volume ?? defaultConfig.volume,
  notifications: userConfig.notifications ?? defaultConfig.notifications,
};

console.log("User config:", userConfig);
console.log("Final config:", finalConfig);

// 3. API response handling
function processApiResponse(response) {
  const data = response?.data ?? {};
  const message = response?.message ?? "No message provided";
  const status = response?.status ?? 500;
  const success = response?.success ?? false;

  return { data, message, status, success };
}

const apiResponse1 = {
  data: { users: [] },
  message: "", // Empty string should be preserved
  status: 200,
  success: true,
};

const apiResponse2 = {
  data: null, // Should use default
  // message missing - should use default
  status: 0, // 0 should be preserved
  success: false, // false should be preserved
};

console.log("API Response 1 processed:", processApiResponse(apiResponse1));
console.log("API Response 2 processed:", processApiResponse(apiResponse2));

// Nullish coalescing assignment (??=) - ES2021
console.log("\n??= Nullish coalescing assignment:");

let config = {
  apiUrl: null,
  timeout: undefined,
  debug: false,
  retries: 0,
};

// ??= only assigns if the left side is nullish
config.apiUrl ??= "https://api.default.com";
config.timeout ??= 5000;
config.debug ??= true; // Won't assign because false is not nullish
config.retries ??= 3; // Won't assign because 0 is not nullish
config.newProp ??= "new"; // Will assign because property doesn't exist (undefined)

console.log("Config after ??= assignments:", config);

// Chaining nullish coalescing
console.log("\nChaining ?? operators:");

function getUserName(user) {
  return (
    user?.profile?.firstName ??
    user?.name ??
    user?.email?.split("@")[0] ??
    "Anonymous"
  );
}

const users = [
  {
    profile: { firstName: "Alice" },
    name: "Alice Smith",
    email: "alice@example.com",
  },
  { name: "Bob Johnson", email: "bob@example.com" },
  { email: "charlie@example.com" },
  { id: 123 },
  null,
];

users.forEach((user, index) => {
  console.log(`User ${index}:`, getUserName(user));
});

// Working with arrays
console.log("\nWorking with arrays:");

function processItems(items) {
  const validItems = items ?? [];
  const firstItem = validItems[0] ?? "No items";
  const count = validItems.length ?? 0;

  return { firstItem, count, items: validItems };
}

console.log("Null items:", processItems(null));
console.log("Empty array:", processItems([]));
console.log("Valid items:", processItems(["a", "b", "c"]));

// Form validation with defaults
console.log("\nForm validation:");

function validateForm(formData) {
  const errors = [];

  const name = formData?.name ?? "";
  const age = formData?.age ?? null;
  const email = formData?.email ?? "";
  const newsletter = formData?.newsletter ?? false;

  if (!name.trim()) errors.push("Name is required");
  if (age === null) errors.push("Age is required");
  if (!email.includes("@")) errors.push("Valid email is required");

  return {
    valid: errors.length === 0,
    errors,
    data: { name, age, email, newsletter },
  };
}

const formData1 = {
  name: "John",
  age: 0, // 0 is valid age
  email: "john@example.com",
  newsletter: false, // false is valid choice
};

const formData2 = {
  name: null, // Invalid
  age: undefined, // Invalid
  email: "", // Invalid
  // newsletter missing - should default to false
};

console.log("Form 1 validation:", validateForm(formData1));
console.log("Form 2 validation:", validateForm(formData2));

// Environment variables simulation
console.log("\nEnvironment variables:");

function getConfig() {
  // Simulating process.env
  const env = {
    PORT: "0", // 0 should be preserved
    DEBUG: "", // Empty string should be preserved
    API_URL: undefined, // Should use default
    // TIMEOUT missing    // Should use default
  };

  return {
    port: parseInt(env.PORT ?? "3000"),
    debug: env.DEBUG ?? "false",
    apiUrl: env.API_URL ?? "http://localhost:8080",
    timeout: parseInt(env.TIMEOUT ?? "30000"),
  };
}

console.log("Environment config:", getConfig());

// Performance consideration
console.log("\nPerformance note:");

// ?? is more efficient than complex checks
function slowCheck(value) {
  return value !== null && value !== undefined ? value : "default";
}

function fastCheck(value) {
  return value ?? "default";
}

const testValue = 0;
console.log("Slow check:", slowCheck(testValue));
console.log("Fast check:", fastCheck(testValue));

// Edge cases
console.log("\nEdge cases:");

const edgeCases = [
  { val: 0, desc: "zero" },
  { val: false, desc: "false" },
  { val: "", desc: "empty string" },
  { val: NaN, desc: "NaN" },
  { val: null, desc: "null" },
  { val: undefined, desc: "undefined" },
];

edgeCases.forEach(({ val, desc }) => {
  console.log(`${desc}: ${val} ?? "default" = "${val ?? "default"}"`);
});

// Common patterns
console.log("\nCommon patterns:");

// 1. Fallback chain
const getApiUrl = (userUrl, configUrl, envUrl) =>
  userUrl ?? configUrl ?? envUrl ?? "https://api.fallback.com";

// 2. Object property access with fallback
const getNestedValue = (obj, ...keys) => {
  let current = obj;
  for (const key of keys) {
    current = current?.[key];
    if (current === null || current === undefined) break;
  }
  return current ?? null;
};

const data = {
  user: {
    profile: {
      settings: {
        theme: "dark",
      },
    },
  },
};

console.log(
  "Nested value:",
  getNestedValue(data, "user", "profile", "settings", "theme")
);
console.log(
  "Missing nested value:",
  getNestedValue(data, "user", "profile", "missing", "theme")
);

// 3. Array element access
const safeArrayAccess = (arr, index) => arr?.[index] ?? null;

const numbers = [1, 2, 3];
console.log("Safe array access [1]:", safeArrayAccess(numbers, 1));
console.log("Safe array access [10]:", safeArrayAccess(numbers, 10));
console.log("Safe array access on null:", safeArrayAccess(null, 0));
