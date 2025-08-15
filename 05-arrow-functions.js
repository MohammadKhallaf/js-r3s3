"use strict";

console.log("=== Arrow Functions ===");

// Traditional function vs Arrow function
const traditional = function (x) {
  return x * 2;
};

const arrow = (x) => x * 2;

console.log("Traditional:", traditional(5));
console.log("Arrow:", arrow(5));

// Arrow function variations
const noParams = () => "No parameters";
const oneParam = (x) => x + 1;
const multipleParams = (x, y) => x + y;
const blockBody = (x, y) => {
  const result = x * y;
  return result;
};

// 'this' binding difference
const objectWithMethods = {
  name: "Test Object",

  traditionalMethod: function () {
    console.log("Traditional method this:", this.name);

    // Traditional function loses 'this'
    setTimeout(function () {
      console.log("setTimeout traditional:", this.name); // undefined
    }, 100);

    // Arrow function preserves 'this'
    setTimeout(() => {
      console.log("setTimeout arrow:", this.name); // "Test Object"
    }, 200);
  },

  arrowMethod: () => {
    console.log("Arrow method this:", this.name); // undefined - no own 'this'
  },
};

objectWithMethods.traditionalMethod();
objectWithMethods.arrowMethod();

// Array methods with arrows
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log("Doubled:", doubled);
