"use strict";

console.log("=== Hoisting, let, const ===");

// VAR - Hoisted and function-scoped
console.log("Before declaration:", typeof varVariable); // undefined
var varVariable = "I'm hoisted";

function demonstrateVarHoisting() {
  console.log("Inside function:", varVariable); // undefined
  if (true) {
    var varVariable = "Function scoped";
  }
  console.log("After if block:", varVariable); // "Function scoped"
}

// LET - Block-scoped, temporal dead zone
function demonstrateLet() {
  // console.log(letVariable); // ReferenceError: Cannot access before initialization

  if (true) {
    let letVariable = "Block scoped";
    console.log("Inside block:", letVariable);
  }
  // console.log("Outside block:", letVariable); // ReferenceError
}

// CONST - Block-scoped, cannot be reassigned
function demonstrateConst() {
  const constVariable = "Cannot change";
  // constVariable = "New value"; // TypeError

  const objectExample = { name: "John" };
  objectExample.name = "Jane"; // This is allowed - object content can change
  console.log("Modified object:", objectExample);
}

demonstrateVarHoisting();
demonstrateLet();
demonstrateConst();
