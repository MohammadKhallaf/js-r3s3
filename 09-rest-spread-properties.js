"use strict";

console.log("=== Rest/Spread Properties ===");

// Object rest properties
const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  password: "secret123",
  role: "admin",
};

// Extract specific properties, collect the rest
const { password, ...publicUser } = user;
console.log("Public user (no password):", publicUser);
console.log("Password was:", password);

// Multiple extractions
const { id, name, ...otherDetails } = user;
console.log("ID:", id);
console.log("Name:", name);
console.log("Other details:", otherDetails);

// Function parameter destructuring with rest
function updateUser({ id, ...updates }) {
  console.log(`Updating user ${id} with:`, updates);
  return { id, ...updates };
}

const updatedUser = updateUser({
  id: 1,
  name: "Alice Updated",
  email: "alice.new@example.com",
  role: "super-admin",
});

console.log("Updated user:", updatedUser);

// Removing properties from objects
const settings = {
  theme: "dark",
  notifications: true,
  autoSave: false,
  debugMode: true,
};

const { debugMode, ...productionSettings } = settings;
console.log("Production settings:", productionSettings);

// Nested object rest
const profile = {
  personal: {
    firstName: "John",
    lastName: "Doe",
    age: 30,
  },
  professional: {
    title: "Developer",
    company: "Tech Corp",
    salary: 75000,
  },
};

const {
  personal: { age, ...personalInfo },
  professional,
} = profile;

console.log("Age:", age);
console.log("Personal info:", personalInfo);
console.log("Professional:", professional);

// Combining with spread for object transformation
function sanitizeUser(user) {
  const { password, creditCard, ...safeUser } = user;
  return {
    ...safeUser,
    lastLogin: new Date().toISOString(),
  };
}

const sensitiveUser = {
  id: 1,
  name: "Bob",
  email: "bob@example.com",
  password: "secret",
  creditCard: "1234-5678-9012-3456",
  role: "user",
};

console.log("Sanitized user:", sanitizeUser(sensitiveUser));
