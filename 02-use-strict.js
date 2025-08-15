// Without strict mode
function withoutStrict() {
  // This creates a global variable (bad!)
  undeclaredVariable = "I'm global now!";
  return undeclaredVariable;
}

// With strict mode
function withStrict() {
  "use strict";

  // This will throw an error
  try {
    undeclaredVariable2 = "This will fail";
  } catch (error) {
    console.log("Caught error:", error.message);
  }

  // Proper declaration
  let properVariable = "This is correct";
  return properVariable;
}

console.log("=== Use Strict Demo ===");
console.log("Without strict:", withoutStrict());
console.log("With strict:", withStrict());

// Global strict mode (recommended for modern code)
("use strict");

// Now all code below runs in strict mode
