"use strict";

console.log("=== Array reduce & reduceRight ===");

const numbers = [1, 2, 3, 4, 5];

// Basic reduce - sum
const sum = numbers.reduce((accumulator, current) => {
  console.log(
    `Acc: ${accumulator}, Current: ${current}, Result: ${accumulator + current}`
  );
  return accumulator + current;
}, 0);

console.log("Sum:", sum);

// Without initial value (uses first element as initial)
const sumNoInitial = numbers.reduce((acc, curr) => acc + curr);
console.log("Sum without initial:", sumNoInitial);

// Product
const product = numbers.reduce((acc, curr) => acc * curr, 1);
console.log("Product:", product);

// Maximum value
const max = numbers.reduce((acc, curr) => (curr > acc ? curr : acc));
console.log("Maximum:", max);

// Alternative max using Math.max
const maxMath = numbers.reduce((acc, curr) => Math.max(acc, curr));
console.log("Max with Math.max:", maxMath);

// Working with objects
const expenses = [
  { category: "food", amount: 50 },
  { category: "transport", amount: 30 },
  { category: "food", amount: 25 },
  { category: "entertainment", amount: 40 },
  { category: "transport", amount: 15 },
];

// Sum all expenses
const totalExpenses = expenses.reduce(
  (total, expense) => total + expense.amount,
  0
);
console.log("Total expenses:", totalExpenses);

// Group by category
const expensesByCategory = expenses.reduce((acc, expense) => {
  const { category, amount } = expense;
  acc[category] = (acc[category] || 0) + amount;
  return acc;
}, {});
console.log("Expenses by category:", expensesByCategory);

// Convert array to object
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const usersById = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
console.log("Users by ID:", usersById);

// Flatten array
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flattened = nestedArray.reduce((acc, curr) => acc.concat(curr), []);
console.log("Flattened:", flattened);

// Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const fruitCount = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log("Fruit count:", fruitCount);

// Pipeline of transformations
const pipeline = [1, 2, 3, 4, 5].reduce(
  (acc, num) => {
    return acc.map((n) => n * 2).filter((n) => n > 4);
  },
  [1, 2, 3, 4, 5]
);
console.log("Pipeline result:", pipeline);

// Better pipeline approach
const processNumbers = numbers.reduce(
  (result, num) => {
    if (num % 2 === 0) {
      result.even.push(num * 2);
    } else {
      result.odd.push(num * 3);
    }
    return result;
  },
  { even: [], odd: [] }
);
console.log("Processed numbers:", processNumbers);

// reduceRight - right to left processing
console.log("\n=== reduceRight ===");

const words = ["Hello", "beautiful", "world"];

// Concatenate from right to left
const reversedSentence = words.reduceRight((acc, word) => acc + " " + word);
console.log("Reversed sentence:", reversedSentence);

// Compare reduce vs reduceRight
const leftToRight = words.reduce((acc, word) => acc + " " + word);
const rightToLeft = words.reduceRight((acc, word) => acc + " " + word);

console.log("Left to right:", leftToRight);
console.log("Right to left:", rightToLeft);

// Mathematical operations where order matters
const operations = [2, 3, 4];

const leftDivision = operations.reduce((acc, num) => acc / num); // ((10 / 2) / 3) / 4
const rightDivision = operations.reduceRight((acc, num) => num / acc); // 2 / (3 / 4)

console.log(
  "Left division (10 as start):",
  operations.reduce((acc, num) => acc / num, 10)
);
console.log(
  "Right division (10 as start):",
  operations.reduceRight((acc, num) => num / acc, 10)
);

// Function composition with reduceRight
const functions = [(x) => x + 1, (x) => x * 2, (x) => x - 3];

const compose = functions.reduceRight((acc, fn) => (value) => acc(fn(value)));
const pipe = functions.reduce((acc, fn) => (value) => fn(acc(value)));

console.log("Compose (right to left):", compose(5)); // ((5 + 1) * 2) - 3 = 9
console.log("Pipe (left to right):", pipe(5)); // ((5 + 1) * 2) - 3 = 9

// Building nested structure from right
const items = ["a", "b", "c"];
const nested = items.reduceRight((acc, item) => ({ [item]: acc }), null);
console.log("Nested structure:", nested);

// Error handling in reduce
const mixedNumbers = [1, "2", 3, "invalid", 5];
const safeSum = mixedNumbers.reduce((acc, curr) => {
  const num = Number(curr);
  return isNaN(num) ? acc : acc + num;
}, 0);
console.log("Safe sum:", safeSum);

// Complex example: Shopping cart
const cart = [
  { product: "Laptop", price: 1000, quantity: 1, tax: 0.1 },
  { product: "Mouse", price: 25, quantity: 2, tax: 0.1 },
  { product: "Keyboard", price: 75, quantity: 1, tax: 0.1 },
];

const cartSummary = cart.reduce(
  (summary, item) => {
    const subtotal = item.price * item.quantity;
    const tax = subtotal * item.tax;
    const total = subtotal + tax;

    return {
      items: summary.items + item.quantity,
      subtotal: summary.subtotal + subtotal,
      tax: summary.tax + tax,
      total: summary.total + total,
    };
  },
  { items: 0, subtotal: 0, tax: 0, total: 0 }
);

console.log("Cart summary:", cartSummary);

// Performance note
console.log("\nPerformance comparison:");
const largeArray = Array.from({ length: 100000 }, (_, i) => i + 1);

console.time("reduce sum");
const reduceSum = largeArray.reduce((acc, num) => acc + num, 0);
console.timeEnd("reduce sum");

console.time("for loop sum");
let forSum = 0;
for (let i = 0; i < largeArray.length; i++) {
  forSum += largeArray[i];
}
console.timeEnd("for loop sum");

console.log("Results equal:", reduceSum === forSum);
