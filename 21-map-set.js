"use strict";

console.log("=== Map & Set ===");

// MAP - Key-value pairs with any type of keys
console.log("=== MAP ===");

// Creating Maps
const userMap = new Map();
const productMap = new Map([
  ["laptop", { price: 1000, category: "electronics" }],
  ["book", { price: 20, category: "education" }],
  ["phone", { price: 800, category: "electronics" }],
]);

console.log("Initial product map:", productMap);

// Setting values
userMap.set("alice", { age: 25, role: "admin" });
userMap.set("bob", { age: 30, role: "user" });
userMap.set(123, { age: 35, role: "moderator" }); // Number key
userMap.set(true, { age: 40, role: "guest" }); // Boolean key

console.log("User map after setting values:", userMap);

// Getting values
console.log("Alice's data:", userMap.get("alice"));
console.log("User with key 123:", userMap.get(123));
console.log("Non-existent key:", userMap.get("charlie")); // undefined

// Checking if key exists
console.log("Has alice:", userMap.has("alice")); // true
console.log("Has charlie:", userMap.has("charlie")); // false

// Map size
console.log("User map size:", userMap.size);

// Object vs Map as keys
const objKey1 = { id: 1 };
const objKey2 = { id: 2 };
const objKeyMap = new Map();

objKeyMap.set(objKey1, "First object");
objKeyMap.set(objKey2, "Second object");

console.log("Map with object keys:", objKeyMap);
console.log("Value for objKey1:", objKeyMap.get(objKey1));

// Iterating over Maps
console.log("\nIterating over Maps:");

// for...of with entries (default)
for (const [key, value] of userMap) {
  console.log(`${key}:`, value);
}

// Using .entries()
for (const [key, value] of userMap.entries()) {
  console.log(`Entry - ${key}:`, value);
}

// Using .keys()
for (const key of userMap.keys()) {
  console.log(`Key: ${key}`);
}

// Using .values()
for (const value of userMap.values()) {
  console.log(`Value:`, value);
}

// forEach method
userMap.forEach((value, key) => {
  console.log(`forEach - ${key}:`, value);
});

// Converting Map to Array
const mapEntries = Array.from(userMap.entries());
const mapKeys = Array.from(userMap.keys());
const mapValues = Array.from(userMap.values());

console.log("Map entries as array:", mapEntries);
console.log("Map keys as array:", mapKeys);
console.log("Map values as array:", mapValues);

// Map methods
console.log("\nMap methods:");

// Delete
const deleteResult = userMap.delete("bob");
console.log("Delete bob result:", deleteResult); // true
console.log("Map after deleting bob:", userMap);

// Clear
const tempMap = new Map([
  ["a", 1],
  ["b", 2],
]);
console.log("Temp map before clear:", tempMap);
tempMap.clear();
console.log("Temp map after clear:", tempMap);

// Map vs Object comparison
console.log("\nMap vs Object:");

const objStore = {};
const mapStore = new Map();

// Objects convert keys to strings
objStore[1] = "number key";
objStore["1"] = "string key";
console.log("Object keys:", Object.keys(objStore)); // ["1"]
console.log("Object with number key:", objStore[1]); // "string key"

// Maps preserve key types
mapStore.set(1, "number key");
mapStore.set("1", "string key");
console.log("Map has number 1:", mapStore.has(1)); // true
console.log("Map has string '1':", mapStore.has("1")); // true
console.log("Map number key:", mapStore.get(1)); // "number key"
console.log("Map string key:", mapStore.get("1")); // "string key"

// SET - Collection of unique values
console.log("\n=== SET ===");

// Creating Sets
const numberSet = new Set([1, 2, 3, 3, 4, 4, 5]); // Duplicates removed
const stringSet = new Set();

console.log("Number set:", numberSet); // Set {1, 2, 3, 4, 5}

// Adding values
stringSet.add("apple");
stringSet.add("banana");
stringSet.add("apple"); // Duplicate, won't be added
console.log("String set after adding:", stringSet); // Set {"apple", "banana"}

// Set size
console.log("String set size:", stringSet.size); // 2

// Checking if value exists
console.log("Set has apple:", stringSet.has("apple")); // true
console.log("Set has orange:", stringSet.has("orange")); // false

// Deleting values
const deleteFromSet = stringSet.delete("banana");
console.log("Delete banana result:", deleteFromSet); // true
console.log("Set after deleting banana:", stringSet);

// Iterating over Sets
console.log("\nIterating over Sets:");

const fruits = new Set(["apple", "banana", "orange"]);

// for...of
for (const fruit of fruits) {
  console.log("Fruit:", fruit);
}

// forEach
fruits.forEach((fruit) => {
  console.log("forEach fruit:", fruit);
});

// Set methods
console.log("\nSet operations:");

const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);

// Union (ES2025 proposal, manual implementation)
const union = new Set([...set1, ...set2]);
console.log("Union:", union); // Set {1, 2, 3, 4, 5, 6}

// Intersection
const intersection = new Set([...set1].filter((x) => set2.has(x)));
console.log("Intersection:", intersection); // Set {3, 4}

// Difference
const difference = new Set([...set1].filter((x) => !set2.has(x)));
console.log("Difference (set1 - set2):", difference); // Set {1, 2}

// Practical examples
console.log("\nPractical examples:");

// Remove duplicates from array
const arrayWithDuplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const uniqueArray = [...new Set(arrayWithDuplicates)];
console.log("Array with duplicates:", arrayWithDuplicates);
console.log("Unique array:", uniqueArray);

// Cache implementation with Map
class Cache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key) {
    if (this.cache.has(key)) {
      // Move to end (LRU behavior)
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  has(key) {
    return this.cache.has(key);
  }

  size() {
    return this.cache.size;
  }
}

const cache = new Cache(3);
cache.set("a", 1);
cache.set("b", 2);
cache.set("c", 3);
console.log("Cache after adding a,b,c:", cache.cache);

cache.set("d", 4); // Should remove "a"
console.log("Cache after adding d:", cache.cache);

// Tag system with Set
class TagSystem {
  constructor() {
    this.itemTags = new Map();
    this.tagItems = new Map();
  }

  addTag(item, tag) {
    if (!this.itemTags.has(item)) {
      this.itemTags.set(item, new Set());
    }
    if (!this.tagItems.has(tag)) {
      this.tagItems.set(tag, new Set());
    }

    this.itemTags.get(item).add(tag);
    this.tagItems.get(tag).add(item);
  }

  removeTag(item, tag) {
    if (this.itemTags.has(item)) {
      this.itemTags.get(item).delete(tag);
    }
    if (this.tagItems.has(tag)) {
      this.tagItems.get(tag).delete(item);
    }
  }

  getItemTags(item) {
    return this.itemTags.get(item) || new Set();
  }

  getTaggedItems(tag) {
    return this.tagItems.get(tag) || new Set();
  }

  findItemsWithAllTags(tags) {
    if (tags.length === 0) return new Set();

    let result = new Set(this.getTaggedItems(tags[0]));
    for (let i = 1; i < tags.length; i++) {
      const taggedItems = this.getTaggedItems(tags[i]);
      result = new Set([...result].filter((item) => taggedItems.has(item)));
    }
    return result;
  }
}

const tagSystem = new TagSystem();
tagSystem.addTag("item1", "red");
tagSystem.addTag("item1", "large");
tagSystem.addTag("item2", "red");
tagSystem.addTag("item2", "small");
tagSystem.addTag("item3", "blue");
tagSystem.addTag("item3", "large");

console.log("Items with red tag:", tagSystem.getTaggedItems("red"));
console.log(
  "Items with red AND large:",
  tagSystem.findItemsWithAllTags(["red", "large"])
);

// Performance comparison
console.log("\nPerformance comparison:");

const largeArray = Array.from({ length: 10000 }, (_, i) => i % 1000);

console.time("Array includes");
let arrayCount = 0;
for (let i = 0; i < 1000; i++) {
  if (largeArray.includes(i)) arrayCount++;
}
console.timeEnd("Array includes");

const largeSet = new Set(largeArray);
console.time("Set has");
let setCount = 0;
for (let i = 0; i < 1000; i++) {
  if (largeSet.has(i)) setCount++;
}
console.timeEnd("Set has");

console.log("Array count:", arrayCount, "Set count:", setCount);

// WeakMap and WeakSet (brief mention)
console.log("\nWeakMap and WeakSet:");

const weakMap = new WeakMap();
const weakSet = new WeakSet();

const obj1 = { name: "test" };
const obj2 = { name: "test2" };

weakMap.set(obj1, "data for obj1");
weakSet.add(obj2);

console.log("WeakMap has obj1:", weakMap.has(obj1)); // true
console.log("WeakSet has obj2:", weakSet.has(obj2)); // true

// Objects can be garbage collected when no other references exist
// WeakMap and WeakSet don't prevent garbage collection
