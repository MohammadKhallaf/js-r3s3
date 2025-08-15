"use strict";

console.log("=== Array.with ===");

// Note: Array.with() is a newer method (ES2023)
// It creates a new array with a single element changed

const originalArray = [1, 2, 3, 4, 5];

// Traditional way (mutating)
console.log("Original array:", originalArray);

// Array.with() - immutable update
if (Array.prototype.with) {
  const newArray = originalArray.with(2, 99); // Change index 2 to 99
  console.log("Original after .with():", originalArray); // [1, 2, 3, 4, 5]
  console.log("New array:", newArray); // [1, 2, 99, 4, 5]
} else {
  console.log("Array.with() not supported in this environment");

  // Polyfill demonstration
  Array.prototype.with = function (index, value) {
    const copy = [...this];
    copy[index] = value;
    return copy;
  };

  const newArray = originalArray.with(2, 99);
  console.log("Original after polyfill .with():", originalArray);
  console.log("New array with polyfill:", newArray);
}

// Multiple updates using .with()
const fruits = ["apple", "banana", "orange", "grape"];
console.log("Original fruits:", fruits);

// Chain multiple .with() calls
const updatedFruits = fruits.with(0, "mango").with(2, "kiwi");

console.log("Updated fruits:", updatedFruits);
console.log("Original fruits unchanged:", fruits);

// Negative indices
const numbers = [10, 20, 30, 40, 50];
const withNegativeIndex = numbers.with(-1, 999); // Last element
const withNegativeIndex2 = numbers.with(-2, 888); // Second to last

console.log("Original numbers:", numbers);
console.log("Updated last element:", withNegativeIndex);
console.log("Updated second-to-last:", withNegativeIndex2);

// Comparison with traditional methods
console.log("\nComparison with traditional methods:");

// Traditional splice (mutating)
const arr1 = [1, 2, 3, 4, 5];
arr1.splice(2, 1, 99); // Remove 1 element at index 2, insert 99
console.log("After splice:", arr1); // Original array is modified

// Traditional spread (immutable)
const arr2 = [1, 2, 3, 4, 5];
const arr2Updated = [...arr2.slice(0, 2), 99, ...arr2.slice(3)];
console.log("Original arr2:", arr2);
console.log("Spread method:", arr2Updated);

// Array.with() (immutable)
const arr3 = [1, 2, 3, 4, 5];
const arr3Updated = arr3.with(2, 99);
console.log("Original arr3:", arr3);
console.log("Array.with() method:", arr3Updated);

// Working with objects
const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true },
];

// Update a user object
const updatedUsers = users.with(1, { ...users[1], active: true });
console.log("Original users:", users);
console.log("Updated users:", updatedUsers);

// Function to update object property immutably
function updateUserProperty(users, index, property, value) {
  return users.with(index, { ...users[index], [property]: value });
}

const usersWithNameChange = updateUserProperty(users, 0, "name", "Alice Smith");
console.log("Users with name change:", usersWithNameChange);

// Error handling
try {
  const invalidIndex = originalArray.with(10, "invalid"); // Index out of bounds
  console.log("Invalid index result:", invalidIndex);
} catch (error) {
  console.log("Error with invalid index:", error.message);
}

// Array.with() vs map() for single element update
const scores = [85, 92, 78, 96, 88];

// Using map (less efficient for single update)
const scoresWithMap = scores.map((score, index) => (index === 2 ? 95 : score));

// Using Array.with() (more efficient for single update)
const scoresWithArray = scores.with(2, 95);

console.log("Original scores:", scores);
console.log("Updated with map:", scoresWithMap);
console.log("Updated with .with():", scoresWithArray);

// State management pattern
class ImmutableArray {
  constructor(data) {
    this.data = [...data];
  }

  updateAt(index, value) {
    return new ImmutableArray(this.data.with(index, value));
  }

  get(index) {
    return this.data[index];
  }

  toArray() {
    return [...this.data];
  }
}

const immutableList = new ImmutableArray([1, 2, 3, 4, 5]);
const updatedList = immutableList.updateAt(2, 100);

console.log("Immutable original:", immutableList.toArray());
console.log("Immutable updated:", updatedList.toArray());

// Performance considerations
console.log("\nPerformance comparison:");

const largeArray = Array.from({ length: 10000 }, (_, i) => i);

console.time("Array.with()");
const withResult = largeArray.with(5000, 99999);
console.timeEnd("Array.with()");

console.time("Spread operator");
const spreadResult = [
  ...largeArray.slice(0, 5000),
  99999,
  ...largeArray.slice(5001),
];
console.timeEnd("Spread operator");

console.time("Array.from with map");
const mapResult = Array.from(largeArray, (val, idx) =>
  idx === 5000 ? 99999 : val
);
console.timeEnd("Array.from with map");

// Practical examples
console.log("\nPractical examples:");

// Shopping cart update
const cartItems = [
  { id: 1, name: "Laptop", quantity: 1, price: 1000 },
  { id: 2, name: "Mouse", quantity: 2, price: 25 },
  { id: 3, name: "Keyboard", quantity: 1, price: 75 },
];

function updateCartQuantity(cart, index, newQuantity) {
  return cart.with(index, {
    ...cart[index],
    quantity: newQuantity,
  });
}

const updatedCart = updateCartQuantity(cartItems, 1, 3);
console.log("Updated cart:", updatedCart);

// Game board state
const gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function makeMove(board, row, col, player) {
  return board.with(row, board[row].with(col, player));
}

const boardAfterMove = makeMove(gameBoard, 1, 1, "X");
console.log("Board after move:", boardAfterMove);

// Form field updates
const formData = [
  { field: "name", value: "", valid: false },
  { field: "email", value: "", valid: false },
  { field: "password", value: "", valid: false },
];

function updateFormField(form, index, newValue, isValid) {
  return form.with(index, {
    ...form[index],
    value: newValue,
    valid: isValid,
  });
}

const updatedForm = updateFormField(formData, 0, "John Doe", true);
console.log("Updated form:", updatedForm);
