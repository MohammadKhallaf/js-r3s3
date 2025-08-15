"use strict";

console.log("=== The 'this' Keyword ===");

// Global context
console.log("Global this:", this); // undefined in strict mode

// Object method
const person = {
  name: "Alice",
  greet: function () {
    console.log("Method this:", this.name);

    // Inner function loses context
    function innerFunction() {
      console.log("Inner function this:", this); // undefined
    }
    innerFunction();
  },
};

// Function call
function regularFunction() {
  console.log("Regular function this:", this);
}

// Constructor function
function Person(name) {
  this.name = name;
  this.introduce = function () {
    console.log("Constructor this:", this.name);
  };
}

// Explicit binding
const anotherPerson = { name: "Bob" };

// Demonstrations
person.greet();
regularFunction();

const alice = new Person("Alice");
alice.introduce();

// Call, apply, bind
person.greet.call(anotherPerson);
const boundGreet = person.greet.bind(anotherPerson);
boundGreet();
