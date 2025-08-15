"use strict";

console.log("=== Map & Set Challenge ===");

// CHALLENGE 1: Key type differences between Map and Object
// Understanding what can be used as keys

const keyTests = [
  "string",
  42,
  true,
  null,
  undefined,
  Symbol("test"),
  {},
  [],
  function () {},
  new Date(),
];

const map = new Map();
const obj = {};

console.log("1a - Testing different key types:");

keyTests.forEach((key, index) => {
  // Map can use any type as key
  map.set(key, `value-${index}`);

  // Object converts keys to strings (except Symbols)
  try {
    if (typeof key === "symbol") {
      obj[key] = `value-${index}`;
    } else {
      obj[key] = `value-${index}`;
    }
  } catch (error) {
    console.log(`Cannot use ${typeof key} as object key`);
  }
});

console.log("1b - Map size:", map.size);
console.log("1c - Object keys:", Object.keys(obj).length);
console.log(
  "1d - Object with symbols:",
  Object.getOwnPropertySymbols(obj).length
);

// Demonstrate key coercion in objects
obj[1] = "number key";
obj["1"] = "string key";
console.log("1e - Object number vs string key:", obj[1], obj["1"]); // Same value

map.set(1, "number key");
map.set("1", "string key");
console.log("1f - Map number vs string key:", map.get(1), map.get("1")); // Different values

// CHALLENGE 2: Set uniqueness with complex types
// Understanding how Set determines uniqueness

const set = new Set();

// Primitive values
set.add(1);
set.add(1); // Duplicate
set.add("1"); // Different type
set.add(true);
set.add(true); // Duplicate

console.log("2a - Set with primitives:", set);

// Object references
const obj1 = { id: 1 };
const obj2 = { id: 1 }; // Same content, different reference
const obj3 = obj1; // Same reference

set.add(obj1);
set.add(obj2); // Added (different reference)
set.add(obj3); // Not added (same reference as obj1)

console.log("2b - Set size after objects:", set.size);

// NaN special case
set.add(NaN);
set.add(NaN); // Not added (NaN === NaN in Set)
console.log("2c - Set with NaN:", set.has(NaN));

// Zero special cases
set.add(0);
set.add(-0); // Not added (+0 === -0 in Set)
console.log("2d - Set size after zeros:", set.size);

// CHALLENGE 3: Memory implications and weak collections
// Understanding WeakMap and WeakSet

let obj1_weak = { name: "Object 1" };
let obj2_weak = { name: "Object 2" };

const regularMap = new Map();
const weakMap = new WeakMap();
const regularSet = new Set();
const weakSet = new WeakSet();

// Add to collections
regularMap.set(obj1_weak, "regular map value");
weakMap.set(obj1_weak, "weak map value");
regularSet.add(obj2_weak);
weakSet.add(obj2_weak);

console.log("3a - Regular map has obj1:", regularMap.has(obj1_weak));
console.log("3b - Weak map has obj1:", weakMap.has(obj1_weak));
console.log("3c - Regular set has obj2:", regularSet.has(obj2_weak));
console.log("3d - Weak set has obj2:", weakSet.has(obj2_weak));

// Simulate garbage collection by removing references
obj1_weak = null;
obj2_weak = null;

// Note: In real scenarios, you can't reliably test garbage collection
// WeakMap and WeakSet would allow objects to be garbage collected
console.log("3e - Objects set to null (would be GC'd in WeakMap/WeakSet)");

// CHALLENGE 4: Map iteration order and performance
// Maps maintain insertion order

const orderedMap = new Map();
const keys = ["third", "first", "second"];

// Insert in random order
orderedMap.set("first", 1);
orderedMap.set("third", 3);
orderedMap.set("second", 2);

console.log("4a - Map iteration order (insertion order):");
for (const [key, value] of orderedMap) {
  console.log(`  ${key}: ${value}`);
}

// Performance comparison
const largeMap = new Map();
const largeObj = {};

console.time("4b - Map.set() 10000 items");
for (let i = 0; i < 10000; i++) {
  largeMap.set(`key-${i}`, i);
}
console.timeEnd("4b - Map.set() 10000 items");

console.time("4c - Object property assignment 10000 items");
for (let i = 0; i < 10000; i++) {
  largeObj[`key-${i}`] = i;
}
console.timeEnd("4c - Object property assignment 10000 items");

console.time("4d - Map.get() lookups");
for (let i = 0; i < 1000; i++) {
  largeMap.get(`key-${i}`);
}
console.timeEnd("4d - Map.get() lookups");

console.time("4e - Object property access");
for (let i = 0; i < 1000; i++) {
  largeObj[`key-${i}`];
}
console.timeEnd("4e - Object property access");

// CHALLENGE 5: Set operations (union, intersection, difference)
// Implementing mathematical set operations

class SetOperations {
  static union(setA, setB) {
    return new Set([...setA, ...setB]);
  }

  static intersection(setA, setB) {
    return new Set([...setA].filter((x) => setB.has(x)));
  }

  static difference(setA, setB) {
    return new Set([...setA].filter((x) => !setB.has(x)));
  }

  static symmetricDifference(setA, setB) {
    const diff1 = this.difference(setA, setB);
    const diff2 = this.difference(setB, setA);
    return this.union(diff1, diff2);
  }

  static isSubset(setA, setB) {
    return [...setA].every((x) => setB.has(x));
  }

  static isSuperset(setA, setB) {
    return this.isSubset(setB, setA);
  }
}

const setA = new Set([1, 2, 3, 4, 5]);
const setB = new Set([4, 5, 6, 7, 8]);
const setC = new Set([1, 2, 3]);

console.log("5a - Set A:", [...setA]);
console.log("5b - Set B:", [...setB]);
console.log("5c - Union A ∪ B:", [...SetOperations.union(setA, setB)]);
console.log("5d - Intersection A ∩ B:", [
  ...SetOperations.intersection(setA, setB),
]);
console.log("5e - Difference A - B:", [
  ...SetOperations.difference(setA, setB),
]);
console.log("5f - Symmetric difference A △ B:", [
  ...SetOperations.symmetricDifference(setA, setB),
]);
console.log("5g - C is subset of A:", SetOperations.isSubset(setC, setA));
console.log("5h - A is superset of C:", SetOperations.isSuperset(setA, setC));

// CHALLENGE 6: Complex data structures with Map
// Building advanced data structures

class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set());
    }
  }

  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList.get(vertex1).add(vertex2);
    this.adjacencyList.get(vertex2).add(vertex1);
  }

  removeVertex(vertex) {
    if (this.adjacencyList.has(vertex)) {
      // Remove all edges to this vertex
      for (const neighbor of this.adjacencyList.get(vertex)) {
        this.adjacencyList.get(neighbor).delete(vertex);
      }
      this.adjacencyList.delete(vertex);
    }
  }

  getNeighbors(vertex) {
    return this.adjacencyList.get(vertex) || new Set();
  }

  hasEdge(vertex1, vertex2) {
    return this.adjacencyList.get(vertex1)?.has(vertex2) || false;
  }

  display() {
    for (const [vertex, neighbors] of this.adjacencyList) {
      console.log(`${vertex}: [${[...neighbors].join(", ")}]`);
    }
  }
}

const graph = new Graph();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");

console.log("6a - Graph structure:");
graph.display();

console.log("6b - Neighbors of A:", [...graph.getNeighbors("A")]);
console.log("6c - Has edge A-D:", graph.hasEdge("A", "D"));

// CHALLENGE 7: Caching and memoization with Map
// Using Map for performance optimization

class MemoizedCalculator {
  constructor() {
    this.cache = new Map();
    this.calls = 0;
    this.cacheHits = 0;
  }

  fibonacci(n) {
    this.calls++;

    if (this.cache.has(n)) {
      this.cacheHits++;
      return this.cache.get(n);
    }

    let result;
    if (n <= 1) {
      result = n;
    } else {
      result = this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }

    this.cache.set(n, result);
    return result;
  }

  expensiveOperation(a, b) {
    const key = `${a}-${b}`;
    this.calls++;

    if (this.cache.has(key)) {
      this.cacheHits++;
      return this.cache.get(key);
    }

    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sin(a + b + i);
    }

    this.cache.set(key, result);
    return result;
  }

  getStats() {
    return {
      totalCalls: this.calls,
      cacheHits: this.cacheHits,
      hitRate: this.cacheHits / this.calls,
    };
  }

  clearCache() {
    this.cache.clear();
    this.calls = 0;
    this.cacheHits = 0;
  }
}

const calculator = new MemoizedCalculator();

console.time("7a - Fibonacci(40) first time");
const fib1 = calculator.fibonacci(40);
console.timeEnd("7a - Fibonacci(40) first time");

console.time("7b - Fibonacci(40) second time (cached)");
const fib2 = calculator.fibonacci(40);
console.timeEnd("7b - Fibonacci(40) second time (cached)");

console.log("7c - Fibonacci results equal:", fib1 === fib2);
console.log("7d - Cache stats:", calculator.getStats());

// CHALLENGE 8: Event system with Map and Set
// Building publish-subscribe pattern

class EventEmitter {
  constructor() {
    this.events = new Map(); // event -> Set of listeners
    this.onceEvents = new Map(); // event -> Set of one-time listeners
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  once(event, listener) {
    if (!this.onceEvents.has(event)) {
      this.onceEvents.set(event, new Set());
    }
    this.onceEvents.get(event).add(listener);
  }

  off(event, listener) {
    this.events.get(event)?.delete(listener);
    this.onceEvents.get(event)?.delete(listener);
  }

  emit(event, ...args) {
    // Regular listeners
    const listeners = this.events.get(event);
    if (listeners) {
      for (const listener of listeners) {
        listener(...args);
      }
    }

    // One-time listeners
    const onceListeners = this.onceEvents.get(event);
    if (onceListeners) {
      for (const listener of onceListeners) {
        listener(...args);
      }
      this.onceEvents.delete(event); // Remove all once listeners
    }
  }

  listenerCount(event) {
    const regular = this.events.get(event)?.size || 0;
    const once = this.onceEvents.get(event)?.size || 0;
    return regular + once;
  }

  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
      this.onceEvents.delete(event);
    } else {
      this.events.clear();
      this.onceEvents.clear();
    }
  }
}

const emitter = new EventEmitter();

const listener1 = (data) => console.log("Listener 1:", data);
const listener2 = (data) => console.log("Listener 2:", data);
const onceListener = (data) => console.log("Once listener:", data);

emitter.on("test", listener1);
emitter.on("test", listener2);
emitter.once("test", onceListener);

console.log("8a - Listener count:", emitter.listenerCount("test"));

console.log("8b - First emit:");
emitter.emit("test", "Hello");

console.log("8c - Second emit (once listener gone):");
emitter.emit("test", "World");

console.log("8d - Listener count after:", emitter.listenerCount("test"));

// CHALLENGE 9: Multi-level caching with nested Maps
// Complex caching scenarios

class MultiLevelCache {
  constructor(maxSize = 100) {
    this.cache = new Map(); // Maps can be nested
    this.maxSize = maxSize;
    this.accessOrder = []; // For LRU eviction
  }

  set(namespace, key, value) {
    if (!this.cache.has(namespace)) {
      this.cache.set(namespace, new Map());
    }

    const nsCache = this.cache.get(namespace);
    nsCache.set(key, value);

    // Update access order for LRU
    const fullKey = `${namespace}:${key}`;
    this.accessOrder = this.accessOrder.filter((k) => k !== fullKey);
    this.accessOrder.push(fullKey);

    // Evict if over limit
    if (this.accessOrder.length > this.maxSize) {
      this.evictLRU();
    }
  }

  get(namespace, key) {
    const nsCache = this.cache.get(namespace);
    if (!nsCache || !nsCache.has(key)) {
      return undefined;
    }

    // Update access order
    const fullKey = `${namespace}:${key}`;
    this.accessOrder = this.accessOrder.filter((k) => k !== fullKey);
    this.accessOrder.push(fullKey);

    return nsCache.get(key);
  }

  has(namespace, key) {
    return this.cache.get(namespace)?.has(key) || false;
  }

  delete(namespace, key) {
    const nsCache = this.cache.get(namespace);
    if (nsCache) {
      nsCache.delete(key);
      if (nsCache.size === 0) {
        this.cache.delete(namespace);
      }
    }

    const fullKey = `${namespace}:${key}`;
    this.accessOrder = this.accessOrder.filter((k) => k !== fullKey);
  }

  evictLRU() {
    if (this.accessOrder.length === 0) return;

    const lruKey = this.accessOrder.shift();
    const [namespace, key] = lruKey.split(":");
    this.delete(namespace, key);
  }

  getStats() {
    const stats = { namespaces: {}, totalEntries: 0 };

    for (const [namespace, nsCache] of this.cache) {
      stats.namespaces[namespace] = nsCache.size;
      stats.totalEntries += nsCache.size;
    }

    return stats;
  }
}

const multiCache = new MultiLevelCache(5);

// Add items to different namespaces
multiCache.set("users", "1", { name: "Alice" });
multiCache.set("users", "2", { name: "Bob" });
multiCache.set("posts", "1", { title: "Post 1" });
multiCache.set("posts", "2", { title: "Post 2" });
multiCache.set("comments", "1", { text: "Comment 1" });

console.log("9a - Cache stats:", multiCache.getStats());

// Add more to trigger eviction
multiCache.set("users", "3", { name: "Charlie" }); // Should evict LRU

console.log("9b - After adding user 3:", multiCache.getStats());
console.log("9c - User 1 still exists:", multiCache.has("users", "1"));

// CHALLENGE 10: Performance monitoring with Map and Set
// Track function calls and performance

class PerformanceMonitor {
  constructor() {
    this.callCounts = new Map();
    this.executionTimes = new Map();
    this.uniqueArguments = new Map(); // Track unique argument sets
  }

  monitor(fn, name = fn.name) {
    const self = this;

    return function (...args) {
      const start = performance.now();

      // Track call count
      self.callCounts.set(name, (self.callCounts.get(name) || 0) + 1);

      // Track unique arguments
      if (!self.uniqueArguments.has(name)) {
        self.uniqueArguments.set(name, new Set());
      }
      self.uniqueArguments.get(name).add(JSON.stringify(args));

      // Execute function
      const result = fn.apply(this, args);

      // Track execution time
      const duration = performance.now() - start;
      if (!self.executionTimes.has(name)) {
        self.executionTimes.set(name, []);
      }
      self.executionTimes.get(name).push(duration);

      return result;
    };
  }

  getReport() {
    const report = new Map();

    for (const [fnName, count] of this.callCounts) {
      const times = this.executionTimes.get(fnName) || [];
      const uniqueArgs = this.uniqueArguments.get(fnName)?.size || 0;

      report.set(fnName, {
        callCount: count,
        uniqueArgumentSets: uniqueArgs,
        totalTime: times.reduce((sum, time) => sum + time, 0),
        averageTime:
          times.length > 0
            ? times.reduce((sum, time) => sum + time, 0) / times.length
            : 0,
        minTime: times.length > 0 ? Math.min(...times) : 0,
        maxTime: times.length > 0 ? Math.max(...times) : 0,
      });
    }

    return report;
  }
}

// Test the performance monitor
const monitor = new PerformanceMonitor();

const slowFunction = monitor.monitor((x, y) => {
  let result = 0;
  for (let i = 0; i < x * 1000; i++) {
    result += Math.sin(i) * y;
  }
  return result;
}, "slowFunction");

const fastFunction = monitor.monitor((a, b) => a + b, "fastFunction");

// Make some calls
slowFunction(5, 2);
slowFunction(3, 4);
slowFunction(5, 2); // Same args as first call
fastFunction(1, 2);
fastFunction(3, 4);
fastFunction(5, 6);

console.log("10a - Performance report:");
const report = monitor.getReport();
for (const [fnName, stats] of report) {
  console.log(`  ${fnName}:`, {
    calls: stats.callCount,
    uniqueArgs: stats.uniqueArgumentSets,
    avgTime: Math.round(stats.averageTime * 100) / 100,
  });
}

console.log("\n=== Discussion Questions ===");
console.log("1. When should you use Map vs Object for key-value storage?");
console.log("2. How do WeakMap and WeakSet help with memory management?");
console.log("3. What are the performance characteristics of Set operations?");
console.log("4. How can Map and Set be used to build other data structures?");
console.log(
  "5. What are the trade-offs between Map/Set and plain objects/arrays?"
);
