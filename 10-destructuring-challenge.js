"use strict";

console.log("=== Destructuring Challenge ===");

// CHALLENGE 1: Complex nested destructuring
// Extract values from deeply nested structures

const complexData = {
  user: {
    id: 1,
    profile: {
      name: { first: "John", last: "Doe" },
      address: {
        home: { street: "123 Main St", city: "Boston", zip: "02101" },
        work: { street: "456 Work Ave", city: "Cambridge", zip: "02139" },
      },
    },
    preferences: {
      notifications: { email: true, sms: false, push: true },
      privacy: { profile: "public", posts: "friends" },
    },
  },
  posts: [
    {
      id: 1,
      title: "First Post",
      tags: ["js", "react"],
      author: { name: "John" },
    },
    {
      id: 2,
      title: "Second Post",
      tags: ["node", "express"],
      author: { name: "John" },
    },
  ],
};

// Extract multiple nested values in one operation
const {
  user: {
    id: userId,
    profile: {
      name: { first: firstName, last: lastName },
      address: {
        home: { city: homeCity, zip: homeZip },
        work: { city: workCity },
      },
    },
    preferences: {
      notifications: { email: emailNotif, sms: smsNotif },
      privacy: { profile: profilePrivacy },
    },
  },
  posts: [
    {
      title: firstPostTitle,
      tags: [firstTag, secondTag],
    },
    {
      title: secondPostTitle,
      author: { name: secondPostAuthor },
    },
  ],
} = complexData;

console.log("1a - User info:", {
  userId,
  firstName,
  lastName,
  homeCity,
  workCity,
});
console.log("1b - Notifications:", { emailNotif, smsNotif, profilePrivacy });
console.log("1c - Posts:", {
  firstPostTitle,
  firstTag,
  secondTag,
  secondPostTitle,
  secondPostAuthor,
});

// CHALLENGE 2: Destructuring with computed property names
// Dynamic property extraction

const dynamicKeys = {
  userKey: "currentUser",
  settingsKey: "userSettings",
  dataKey: "appData",
};

const appState = {
  currentUser: { name: "Alice", role: "admin" },
  userSettings: { theme: "dark", lang: "en" },
  appData: { version: "1.0", lastUpdate: "2023-01-01" },
  otherData: "not needed",
};

// Extract using computed property names
const {
  [dynamicKeys.userKey]: currentUser,
  [dynamicKeys.settingsKey]: settings,
  [dynamicKeys.dataKey]: { version, lastUpdate },
} = appState;

console.log("2a - Dynamic extraction:", {
  currentUser,
  settings,
  version,
  lastUpdate,
});

// CHALLENGE 3: Destructuring function parameters edge cases
// Complex parameter destructuring scenarios

function complexFunction({
  id,
  name = "Unknown",
  config: {
    api: { endpoint = "/api", timeout = 5000 } = {},
    ui: { theme = "light", lang = "en" } = {},
  } = {},
  features = [],
  ...metadata
} = {}) {
  return {
    id,
    name,
    endpoint,
    timeout,
    theme,
    lang,
    features,
    metadata,
  };
}

console.log(
  "3a - Full object:",
  complexFunction({
    id: 1,
    name: "Test",
    config: {
      api: { endpoint: "/v2/api", timeout: 10000 },
      ui: { theme: "dark" },
    },
    features: ["auth", "dashboard"],
    extra: "data",
    more: "info",
  })
);

console.log(
  "3b - Partial object:",
  complexFunction({
    id: 2,
    config: { ui: { lang: "fr" } },
    features: ["basic"],
  })
);

console.log("3c - Empty object:", complexFunction());

// CHALLENGE 4: Array destructuring with holes and patterns
// Advanced array destructuring patterns

const irregularArray = [1, [2, 3], , 4, [5, [6, 7]], 8, , 10];

// Skip elements and destructure nested arrays
const [
  first,
  [second, third], // skip undefined element
  ,
  fourth,
  [fifth, [sixth, seventh]],
  eighth, // skip another undefined
  ,
  tenth,
] = irregularArray;

console.log("4a - Irregular array:", {
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
  eighth,
  tenth,
});

// Destructuring with rest in middle (not allowed, but alternative)
const [head, ...tail] = irregularArray;
const middle = tail.slice(0, -2);
const [, penultimate, last] = tail.slice(-3);

console.log("4b - Head and tail:", { head, middle, penultimate, last });

// CHALLENGE 5: Mixed destructuring with arrays and objects
// Complex mixed structures

const mixedData = [
  { type: "user", data: { name: "Alice", age: 30 } },
  { type: "post", data: { title: "Hello World", views: 100 } },
  [1, 2, { nested: "value" }],
  "simple string",
];

const [
  {
    type: userType,
    data: { name: userName, age: userAge },
  },
  {
    type: postType,
    data: { title: postTitle, views: postViews },
  },
  [num1, num2, { nested: nestedValue }],
  simpleString,
] = mixedData;

console.log("5a - Mixed destructuring:", {
  userType,
  userName,
  userAge,
  postType,
  postTitle,
  postViews,
  num1,
  num2,
  nestedValue,
  simpleString,
});

// CHALLENGE 6: Destructuring with default functions
// Default values that are function calls

let callCount = 0;

function getDefaultValue(type) {
  callCount++;
  console.log(`Getting default for ${type}, call #${callCount}`);
  return `default-${type}`;
}

function testDefaults({
  name = getDefaultValue("name"),
  email = getDefaultValue("email"),
  role = getDefaultValue("role"),
} = {}) {
  return { name, email, role };
}

console.log("6a - No object:", testDefaults());
console.log("6b - Partial object:", testDefaults({ name: "Alice" }));
console.log(
  "6c - Full object:",
  testDefaults({ name: "Bob", email: "bob@test.com", role: "admin" })
);

// CHALLENGE 7: Destructuring assignment (not declaration)
// Using destructuring to reassign existing variables

let a = 1,
  b = 2,
  c = 3;
let obj = { x: 10, y: 20, z: 30 };

// Array destructuring assignment
[a, b, c] = [100, 200, 300];
console.log("7a - Array reassignment:", { a, b, c });

// Object destructuring assignment with renaming
({ x: a, y: b, z: c } = obj);
console.log("7b - Object reassignment:", { a, b, c });

// Swapping with destructuring
[a, b] = [b, a];
console.log("7c - After swap:", { a, b });

// CHALLENGE 8: Destructuring in loops
// Various loop destructuring patterns

const arrayOfArrays = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const arrayOfObjects = [
  { name: "Alice", score: 95 },
  { name: "Bob", score: 87 },
  { name: "Charlie", score: 92 },
];

const mapData = new Map([
  ["key1", { value: 100, type: "A" }],
  ["key2", { value: 200, type: "B" }],
  ["key3", { value: 300, type: "C" }],
]);

console.log("8a - Array of arrays:");
for (const [x, y] of arrayOfArrays) {
  console.log(`Pair: ${x}, ${y}`);
}

console.log("8b - Array of objects:");
for (const { name, score } of arrayOfObjects) {
  console.log(`${name}: ${score}`);
}

console.log("8c - Map entries:");
for (const [key, { value, type }] of mapData) {
  console.log(`${key}: ${value} (${type})`);
}

// CHALLENGE 9: Destructuring with regex matches
// Destructuring regex results

const emailRegex = /^([^@]+)@([^.]+)\.(.+)$/;
const email = "user@example.com";
const match = email.match(emailRegex);

if (match) {
  const [fullMatch, username, domain, tld] = match;
  console.log("9a - Email parts:", { fullMatch, username, domain, tld });
}

// More complex regex with named groups (ES2018)
const urlRegex = /^(https?):\/\/([^\/]+)(\/.*)?$/;
const url = "https://api.example.com/v1/users";
const urlMatch = url.match(urlRegex);

if (urlMatch) {
  const [, protocol, host, path = "/"] = urlMatch;
  console.log("9b - URL parts:", { protocol, host, path });
}

// CHALLENGE 10: Error handling with destructuring
// Safe destructuring patterns

function safeDestructure(data) {
  try {
    const {
      user: { profile: { name = "Unknown" } = {} } = {},
      settings: { theme = "default" } = {},
    } = data || {};

    return { name, theme, success: true };
  } catch (error) {
    console.log("Destructuring error:", error.message);
    return { name: "Error", theme: "default", success: false };
  }
}

console.log(
  "10a - Valid data:",
  safeDestructure({
    user: { profile: { name: "Alice" } },
    settings: { theme: "dark" },
  })
);

console.log(
  "10b - Invalid data:",
  safeDestructure({
    user: null,
    settings: { theme: "light" },
  })
);

console.log("10c - No data:", safeDestructure(null));

// CHALLENGE 11: Destructuring with classes and prototypes
// How destructuring works with instances

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.id = Math.random();
  }

  getInfo() {
    return `${this.name} (${this.email})`;
  }

  get displayName() {
    return this.name.toUpperCase();
  }
}

const user = new User("Alice", "alice@example.com");
user.role = "admin"; // Add property after creation

const { name, email, id, role, getInfo } = user;
console.log("11a - Destructured from instance:", { name, email, id, role });
console.log("11b - Method still works?", typeof getInfo === "function");

try {
  console.log("11c - Method execution:", getInfo()); // Will this work?
} catch (error) {
  console.log("11c - Method error:", error.message);
}

// Proper way to preserve method context
const { getInfo: boundGetInfo } = user;
const properGetInfo = user.getInfo.bind(user);
console.log("11d - Bound method:", properGetInfo());

// CHALLENGE 12: Destructuring performance
// Understanding performance implications

const largeObject = {};
for (let i = 0; i < 10000; i++) {
  largeObject[`prop${i}`] = i;
}

console.time("12a - Destructure many properties");
const {
  prop0,
  prop1,
  prop2,
  prop3,
  prop4,
  prop5,
  prop6,
  prop7,
  prop8,
  prop9,
  ...restProps
} = largeObject;
console.timeEnd("12a - Destructure many properties");

console.time("12b - Direct property access");
const direct0 = largeObject.prop0;
const direct1 = largeObject.prop1;
const direct2 = largeObject.prop2;
const direct3 = largeObject.prop3;
const direct4 = largeObject.prop4;
const direct5 = largeObject.prop5;
const direct6 = largeObject.prop6;
const direct7 = largeObject.prop7;
const direct8 = largeObject.prop8;
const direct9 = largeObject.prop9;
console.timeEnd("12b - Direct property access");

// CHALLENGE 13: Advanced destructuring utilities
// Create utilities that leverage destructuring

class DestructureUtils {
  // Extract specific paths from nested objects
  static extract(obj, paths) {
    return paths.reduce((result, path) => {
      const keys = path.split(".");
      let current = obj;

      for (const key of keys) {
        current = current?.[key];
        if (current === undefined) break;
      }

      result[path] = current;
      return result;
    }, {});
  }

  // Safe property access with default fallback
  static safeGet(obj, path, defaultValue = null) {
    try {
      return (
        path.split(".").reduce((current, key) => current[key], obj) ??
        defaultValue
      );
    } catch {
      return defaultValue;
    }
  }

  // Rename properties during destructuring
  static rename(obj, mapping) {
    return Object.entries(mapping).reduce((result, [oldKey, newKey]) => {
      if (oldKey in obj) {
        result[newKey] = obj[oldKey];
      }
      return result;
    }, {});
  }
}

const testData = {
  user: { profile: { name: "Alice", settings: { theme: "dark" } } },
  app: { version: "1.0" },
};

console.log(
  "13a - Extract paths:",
  DestructureUtils.extract(testData, [
    "user.profile.name",
    "user.profile.settings.theme",
    "app.version",
    "missing.path",
  ])
);

console.log(
  "13b - Safe get:",
  DestructureUtils.safeGet(testData, "user.profile.name")
);
console.log(
  "13c - Safe get missing:",
  DestructureUtils.safeGet(testData, "missing.path", "default")
);

console.log(
  "13d - Rename properties:",
  DestructureUtils.rename(testData.user.profile, {
    name: "userName",
    settings: "userSettings",
  })
);

// CHALLENGE 14: Destructuring in async contexts
// How destructuring works with promises and async/await

async function fetchUserData() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: "Alice" },
        permissions: ["read", "write"],
        settings: { theme: "dark" },
      });
    }, 100);
  });
}

async function processUserData() {
  try {
    const {
      user: { id, name },
      permissions,
      settings: { theme },
    } = await fetchUserData();

    console.log("14a - Async destructuring:", { id, name, permissions, theme });
  } catch (error) {
    console.log("14a - Async error:", error.message);
  }
}

processUserData();

// CHALLENGE 15: Real-world API response processing
// Complex real-world destructuring scenario

function processApiResponse(response) {
  const {
    data: {
      users = [],
      pagination: {
        page = 1,
        totalPages = 1,
        hasNext = false,
        ...paginationRest
      } = {},
      filters: { active = null, role = null, ...otherFilters } = {},
      ...dataRest
    } = {},
    meta: { requestId, timestamp, version = "unknown", ...metaRest } = {},
    errors = [],
    ...responseRest
  } = response;

  // Process users with destructuring
  const processedUsers = users.map(
    ({ id, profile: { name, email } = {}, permissions = [], ...userRest }) => ({
      id,
      name: name || "Unknown",
      email: email || "no-email",
      permissionCount: permissions.length,
      hasExtraData: Object.keys(userRest).length > 0,
    })
  );

  return {
    users: processedUsers,
    pagination: { page, totalPages, hasNext, ...paginationRest },
    filters: { active, role, ...otherFilters },
    meta: { requestId, timestamp, version, ...metaRest },
    hasErrors: errors.length > 0,
    errorCount: errors.length,
  };
}

const mockApiResponse = {
  data: {
    users: [
      {
        id: 1,
        profile: { name: "Alice", email: "alice@test.com" },
        permissions: ["read", "write"],
      },
      { id: 2, profile: { name: "Bob" }, permissions: ["read"], extra: "data" },
      { id: 3, permissions: [] },
    ],
    pagination: { page: 1, totalPages: 5, hasNext: true, limit: 10 },
    filters: { active: true, role: "user", department: "engineering" },
  },
  meta: { requestId: "abc123", timestamp: "2023-01-01", version: "v2" },
  errors: [],
};

console.log(
  "15a - Processed API response:",
  processApiResponse(mockApiResponse)
);

console.log("\n=== Discussion Questions ===");
console.log(
  "1. When does destructuring improve code readability vs make it worse?"
);
console.log("2. What are the performance implications of deep destructuring?");
console.log("3. How do you handle destructuring errors gracefully?");
console.log(
  "4. When should you use destructuring vs traditional property access?"
);
console.log("5. How does destructuring work with TypeScript for type safety?");
