"use strict";

console.log("=== Hoisting, let, const Challenge ===");

// CHALLENGE 1: Predict the output
// What gets logged in each case?

console.log("=== Challenge 1: Hoisting Behavior ===");

function challenge1() {
  console.log("1a:", typeof a); // What is this?
  console.log("1b:", typeof b); // What about this?
  console.log("1c:", typeof c); // And this?

  var a = 1;
  let b = 2;
  const c = 3;

  console.log("1d:", a, b, c);
}

// CHALLENGE 2: Temporal Dead Zone
// Which of these throw errors?

function challenge2() {
  console.log("=== Challenge 2: Temporal Dead Zone ===");

  // Test case 1
  try {
    console.log("2a:", x);
    let x = 1;
  } catch (error) {
    console.log("2a error:", error.name);
  }

  // Test case 2
  try {
    console.log("2b:", y);
    const y = 2;
  } catch (error) {
    console.log("2b error:", error.name);
  }

  // Test case 3
  try {
    console.log("2c:", z);
    var z = 3;
  } catch (error) {
    console.log("2c error:", error.name);
  }
}

// CHALLENGE 3: Block scope complexity
// What values are accessible where?

function challenge3() {
  console.log("=== Challenge 3: Block Scope ===");

  var a = 1;
  let b = 2;
  const c = 3;

  if (true) {
    var a = 10; // What happens to outer 'a'?
    let b = 20; // What about outer 'b'?
    const c = 30; // And outer 'c'?

    console.log("3a - Inside block:", a, b, c);
  }

  console.log("3b - Outside block:", a, b, c);

  for (var i = 0; i < 3; i++) {
    // What is 'i' after the loop?
  }
  console.log(
    "3c - After var loop:",
    typeof i !== "undefined" ? i : "undefined"
  );

  for (let j = 0; j < 3; j++) {
    // What is 'j' after the loop?
  }
  try {
    console.log("3d - After let loop:", j);
  } catch (error) {
    console.log("3d - After let loop:", error.name);
  }
}

// CHALLENGE 4: Function declarations vs expressions
// When are these functions available?

function challenge4() {
  console.log("=== Challenge 4: Function Declarations ===");

  try {
    console.log("4a:", typeof funcDeclaration);
    console.log("4b:", typeof funcExpression);
    console.log("4c:", typeof arrowFunction);
    console.log("4d:", typeof letFunction);
    console.log("4e:", typeof constFunction);
  } catch (error) {
    console.log("4 error:", error.message);
  }

  function funcDeclaration() {
    return "declaration";
  }
  var funcExpression = function () {
    return "expression";
  };
  var arrowFunction = () => "arrow";
  let letFunction = function () {
    return "let";
  };
  const constFunction = function () {
    return "const";
  };
}

// CHALLENGE 5: Loop closures classic problem
// What gets logged and why?

function challenge5() {
  console.log("=== Challenge 5: Loop Closures ===");

  // Version 1: var
  console.log("5a - var version:");
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var i:", i), 10);
  }

  // Version 2: let
  console.log("5b - let version:");
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log("let i:", i), 20);
  }

  // Version 3: var with IIFE
  console.log("5c - var with IIFE:");
  for (var i = 0; i < 3; i++) {
    (function (index) {
      setTimeout(() => console.log("IIFE i:", index), 30);
    })(i);
  }
}

// CHALLENGE 6: Const reassignment edge cases
// Which of these work and which throw errors?

function challenge6() {
  console.log("=== Challenge 6: Const Edge Cases ===");

  const obj = { name: "Alice" };
  const arr = [1, 2, 3];
  const func = function () {
    return "test";
  };

  try {
    obj.name = "Bob"; // Does this work?
    console.log("6a - Object mutation:", obj.name);
  } catch (error) {
    console.log("6a error:", error.message);
  }

  try {
    arr.push(4); // What about array mutation?
    console.log("6b - Array mutation:", arr);
  } catch (error) {
    console.log("6b error:", error.message);
  }

  try {
    func.customProp = "added"; // Function properties?
    console.log("6c - Function property:", func.customProp);
  } catch (error) {
    console.log("6c error:", error.message);
  }

  try {
    // obj = { name: "Charlie" };  // Uncomment to test reassignment
    console.log("6d - Reassignment would fail");
  } catch (error) {
    console.log("6d error:", error.message);
  }
}

// CHALLENGE 7: Variable shadowing
// Which variable is accessed in each scope?

function challenge7() {
  console.log("=== Challenge 7: Variable Shadowing ===");

  let x = "outer";

  function inner() {
    console.log("7a - In inner, before declaration:", x); // What is x here?
    let x = "inner";
    console.log("7b - In inner, after declaration:", x);

    if (true) {
      let x = "block";
      console.log("7c - In block:", x);
    }

    console.log("7d - In inner, after block:", x);
  }

  inner();
  console.log("7e - In outer:", x);
}

// CHALLENGE 8: Complex TDZ scenarios
// When do these variables enter the TDZ?

function challenge8() {
  console.log("=== Challenge 8: Complex TDZ ===");

  function test(param = getValue()) {
    function getValue() {
      return variable; // Can this access the let variable below?
    }

    let variable = "test";
    return param;
  }

  try {
    const result = test();
    console.log("8a - Result:", result);
  } catch (error) {
    console.log("8a error:", error.name);
  }

  // Another TDZ case
  try {
    const a = b + 1; // Can 'a' depend on 'b' before 'b' is declared?
    const b = 2;
    console.log("8b - a, b:", a, b);
  } catch (error) {
    console.log("8b error:", error.name);
  }
}

// CHALLENGE 9: Hoisting with classes
// How do class declarations behave?

function challenge9() {
  console.log("=== Challenge 9: Class Hoisting ===");

  try {
    const instance = new MyClass(); // Does this work?
    console.log("9a - Class instance:", instance);
  } catch (error) {
    console.log("9a error:", error.name);
  }

  class MyClass {
    constructor() {
      this.name = "test";
    }
  }

  try {
    const instance2 = new MyClass(); // What about now?
    console.log("9b - Class instance:", instance2);
  } catch (error) {
    console.log("9b error:", error.name);
  }
}

// CHALLENGE 10: Mixed declarations
// What happens when var, let, and const interact?

function challenge10() {
  console.log("=== Challenge 10: Mixed Declarations ===");

  try {
    var a = 1;
    let a = 2; // Can we redeclare with let?
    console.log("10a - Redeclaration:", a);
  } catch (error) {
    console.log("10a error:", error.name);
  }

  try {
    let b = 1;
    var b = 2; // Can we redeclare with var?
    console.log("10b - Redeclaration:", b);
  } catch (error) {
    console.log("10b error:", error.name);
  }

  try {
    const c = 1;
    const c = 2; // Can we redeclare const?
    console.log("10c - Redeclaration:", c);
  } catch (error) {
    console.log("10c error:", error.name);
  }
}

// Run all challenges
try {
  challenge1();
} catch (e) {
  console.log("Challenge 1 failed:", e.message);
}
try {
  challenge2();
} catch (e) {
  console.log("Challenge 2 failed:", e.message);
}
try {
  challenge3();
} catch (e) {
  console.log("Challenge 3 failed:", e.message);
}
try {
  challenge4();
} catch (e) {
  console.log("Challenge 4 failed:", e.message);
}
try {
  challenge5();
} catch (e) {
  console.log("Challenge 5 failed:", e.message);
}
try {
  challenge6();
} catch (e) {
  console.log("Challenge 6 failed:", e.message);
}
try {
  challenge7();
} catch (e) {
  console.log("Challenge 7 failed:", e.message);
}
try {
  challenge8();
} catch (e) {
  console.log("Challenge 8 failed:", e.message);
}
try {
  challenge9();
} catch (e) {
  console.log("Challenge 9 failed:", e.message);
}
try {
  challenge10();
} catch (e) {
  console.log("Challenge 10 failed:", e.message);
}

// BONUS: Write a function that demonstrates all three declaration types
// and their different behaviors in the same scope
function bonusChallenge() {
  console.log("\n=== BONUS: Declaration Behaviors ===");

  // TODO: Create a function that shows:
  // 1. How hoisting affects each declaration type
  // 2. How redeclaration rules differ
  // 3. How block scoping works with each
  // 4. How the temporal dead zone affects let/const

  // Your implementation here...
}
