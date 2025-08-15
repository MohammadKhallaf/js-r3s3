"use strict";

console.log("=== Rest/Spread Properties Challenge ===");

// CHALLENGE 1: Object rest with complex nesting
// Extract specific properties while preserving nested structure

const complexUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  password: "secret123",
  profile: {
    bio: "Developer",
    avatar: "avatar.jpg",
    preferences: {
      theme: "dark",
      notifications: true,
      privacy: "friends",
    },
  },
  posts: [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ],
};

// Extract sensitive data, keep the rest
const { password, email, ...publicUser } = complexUser;
console.log("1a - Public user:", publicUser);
console.log("1b - Sensitive data:", { password, email });

// What about nested extraction?
const {
  profile: {
    preferences: { privacy, ...otherPrefs },
    ...otherProfile
  },
  ...userWithoutProfile
} = complexUser;

console.log("1c - Privacy setting:", privacy);
console.log("1d - Other preferences:", otherPrefs);
console.log("1e - Other profile:", otherProfile);

// CHALLENGE 2: Dynamic property exclusion
// Remove properties based on runtime conditions

function excludeProperties(obj, ...keysToExclude) {
  const result = { ...obj };
  keysToExclude.forEach((key) => delete result[key]);
  return result;
}

// Better approach with destructuring
function excludePropertiesBetter(obj, excludeKeys) {
  const { [excludeKeys[0]]: _, ...rest } = obj; // Only works for one key
  return rest;
}

// Most flexible approach
function excludePropertiesFlexible(obj, keysToExclude) {
  return Object.keys(obj).reduce((result, key) => {
    if (!keysToExclude.includes(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

const testObj = { a: 1, b: 2, c: 3, d: 4 };

console.log("2a - Exclude a,c:", excludeProperties(testObj, "a", "c"));
console.log(
  "2b - Exclude flexible:",
  excludePropertiesFlexible(testObj, ["b", "d"])
);

// CHALLENGE 3: Computed property names with rest
// Dynamic property extraction

const dynamicKey = "secret";
const anotherKey = "private";

const objWithDynamicKeys = {
  public: "everyone can see",
  secret: "hidden value",
  private: "personal data",
  normal: "regular property",
};

// Extract dynamic properties
const {
  [dynamicKey]: secretValue,
  [anotherKey]: privateValue,
  ...publicData
} = objWithDynamicKeys;

console.log("3a - Secret value:", secretValue);
console.log("3b - Private value:", privateValue);
console.log("3c - Public data:", publicData);

// CHALLENGE 4: Rest properties with undefined values
// How rest handles undefined and missing properties

const partialObject = {
  defined: "value",
  nullValue: null,
  undefinedValue: undefined,
  falseValue: false,
  zeroValue: 0,
};

const { defined, missing, ...restProps } = partialObject;

console.log("4a - Defined:", defined);
console.log("4b - Missing:", missing);
console.log("4c - Rest props:", restProps);
console.log("4d - Rest has undefined?", "undefinedValue" in restProps);

// CHALLENGE 5: Function parameter destructuring with rest
// Complex parameter patterns

function processUser({
  id,
  name,
  email = "no-email@example.com",
  ...metadata
} = {}) {
  return {
    identity: { id, name, email },
    metadata,
    hasMetadata: Object.keys(metadata).length > 0,
  };
}

console.log(
  "5a - Full object:",
  processUser({
    id: 1,
    name: "Bob",
    email: "bob@example.com",
    age: 30,
    role: "admin",
    lastLogin: "2023-01-01",
  })
);

console.log("5b - Minimal object:", processUser({ id: 2, name: "Charlie" }));
console.log("5c - No object:", processUser());

// CHALLENGE 6: Spread properties override behavior
// Understanding property override order

const defaults = { a: 1, b: 2, c: 3 };
const overrides = { b: 20, d: 4 };
const moreOverrides = { a: 100, e: 5 };

const combined1 = { ...defaults, ...overrides, ...moreOverrides };
const combined2 = { ...moreOverrides, ...defaults, ...overrides };
const combined3 = { a: 999, ...defaults, ...overrides, ...moreOverrides, f: 6 };

console.log("6a - Normal order:", combined1);
console.log("6b - Different order:", combined2);
console.log("6c - Mixed with literals:", combined3);

// CHALLENGE 7: Nested object manipulation
// Complex nested object operations

const nestedData = {
  user: {
    personal: { name: "Alice", age: 30 },
    work: { company: "TechCorp", role: "Developer" },
    settings: { theme: "dark", lang: "en" },
  },
  app: {
    version: "1.0.0",
    features: ["auth", "dashboard"],
    config: { debug: false },
  },
};

// Update nested properties immutably
function updateNestedProperty(obj, path, updates) {
  const [first, ...rest] = path;

  if (rest.length === 0) {
    return { ...obj, [first]: { ...obj[first], ...updates } };
  }

  return {
    ...obj,
    [first]: updateNestedProperty(obj[first], rest, updates),
  };
}

const updatedData = updateNestedProperty(nestedData, ["user", "personal"], {
  age: 31,
  city: "Boston",
});

console.log("7a - Original nested:", nestedData.user.personal);
console.log("7b - Updated nested:", updatedData.user.personal);
console.log("7c - Original unchanged:", nestedData.user.personal.age === 30);

// CHALLENGE 8: Conditional property spreading
// Advanced conditional spreading patterns

const createConfig = (env, options = {}) => {
  const baseConfig = { api: "/api", timeout: 5000 };

  return {
    ...baseConfig,
    ...(env === "development" && { debug: true, verbose: true }),
    ...(env === "production" && { minify: true, cache: true }),
    ...(env === "test" && { mock: true, timeout: 1000 }),
    ...options,
    ...(options.override && {
      api: options.override.api,
      timeout: options.override.timeout,
    }),
  };
};

console.log("8a - Dev config:", createConfig("development"));
console.log("8b - Prod config:", createConfig("production"));
console.log(
  "8c - With options:",
  createConfig("development", {
    cache: false,
    override: { timeout: 10000 },
  })
);

// CHALLENGE 9: Object transformation patterns
// Complex object transformation using rest/spread

function transformObject(obj, transformations) {
  return Object.entries(transformations).reduce(
    (result, [operation, config]) => {
      switch (operation) {
        case "rename":
          return Object.entries(config).reduce((acc, [oldKey, newKey]) => {
            const { [oldKey]: value, ...rest } = acc;
            return { ...rest, [newKey]: value };
          }, result);

        case "exclude":
          const excludeKeys = Array.isArray(config) ? config : [config];
          return Object.keys(result).reduce((acc, key) => {
            if (!excludeKeys.includes(key)) {
              acc[key] = result[key];
            }
            return acc;
          }, {});

        case "defaults":
          return { ...config, ...result };

        default:
          return result;
      }
    },
    { ...obj }
  );
}

const originalObj = { a: 1, b: 2, c: 3, d: 4 };
const transformed = transformObject(originalObj, {
  rename: { a: "alpha", b: "beta" },
  exclude: ["d"],
  defaults: { gamma: 5, delta: 6 },
});

console.log("9a - Original:", originalObj);
console.log("9b - Transformed:", transformed);

// CHALLENGE 10: Performance implications
// Understanding when rest/spread might be expensive

const largeObject = {};
for (let i = 0; i < 10000; i++) {
  largeObject[`prop${i}`] = i;
}

console.time("10a - Large object spread");
const { prop0, prop1, ...restLarge } = largeObject;
console.timeEnd("10a - Large object spread");

console.time("10b - Large object manual copy");
const manualCopy = {};
for (const key in largeObject) {
  if (key !== "prop0" && key !== "prop1") {
    manualCopy[key] = largeObject[key];
  }
}
console.timeEnd("10b - Large object manual copy");

console.log(
  "10c - Results equal:",
  Object.keys(restLarge).length === Object.keys(manualCopy).length
);

// CHALLENGE 11: Circular references and rest/spread
// How rest/spread handles circular references

const circularObj = { name: "circular" };
circularObj.self = circularObj;

try {
  const { name, ...rest } = circularObj;
  console.log("11a - Name:", name);
  console.log("11b - Rest has self:", "self" in rest);
  console.log("11c - Circular preserved:", rest.self === circularObj);
} catch (error) {
  console.log("11 error:", error.message);
}

// CHALLENGE 12: Getters and setters with rest/spread
// How descriptors are handled

const objWithGetters = {
  _value: 10,
  get value() {
    console.log("Getter called");
    return this._value * 2;
  },
  set value(val) {
    console.log("Setter called");
    this._value = val / 2;
  },
  normal: "normal prop",
};

const { normal, ...restWithGetters } = objWithGetters;
console.log("12a - Normal prop:", normal);
console.log("12b - Rest value:", restWithGetters.value);
console.log(
  "12c - Rest has getter?",
  Object.getOwnPropertyDescriptor(restWithGetters, "value")?.get
);

// CHALLENGE 13: Symbol properties with rest/spread
// How symbols are handled

const sym1 = Symbol("test1");
const sym2 = Symbol("test2");

const objWithSymbols = {
  normal: "normal",
  [sym1]: "symbol1",
  [sym2]: "symbol2",
};

const { normal: normalProp, ...restSymbols } = objWithSymbols;

console.log("13a - Normal extracted:", normalProp);
console.log("13b - Rest symbols:", Object.getOwnPropertySymbols(restSymbols));
console.log("13c - Symbol values:", restSymbols[sym1], restSymbols[sym2]);

// CHALLENGE 14: Real-world API response handling
// Practical use case for rest/spread properties

function processApiResponse(response) {
  const {
    data,
    pagination: { page, total, hasNext, ...paginationMeta } = {},
    meta: { timestamp, version, ...otherMeta } = {},
    ...responseHeaders
  } = response;

  return {
    content: data,
    pagination: {
      current: page,
      totalItems: total,
      hasMore: hasNext,
      ...paginationMeta,
    },
    metadata: {
      timestamp,
      apiVersion: version,
      ...otherMeta,
    },
    headers: responseHeaders,
  };
}

const apiResponse = {
  data: [{ id: 1, name: "Item 1" }],
  pagination: { page: 1, total: 100, hasNext: true, limit: 10, offset: 0 },
  meta: { timestamp: "2023-01-01", version: "v1", requestId: "abc123" },
  status: 200,
  statusText: "OK",
};

console.log("14a - Processed response:", processApiResponse(apiResponse));

// CHALLENGE 15: Building a flexible configuration system
// Advanced real-world scenario

class ConfigBuilder {
  constructor(defaults = {}) {
    this.config = { ...defaults };
  }

  merge(...configs) {
    configs.forEach((config) => {
      this.config = { ...this.config, ...config };
    });
    return this;
  }

  exclude(...keys) {
    keys.forEach((key) => {
      const { [key]: _, ...rest } = this.config;
      this.config = rest;
    });
    return this;
  }

  transform(transformFn) {
    this.config = transformFn(this.config);
    return this;
  }

  extract(...keys) {
    return keys.reduce((result, key) => {
      if (key in this.config) {
        result[key] = this.config[key];
      }
      return result;
    }, {});
  }

  build() {
    return { ...this.config };
  }
}

const configBuilder = new ConfigBuilder({
  env: "development",
  debug: true,
  port: 3000,
});

const finalConfig = configBuilder
  .merge({ database: { host: "localhost" } })
  .merge({ cache: { ttl: 300 } })
  .exclude("debug")
  .transform((config) => ({
    ...config,
    server: { port: config.port },
    port: undefined,
  }))
  .build();

console.log("15a - Final config:", finalConfig);
console.log(
  "15b - Extracted db config:",
  configBuilder.extract("database", "cache")
);

console.log("\n=== Discussion Questions ===");
console.log("1. When is object rest/spread preferable to Object.assign()?");
console.log("2. How do rest properties handle non-enumerable properties?");
console.log("3. What are the performance implications with large objects?");
console.log("4. How do rest/spread properties work with inheritance?");
console.log("5. What are common pitfalls when using nested rest/spread?");
