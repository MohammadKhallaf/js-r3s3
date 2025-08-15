"use strict";

console.log("=== Array.with Challenge ===");

// CHALLENGE 1: Browser compatibility and polyfill
// Array.with() is ES2023 - might not be available everywhere

// Check if Array.with() exists
if (!Array.prototype.with) {
  console.log("1a - Array.with() not available, creating polyfill");

  Array.prototype.with = function (index, value) {
    // Handle negative indices
    const actualIndex = index < 0 ? this.length + index : index;

    // Validate index
    if (actualIndex < 0 || actualIndex >= this.length) {
      throw new RangeError("Invalid index");
    }

    // Create new array with updated value
    const newArray = [...this];
    newArray[actualIndex] = value;
    return newArray;
  };
} else {
  console.log("1a - Array.with() is available natively");
}

// Test basic functionality
const original = [1, 2, 3, 4, 5];
const modified = original.with(2, 99);

console.log("1b - Original array:", original);
console.log("1c - Modified array:", modified);
console.log("1d - Original unchanged:", original[2] === 3);

// CHALLENGE 2: Negative index handling
// Understanding how negative indices work

const letters = ["a", "b", "c", "d", "e"];

try {
  const lastChanged = letters.with(-1, "Z");
  const secondLastChanged = letters.with(-2, "Y");
  const thirdLastChanged = letters.with(-3, "X");

  console.log("2a - Change last element:", lastChanged);
  console.log("2b - Change second last:", secondLastChanged);
  console.log("2c - Change third last:", thirdLastChanged);

  // Test edge cases
  const firstFromEnd = letters.with(-letters.length, "FIRST");
  console.log("2d - Change first via negative index:", firstFromEnd);

  // This should throw an error
  const outOfBounds = letters.with(-10, "ERROR");
} catch (error) {
  console.log("2e - Out of bounds error:", error.message);
}

// CHALLENGE 3: Immutability deep dive
// Demonstrating that .with() creates shallow copies

const nestedData = [
  { id: 1, values: [10, 20] },
  { id: 2, values: [30, 40] },
  { id: 3, values: [50, 60] },
];

const withNewObject = nestedData.with(1, { id: 99, values: [99, 99] });
const withModifiedObject = nestedData.with(0, { ...nestedData[0], id: 999 });

console.log("3a - Original nested data:", nestedData);
console.log("3b - With new object at index 1:", withNewObject);
console.log("3c - With modified object at index 0:", withModifiedObject);

// Demonstrate shallow copy behavior
const shallowUpdate = nestedData.with(2, nestedData[2]);
shallowUpdate[2].id = "MODIFIED";

console.log("3d - Original after shallow modification:", nestedData[2].id);
console.log("3e - This shows .with() does shallow copy");

// CHALLENGE 4: Performance comparisons
// .with() vs other immutable update methods

const largeArray = Array.from({ length: 10000 }, (_, i) => i);
const indexToUpdate = 5000;
const newValue = "UPDATED";

console.time("4a - Array.with()");
const withResult = largeArray.with(indexToUpdate, newValue);
console.timeEnd("4a - Array.with()");

console.time("4b - Spread with slice");
const spreadResult = [
  ...largeArray.slice(0, indexToUpdate),
  newValue,
  ...largeArray.slice(indexToUpdate + 1),
];
console.timeEnd("4b - Spread with slice");

console.time("4c - Array.from with map");
const mapResult = Array.from(largeArray, (value, index) =>
  index === indexToUpdate ? newValue : value
);
console.timeEnd("4c - Array.from with map");

console.time("4d - Clone and mutate");
const cloneResult = [...largeArray];
cloneResult[indexToUpdate] = newValue;
console.timeEnd("4d - Clone and mutate");

console.log(
  "Results equal:",
  withResult[indexToUpdate] === newValue &&
    spreadResult[indexToUpdate] === newValue &&
    mapResult[indexToUpdate] === newValue &&
    cloneResult[indexToUpdate] === newValue
);

// CHALLENGE 5: Chaining .with() operations
// Multiple updates in sequence

const baseArray = [10, 20, 30, 40, 50];

const chainedUpdates = baseArray
  .with(0, 100)
  .with(2, 300)
  .with(4, 500)
  .with(-1, 999); // Update last element again

console.log("5a - Base array:", baseArray);
console.log("5b - After chained updates:", chainedUpdates);

// Compare with multiple operations
const multipleOperations = baseArray.with(0, 100);
const step2 = multipleOperations.with(2, 300);
const step3 = step2.with(4, 500);
const final = step3.with(-1, 999);

console.log("5c - Step by step result:", final);
console.log(
  "5d - Chained equals step-by-step:",
  JSON.stringify(chainedUpdates) === JSON.stringify(final)
);

// CHALLENGE 6: Error handling and edge cases
// Testing boundary conditions

const testArray = ["a", "b", "c"];

const errorTests = [
  { index: 3, value: "x", desc: "Index too high" },
  { index: -4, value: "x", desc: "Negative index too low" },
  { index: 1.5, value: "x", desc: "Float index" },
  { index: "1", value: "x", desc: "String index" },
  { index: NaN, value: "x", desc: "NaN index" },
  { index: Infinity, value: "x", desc: "Infinity index" },
];

errorTests.forEach(({ index, value, desc }, testIndex) => {
  try {
    const result = testArray.with(index, value);
    console.log(
      `6${String.fromCharCode(97 + testIndex)} - ${desc}: Success -`,
      result
    );
  } catch (error) {
    console.log(
      `6${String.fromCharCode(97 + testIndex)} - ${desc}: Error -`,
      error.name
    );
  }
});

// CHALLENGE 7: Type coercion behavior
// How .with() handles different value types

const mixedArray = [1, "hello", true, null, undefined];

const typeTests = [
  { index: 0, value: "string", type: "string" },
  { index: 1, value: 42, type: "number" },
  { index: 2, value: false, type: "boolean" },
  { index: 3, value: { key: "object" }, type: "object" },
  { index: 4, value: [1, 2, 3], type: "array" },
  { index: 0, value: undefined, type: "undefined" },
  { index: 1, value: null, type: "null" },
];

console.log("7a - Original mixed array:", mixedArray);

typeTests.forEach(({ index, value, type }, testIndex) => {
  const result = mixedArray.with(index, value);
  console.log(`7${String.fromCharCode(98 + testIndex)} - Set ${type}:`, result);
});

// CHALLENGE 8: State management patterns
// Using .with() for immutable state updates

class TodoStore {
  constructor() {
    this.todos = [
      { id: 1, text: "Learn JavaScript", completed: false },
      { id: 2, text: "Build a project", completed: false },
      { id: 3, text: "Deploy to production", completed: false },
    ];
  }

  // Update todo immutably
  updateTodo(index, updates) {
    const currentTodo = this.todos[index];
    const updatedTodo = { ...currentTodo, ...updates };
    this.todos = this.todos.with(index, updatedTodo);
    return this.todos;
  }

  // Toggle completion
  toggleTodo(index) {
    const currentTodo = this.todos[index];
    return this.updateTodo(index, { completed: !currentTodo.completed });
  }

  // Update text
  updateTodoText(index, text) {
    return this.updateTodo(index, { text });
  }
}

const todoStore = new TodoStore();
console.log("8a - Initial todos:", todoStore.todos);

const afterToggle = todoStore.toggleTodo(0);
console.log("8b - After toggle first:", afterToggle);

const afterTextUpdate = todoStore.updateTodoText(1, "Build an awesome project");
console.log("8c - After text update:", afterTextUpdate);

// CHALLENGE 9: Working with different array types
// .with() on various array-like structures

// Regular array
const regularArray = [1, 2, 3];
const regularResult = regularArray.with(1, "changed");

// Typed array (if .with() is supported)
const typedArray = new Int32Array([10, 20, 30]);
try {
  const typedResult = typedArray.with
    ? typedArray.with(1, 99)
    : "Not supported";
  console.log("9a - Typed array result:", typedResult);
} catch (error) {
  console.log("9a - Typed array error:", error.message);
}

// Array-like object (doesn't have .with())
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
try {
  const arrayLikeResult = Array.from(arrayLike).with(1, "X");
  console.log("9b - Array-like converted and updated:", arrayLikeResult);
} catch (error) {
  console.log("9b - Array-like error:", error.message);
}

console.log("9c - Regular array result:", regularResult);

// CHALLENGE 10: Functional programming patterns
// Using .with() in functional style

const numbers = [1, 2, 3, 4, 5];

// Functional update pipeline
const functionalUpdate = (arr) =>
  arr
    .with(0, arr[0] * 10) // Multiply first by 10
    .with(-1, arr[arr.length - 1] * 10) // Multiply last by 10
    .with(2, Math.pow(arr[2], 2)); // Square middle element

const pipeResult = functionalUpdate(numbers);
console.log("10a - Original numbers:", numbers);
console.log("10b - Functional pipeline result:", pipeResult);

// Compose update functions
const updateFirst = (arr, value) => arr.with(0, value);
const updateLast = (arr, value) => arr.with(-1, value);
const updateMiddle = (arr, value) =>
  arr.with(Math.floor(arr.length / 2), value);

const compose =
  (...functions) =>
  (initialValue) =>
    functions.reduce((acc, fn) => fn(acc), initialValue);

const composedUpdate = compose(
  (arr) => updateFirst(arr, "FIRST"),
  (arr) => updateLast(arr, "LAST"),
  (arr) => updateMiddle(arr, "MIDDLE")
);

const composedResult = composedUpdate(["a", "b", "c", "d", "e"]);
console.log("10c - Composed update result:", composedResult);

// CHALLENGE 11: Memory and performance optimization
// Understanding memory implications

function testMemoryUsage() {
  const baseArray = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    data: `item-${i}`,
  }));

  // Test creating many variations
  console.time("11a - Multiple .with() operations");
  const variations = [];
  for (let i = 0; i < 100; i++) {
    variations.push(
      baseArray.with(i % baseArray.length, { id: i, data: `modified-${i}` })
    );
  }
  console.timeEnd("11a - Multiple .with() operations");

  // Test reusing intermediate results
  console.time("11b - Reuse intermediate results");
  let current = baseArray;
  for (let i = 0; i < 100; i++) {
    current = current.with(i % current.length, {
      id: i,
      data: `modified-${i}`,
    });
  }
  console.timeEnd("11b - Reuse intermediate results");

  console.log("11c - Variations count:", variations.length);
  console.log("11d - Final array length:", current.length);
}

testMemoryUsage();

// CHALLENGE 12: Complex data structure updates
// Nested array and object updates

const gameState = {
  players: [
    { name: "Alice", inventory: ["sword", "potion"], health: 100 },
    { name: "Bob", inventory: ["bow", "arrow"], health: 80 },
    { name: "Charlie", inventory: ["staff"], health: 60 },
  ],
  currentTurn: 0,
};

function updatePlayerHealth(state, playerIndex, newHealth) {
  const updatedPlayer = { ...state.players[playerIndex], health: newHealth };
  const updatedPlayers = state.players.with(playerIndex, updatedPlayer);
  return { ...state, players: updatedPlayers };
}

function addItemToInventory(state, playerIndex, item) {
  const player = state.players[playerIndex];
  const updatedInventory = [...player.inventory, item];
  const updatedPlayer = { ...player, inventory: updatedInventory };
  const updatedPlayers = state.players.with(playerIndex, updatedPlayer);
  return { ...state, players: updatedPlayers };
}

console.log("12a - Original game state:", gameState);

const afterHealthUpdate = updatePlayerHealth(gameState, 1, 90);
console.log("12b - After health update:", afterHealthUpdate.players[1]);

const afterItemAdd = addItemToInventory(afterHealthUpdate, 0, "shield");
console.log("12c - After adding item:", afterItemAdd.players[0]);

// CHALLENGE 13: Error recovery and validation
// Safe updates with validation

function safeArrayWith(array, index, value, validator = () => true) {
  try {
    // Validate the new value
    if (!validator(value, index, array)) {
      throw new Error("Value validation failed");
    }

    // Validate index
    const actualIndex = index < 0 ? array.length + index : index;
    if (actualIndex < 0 || actualIndex >= array.length) {
      throw new RangeError("Index out of bounds");
    }

    return {
      success: true,
      result: array.with(index, value),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      result: array, // Return original array
      error: error.message,
    };
  }
}

const testNumbers = [1, 2, 3, 4, 5];

// Valid update
const validUpdate = safeArrayWith(
  testNumbers,
  2,
  99,
  (value) => typeof value === "number"
);
console.log("13a - Valid update:", validUpdate);

// Invalid value
const invalidValue = safeArrayWith(
  testNumbers,
  2,
  "string",
  (value) => typeof value === "number"
);
console.log("13b - Invalid value:", invalidValue);

// Invalid index
const invalidIndex = safeArrayWith(testNumbers, 10, 99);
console.log("13c - Invalid index:", invalidIndex);

// CHALLENGE 14: Building a utility library
// Advanced .with() utilities

class ArrayWithUtils {
  // Update multiple indices at once
  static withMultiple(array, updates) {
    return updates.reduce(
      (acc, { index, value }) => acc.with(index, value),
      array
    );
  }

  // Conditional update
  static withIf(array, index, value, condition) {
    return condition ? array.with(index, value) : array;
  }

  // Update with function
  static withFunction(array, index, updateFn) {
    const currentValue = array[index];
    const newValue = updateFn(currentValue, index, array);
    return array.with(index, newValue);
  }

  // Swap two elements
  static swap(array, index1, index2) {
    return array.with(index1, array[index2]).with(index2, array[index1]);
  }

  // Fill range with value
  static fillRange(array, start, end, value) {
    let result = array;
    for (let i = start; i <= end; i++) {
      result = result.with(i, value);
    }
    return result;
  }

  // Move element from one index to another
  static move(array, fromIndex, toIndex) {
    const element = array[fromIndex];
    const withoutElement = array.filter((_, i) => i !== fromIndex);
    return [
      ...withoutElement.slice(0, toIndex),
      element,
      ...withoutElement.slice(toIndex),
    ];
  }
}

const utilTestArray = [10, 20, 30, 40, 50];

console.log("14a - Original:", utilTestArray);

const multipleUpdates = ArrayWithUtils.withMultiple(utilTestArray, [
  { index: 0, value: 100 },
  { index: 2, value: 300 },
  { index: 4, value: 500 },
]);
console.log("14b - Multiple updates:", multipleUpdates);

const conditionalUpdate = ArrayWithUtils.withIf(utilTestArray, 1, 999, true);
console.log("14c - Conditional update (true):", conditionalUpdate);

const functionUpdate = ArrayWithUtils.withFunction(
  utilTestArray,
  2,
  (current) => current * 2
);
console.log("14d - Function update:", functionUpdate);

const swapped = ArrayWithUtils.swap(utilTestArray, 0, 4);
console.log("14e - Swapped elements:", swapped);

const rangeFreled = ArrayWithUtils.fillRange(utilTestArray, 1, 3, "X");
console.log("14f - Range filled:", rangeFreled);

// CHALLENGE 15: React-style state updates
// Simulating React state update patterns

class Component {
  constructor(initialState) {
    this.state = initialState;
    this.setState = this.setState.bind(this);
  }

  setState(updater) {
    if (typeof updater === "function") {
      this.state = updater(this.state);
    } else {
      this.state = { ...this.state, ...updater };
    }
    this.onStateChange();
  }

  onStateChange() {
    console.log("State updated:", this.state);
  }

  // Update array in state immutably
  updateArrayItem(arrayKey, index, value) {
    this.setState((prevState) => ({
      ...prevState,
      [arrayKey]: prevState[arrayKey].with(index, value),
    }));
  }

  // Add to array in state
  addToArray(arrayKey, item) {
    this.setState((prevState) => ({
      ...prevState,
      [arrayKey]: [...prevState[arrayKey], item],
    }));
  }

  // Remove from array in state
  removeFromArray(arrayKey, index) {
    this.setState((prevState) => ({
      ...prevState,
      [arrayKey]: prevState[arrayKey].filter((_, i) => i !== index),
    }));
  }
}

const component = new Component({
  todos: [
    { id: 1, text: "Learn Array.with()", completed: false },
    { id: 2, text: "Practice immutable updates", completed: false },
  ],
  user: { name: "Developer" },
});

console.log("15a - Initial state:", component.state);

// Update todo
component.updateArrayItem("todos", 0, {
  ...component.state.todos[0],
  completed: true,
});

// Add new todo
component.addToArray("todos", {
  id: 3,
  text: "Master functional programming",
  completed: false,
});

console.log("\n=== Discussion Questions ===");
console.log(
  "1. When should you use Array.with() vs other immutable update patterns?"
);
console.log(
  "2. What are the performance implications of frequent Array.with() usage?"
);
console.log("3. How does Array.with() compare to libraries like Immutable.js?");
console.log(
  "4. What are the browser compatibility considerations for Array.with()?"
);
console.log("5. How can Array.with() improve functional programming patterns?");
