"use strict";

console.log("=== Array every & some ===");

const numbers = [2, 4, 6, 8, 10];
const mixedNumbers = [1, 2, 3, 4, 5];

// every() - checks if ALL elements pass the test
const allEven = numbers.every((num) => num % 2 === 0);
const allPositive = numbers.every((num) => num > 0);
const allMixedEven = mixedNumbers.every((num) => num % 2 === 0);

console.log("All numbers are even:", allEven); // true
console.log("All numbers are positive:", allPositive); // true
console.log("All mixed numbers are even:", allMixedEven); // false

// some() - checks if AT LEAST ONE element passes the test
const someEven = mixedNumbers.some((num) => num % 2 === 0);
const someGreaterThanFive = mixedNumbers.some((num) => num > 5);
const someNegative = mixedNumbers.some((num) => num < 0);

console.log("Some mixed numbers are even:", someEven); // true
console.log("Some numbers > 5:", someGreaterThanFive); // false
console.log("Some numbers negative:", someNegative); // false

// Working with objects
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 30, active: true },
  { name: "Charlie", age: 35, active: true },
  { name: "Diana", age: 20, active: false },
];

const allActive = users.every((user) => user.active);
const allAdults = users.every((user) => user.age >= 18);
const someInactive = users.some((user) => !user.active);
const someMinors = users.some((user) => user.age < 18);

console.log("All users active:", allActive); // false
console.log("All users adults:", allAdults); // true
console.log("Some users inactive:", someInactive); // true
console.log("Some users minors:", someMinors); // false

// String validations
const passwords = ["Password123!", "weakpass", "Strong@Pass1", "12345"];

const allStrongPasswords = passwords.every((password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
});

const someStrongPasswords = passwords.some((password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
});

console.log("All passwords are strong:", allStrongPasswords); // false
console.log("Some passwords are strong:", someStrongPasswords); // true

// Form validation example
const formFields = [
  { name: "email", value: "user@example.com", required: true },
  { name: "password", value: "secretpass", required: true },
  { name: "age", value: "25", required: true },
  { name: "newsletter", value: "", required: false },
];

const allRequiredFieldsFilled = formFields.every((field) => {
  if (field.required) {
    return field.value.trim() !== "";
  }
  return true; // Optional fields always pass
});

const hasAnyValue = formFields.some((field) => field.value.trim() !== "");

console.log("All required fields filled:", allRequiredFieldsFilled); // true
console.log("Has any value:", hasAnyValue); // true

// Array of arrays validation
const coordinates = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
];

const allValidCoordinates = coordinates.every(
  (coord) =>
    Array.isArray(coord) &&
    coord.length === 2 &&
    coord.every((n) => typeof n === "number")
);

const someInvalidCoordinates = coordinates.some(
  (coord) =>
    !Array.isArray(coord) ||
    coord.length !== 2 ||
    coord.some((n) => typeof n !== "number")
);

console.log("All coordinates valid:", allValidCoordinates); // true
console.log("Some coordinates invalid:", someInvalidCoordinates); // false

// Permissions check
const permissions = ["read", "write", "delete"];
const userPermissions = ["read", "write"];
const adminPermissions = ["read", "write", "delete", "admin"];

const hasAllRequiredPermissions = permissions.every((permission) =>
  userPermissions.includes(permission)
);

const hasAnyPermission = permissions.some((permission) =>
  userPermissions.includes(permission)
);

const hasAdminPermissions = adminPermissions.some(
  (permission) => permission === "admin"
);

console.log("User has all required permissions:", hasAllRequiredPermissions); // false
console.log("User has any permission:", hasAnyPermission); // true
console.log("Has admin permissions:", hasAdminPermissions); // true

// Short-circuiting behavior
console.log("\nShort-circuiting demonstration:");

const shortCircuitEvery = [1, 2, 3, 4, 5].every((num) => {
  console.log("Checking every:", num);
  return num < 3; // Will stop at 3
});

const shortCircuitSome = [1, 2, 3, 4, 5].some((num) => {
  console.log("Checking some:", num);
  return num > 2; // Will stop at 3
});

console.log("Every result:", shortCircuitEvery); // false
console.log("Some result:", shortCircuitSome); // true

// Edge cases
const emptyArray = [];
const emptyEvery = emptyArray.every((x) => false); // true (vacuous truth)
const emptySome = emptyArray.some((x) => true); // false

console.log("Empty array every (always false):", emptyEvery); // true
console.log("Empty array some (always true):", emptySome); // false

// Complex object validation
const products = [
  { name: "Laptop", price: 1000, inStock: true, category: "electronics" },
  { name: "Book", price: 20, inStock: true, category: "books" },
  { name: "Phone", price: 800, inStock: false, category: "electronics" },
];

const allProductsValid = products.every((product) => {
  return (
    product.name &&
    typeof product.price === "number" &&
    product.price > 0 &&
    typeof product.inStock === "boolean" &&
    product.category
  );
});

const anyProductAvailable = products.some((product) => product.inStock);
const anyElectronicsAvailable = products.some(
  (product) => product.category === "electronics" && product.inStock
);

console.log("All products valid:", allProductsValid); // true
console.log("Any product available:", anyProductAvailable); // true
console.log("Any electronics available:", anyElectronicsAvailable); // false

// Using with index
const sequence = [0, 1, 2, 3, 4];
const isIncreasingSequence = sequence.every(
  (num, index) => index === 0 || num === sequence[index - 1] + 1
);

console.log("Is increasing sequence:", isIncreasingSequence); // true

// Practical example: Feature flags
const features = [
  { name: "dark-mode", enabled: true, requiredVersion: "1.0.0" },
  { name: "new-ui", enabled: false, requiredVersion: "2.0.0" },
  { name: "analytics", enabled: true, requiredVersion: "1.5.0" },
];

const currentVersion = "1.8.0";

function compareVersions(current, required) {
  // Simplified version comparison
  return current >= required;
}

const allFeaturesCompatible = features.every((feature) =>
  compareVersions(currentVersion, feature.requiredVersion)
);

const anyFeatureEnabled = features.some((feature) => feature.enabled);

console.log("All features compatible:", allFeaturesCompatible); // false
console.log("Any feature enabled:", anyFeatureEnabled); // true
