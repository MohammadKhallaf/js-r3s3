"use strict";

console.log("=== Default Parameters Challenge ===");

// CHALLENGE 1: Basic default behavior
// Predict when defaults are used vs not used

function challenge1(a = "default", b = "backup") {
  return { a, b };
}

console.log("1a - No args:", challenge1());
console.log("1b - One arg:", challenge1("first"));
console.log("1c - Both args:", challenge1("first", "second"));
console.log("1d - Undefined arg:", challenge1(undefined, "second"));
console.log("1e - Null arg:", challenge1(null, "second"));
console.log("1f - Empty string:", challenge1("", "second"));
console.log("1g - Zero:", challenge1(0, "second"));
console.log("1h - False:", challenge1(false, "second"));

// CHALLENGE 2: Expression evaluation timing
// When are default parameter expressions evaluated?

let counter = 0;

function incrementCounter() {
  return ++counter;
}

function challenge2(a = incrementCounter()) {
  return a;
}

console.log("2a - First call:", challenge2());
console.log("2b - Second call:", challenge2());
console.log("2c - With argument:", challenge2(100));
console.log("2d - Third call no arg:", challenge2());
console.log("2e - Counter value:", counter);

// CHALLENGE 3: Default parameters accessing other parameters
// Complex parameter dependencies

function challenge3(a, b = a * 2, c = a + b) {
  return { a, b, c };
}

console.log("3a - Only first param:", challenge3(5));
console.log("3b - First two params:", challenge3(5, 10));
console.log("3c - All params:", challenge3(5, 10, 20));

// What about this case?
function challenge3b(a = b, b = 1) {
  return { a, b };
}

try {
  console.log("3d - Forward reference:", challenge3b());
} catch (error) {
  console.log("3d error:", error.name);
}

// CHALLENGE 4: Temporal Dead Zone with defaults
// Default parameters and TDZ interactions

function challenge4(a = getValue(), b = 10) {
  function getValue() {
    return b * 2; // Can this access 'b' parameter?
  }

  return { a, b };
}

try {
  console.log("4a - TDZ test:", challenge4());
} catch (error) {
  console.log("4a error:", error.name);
}

// Different order
function challenge4b(a = 10, b = getValue()) {
  function getValue() {
    return a * 2; // What about this?
  }

  return { a, b };
}

try {
  console.log("4b - Different order:", challenge4b());
} catch (error) {
  console.log("4b error:", error.name);
}

// CHALLENGE 5: Function expressions as defaults
// Using complex expressions as default values

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

function challenge5(
  url = config.apiUrl,
  timeout = config.timeout,
  retries = Math.floor(timeout / 1000),
  headers = { "Content-Type": "application/json" }
) {
  return { url, timeout, retries, headers };
}

console.log("5a - All defaults:", challenge5());

// Modify config and test again
config.timeout = 10000;
console.log("5b - Modified config:", challenge5());

// CHALLENGE 6: Destructuring with defaults
// Complex destructuring default patterns

function challenge6({
  name = "Anonymous",
  age = 0,
  address: { street = "Unknown Street", city = "Unknown City" } = {},
  hobbies = ["reading"],
} = {}) {
  return { name, age, street, city, hobbies };
}

console.log("6a - No arguments:", challenge6());
console.log("6b - Partial object:", challenge6({ name: "Alice" }));
console.log(
  "6c - Partial address:",
  challenge6({
    name: "Bob",
    address: { street: "123 Main St" },
  })
);
console.log(
  "6d - Complete object:",
  challenge6({
    name: "Charlie",
    age: 30,
    address: { street: "456 Oak Ave", city: "Boston" },
    hobbies: ["gaming", "cooking"],
  })
);

// CHALLENGE 7: Arrow functions with defaults
// How do defaults work with arrow functions?

const challenge7 = (a = 1, b = 2) => ({ a, b });

const challenge7b = (
  x = Math.random(),
  y = (() => {
    console.log("Complex default executed");
    return x * 2;
  })()
) => ({ x, y });

console.log("7a - Arrow defaults:", challenge7());
console.log("7b - Complex arrow defaults:", challenge7b());

// CHALLENGE 8: Default parameters with rest/spread
// Interaction between defaults and rest parameters

function challenge8(a = 1, b = 2, ...rest) {
  return { a, b, rest, arguments: Array.from(arguments) };
}

console.log("8a - With rest:", challenge8());
console.log("8b - With rest and args:", challenge8(10, 20, 30, 40));
console.log("8c - Undefined first:", challenge8(undefined, 20, 30));

// CHALLENGE 9: Scope and closure issues
// Default parameters and their scope

let globalVar = "global";

function challenge9(param = globalVar) {
  let globalVar = "local"; // Shadows global
  return param;
}

console.log("9a - Scope test:", challenge9());

function challenge9b() {
  let localVar = "function-local";

  function inner(param = localVar) {
    return param;
  }

  return inner();
}

console.log("9b - Closure test:", challenge9b());

// CHALLENGE 10: Performance implications
// When default evaluation might cause performance issues

let expensiveCallCount = 0;

function expensiveOperation() {
  expensiveCallCount++;
  console.log(`Expensive operation called ${expensiveCallCount} times`);
  // Simulate expensive work
  let result = 0;
  for (let i = 0; i < 1000; i++) {
    result += Math.random();
  }
  return result;
}

function challenge10(data = expensiveOperation()) {
  return data > 500 ? "high" : "low";
}

console.log("10a - First call (expensive):", challenge10());
console.log("10b - Second call (expensive again):", challenge10());
console.log("10c - With argument (not expensive):", challenge10(600));

// Better approach with lazy evaluation
function challenge10Better(data) {
  if (data === undefined) {
    data = expensiveOperation();
  }
  return data > 500 ? "high" : "low";
}

// CHALLENGE 11: Edge cases and gotchas
// Tricky scenarios with default parameters

function challenge11(a, b = a, c = b) {
  return [a, b, c];
}

console.log("11a - Chain dependency:", challenge11(1));

function challenge11b(a = 1, b, c = 3) {
  return [a, b, c];
}

console.log("11b - Middle undefined:", challenge11b(undefined, 2));
console.log("11c - Skip first:", challenge11b(10, undefined, 30));

// CHALLENGE 12: Default parameters with this
// How do default parameters interact with 'this'?

const challenge12Object = {
  value: 42,

  method: function (multiplier = this.value) {
    return multiplier * 2;
  },

  arrowMethod: (multiplier = this.value) => {
    return multiplier * 2;
  },
};

console.log("12a - Regular method:", challenge12Object.method());
console.log("12b - Arrow method:", challenge12Object.arrowMethod());

// CHALLENGE 13: Default parameters in class constructors
// Classes and default parameters

class Challenge13 {
  constructor(
    name = "DefaultName",
    value = Math.random(),
    options = { debug: false }
  ) {
    this.name = name;
    this.value = value;
    this.options = options;
    this.created = new Date();
  }

  static create(name) {
    return new Challenge13(name);
  }
}

const instance1 = new Challenge13();
const instance2 = new Challenge13("Custom");
const instance3 = Challenge13.create("Static");

console.log(
  "13a - Default constructor:",
  instance1.name,
  typeof instance1.value
);
console.log(
  "13b - Partial constructor:",
  instance2.name,
  typeof instance2.value
);
console.log("13c - Static method:", instance3.name, typeof instance3.value);

// CHALLENGE 14: Complex real-world scenario
// API function with sophisticated defaults

function apiRequest(
  url,
  {
    method = "GET",
    headers = { "Content-Type": "application/json" },
    timeout = 5000,
    retries = 3,
    retryDelay = (attempt) => Math.min(1000 * Math.pow(2, attempt), 10000),
    onProgress = () => {},
    onError = (error) => console.error("API Error:", error),
  } = {}
) {
  return {
    url,
    method,
    headers,
    timeout,
    retries,
    retryDelay: retryDelay(1),
    hasProgressHandler: typeof onProgress === "function",
    hasErrorHandler: typeof onError === "function",
  };
}

console.log("14a - Minimal call:", apiRequest("https://api.example.com"));
console.log(
  "14b - With options:",
  apiRequest("https://api.example.com", {
    method: "POST",
    timeout: 10000,
  })
);

// CHALLENGE 15: Write a function that analyzes default parameters
// Meta-programming with defaults

function analyzeDefaults(fn) {
  // TODO: Analyze a function's default parameters
  // Return information about:
  // - How many parameters have defaults
  // - Which positions have defaults
  // - Whether defaults are simple values or expressions

  const funcString = fn.toString();
  // Implementation would require parsing the function signature

  return {
    totalParams: fn.length, // Note: this excludes params with defaults
    signature: funcString.match(/\([^)]*\)/)[0],
  };
}

console.log("15a - Analyze challenge1:", analyzeDefaults(challenge1));
console.log("15b - Analyze challenge6:", analyzeDefaults(challenge6));

// BONUS: Common pitfalls and best practices
console.log("\n=== Default Parameters Best Practices ===");
console.log("1. Avoid expensive operations in defaults");
console.log("2. Be careful with object/array defaults (reference sharing)");
console.log("3. Consider parameter order (defaults usually at end)");
console.log(
  "4. Remember that 'undefined' triggers defaults, but 'null' doesn't"
);
console.log("5. Default expressions are evaluated each time");

// Demonstrate reference sharing pitfall
function problematicDefaults(items = []) {
  items.push("new item");
  return items;
}

// This shares the same array reference!
console.log("Pitfall 1:", problematicDefaults());
console.log("Pitfall 2:", problematicDefaults());

// Better approach
function betterDefaults(items) {
  if (items === undefined) {
    items = [];
  }
  items.push("new item");
  return items;
}

console.log("Better 1:", betterDefaults());
console.log("Better 2:", betterDefaults());
