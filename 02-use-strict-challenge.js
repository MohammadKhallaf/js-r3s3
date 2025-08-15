// DO NOT ADD "use strict" at the top - this is part of the challenge!

console.log("=== Use Strict Challenge ===");

// CHALLENGE 1: Predict the output
// What will happen in strict vs non-strict mode?

function challenge1() {
  // TODO: Predict what happens here in strict vs non-strict mode
  unknownVariable = "I exist now!";
  return unknownVariable;
}

function challenge1Strict() {
  "use strict";
  try {
    unknownVariable2 = "Will this work?";
    return unknownVariable2;
  } catch (error) {
    return error.message;
  }
}

// CHALLENGE 2: This binding
// What is 'this' in each case?

function regularFunction() {
  return this;
}

function strictFunction() {
  "use strict";
  return this;
}

const obj = {
  method: function () {
    return this;
  },
  strictMethod: function () {
    "use strict";
    return this;
  },
};

// CHALLENGE 3: Octal literals
// What happens with these numbers?

function octalTest() {
  // TODO: What do these evaluate to in strict vs non-strict?
  const num1 = 010; // What is this?
  const num2 = 077; // And this?

  return [num1, num2];
}

function octalTestStrict() {
  "use strict";
  try {
    const num1 = 010; // What happens here?
    return num1;
  } catch (error) {
    return error.message;
  }
}

// CHALLENGE 4: Duplicate parameter names
// Which of these functions are valid?

function duplicateParams(a, a, b) {
  return a + b; // Which 'a' is used?
}

function duplicateParamsStrict(a, a, b) {
  "use strict";
  return a + b; // Will this even run?
}

// CHALLENGE 5: Delete operator restrictions
// What can and can't be deleted?

var globalVar = "global";
let globalLet = "let";
const globalConst = "const";

function deleteTest() {
  var localVar = "local";

  // TODO: Which of these delete operations succeed/fail in strict mode?
  const results = {};

  try {
    results.globalVar = delete globalVar;
  } catch (e) {
    results.globalVar = "error";
  }
  try {
    results.globalLet = delete globalLet;
  } catch (e) {
    results.globalLet = "error";
  }
  try {
    results.localVar = delete localVar;
  } catch (e) {
    results.localVar = "error";
  }
  try {
    results.objectProp = delete {}["prop"];
  } catch (e) {
    results.objectProp = "error";
  }

  return results;
}

function deleteTestStrict() {
  "use strict";
  var localVar = "local";

  const results = {};

  try {
    results.globalVar = delete globalVar;
  } catch (e) {
    results.globalVar = "error";
  }
  try {
    results.localVar = delete localVar;
  } catch (e) {
    results.localVar = "error";
  }
  try {
    results.objectProp = delete {}["prop"];
  } catch (e) {
    results.objectProp = "error";
  }

  return results;
}

// CHALLENGE 6: Arguments object modifications
// How does strict mode affect the arguments object?

function argumentsTest(a, b) {
  arguments[0] = "modified";
  a = "changed";

  return {
    arguments0: arguments[0],
    paramA: a,
    connected: arguments[0] === a,
  };
}

function argumentsTestStrict(a, b) {
  "use strict";
  arguments[0] = "modified";
  a = "changed";

  return {
    arguments0: arguments[0],
    paramA: a,
    connected: arguments[0] === a,
  };
}

// CHALLENGE 7: Reserved words
// What happens when using future reserved words?

function reservedWordsTest() {
  // TODO: Which of these cause errors in strict mode?
  try {
    var interface = "test1"; // 'interface' is reserved in strict mode
    return "no error";
  } catch (e) {
    return "error: " + e.message;
  }
}

function reservedWordsTestStrict() {
  "use strict";
  try {
    var interface = "test1";
    return "no error";
  } catch (e) {
    return "error: " + e.message;
  }
}

// CHALLENGE 8: with statement
// The 'with' statement is forbidden in strict mode

function withStatementTest() {
  const obj = { x: 1, y: 2 };

  try {
    with (obj) {
      return x + y; // Uses obj.x and obj.y
    }
  } catch (e) {
    return "error: " + e.message;
  }
}

function withStatementTestStrict() {
  "use strict";
  const obj = { x: 1, y: 2 };

  try {
    // TODO: What happens if we try to use 'with' here?
    // Uncomment the next lines to test:
    // with (obj) {
    //     return x + y;
    // }
    return "with statement test";
  } catch (e) {
    return "error: " + e.message;
  }
}

// CHALLENGE 9: Eval scope
// How does strict mode affect eval?

function evalScopeTest() {
  eval("var evalVar = 'I exist in function scope';");

  try {
    return evalVar; // Can we access evalVar?
  } catch (e) {
    return "error: " + e.message;
  }
}

function evalScopeTestStrict() {
  "use strict";
  eval("var evalVar = 'I exist only in eval scope';");

  try {
    return evalVar; // Can we access evalVar in strict mode?
  } catch (e) {
    return "error: " + e.message;
  }
}

// CHALLENGE 10: Mixed mode function
// What happens when strict and non-strict code interact?

function mixedModeTest() {
  // Non-strict function
  unknownVar = "created in non-strict";

  function inner() {
    "use strict";
    try {
      return unknownVar; // Can strict function access non-strict variable?
    } catch (e) {
      return "error: " + e.message;
    }
  }

  return inner();
}

// Test runner
console.log("Challenge 1 - Non-strict:", challenge1());
console.log("Challenge 1 - Strict:", challenge1Strict());

console.log("Challenge 2 - Regular function this:", typeof regularFunction());
console.log("Challenge 2 - Strict function this:", strictFunction());
console.log("Challenge 2 - Object method this:", typeof obj.method());
console.log(
  "Challenge 2 - Object strict method this:",
  typeof obj.strictMethod()
);

console.log("Challenge 3 - Octal non-strict:", octalTest());
console.log("Challenge 3 - Octal strict:", octalTestStrict());

try {
  console.log("Challenge 4 - Duplicate params:", duplicateParams(1, 2, 3));
} catch (e) {
  console.log("Challenge 4 - Duplicate params error:", e.message);
}

console.log("Challenge 5 - Delete non-strict:", deleteTest());
console.log("Challenge 5 - Delete strict:", deleteTestStrict());

console.log(
  "Challenge 6 - Arguments non-strict:",
  argumentsTest("original", "param")
);
console.log(
  "Challenge 6 - Arguments strict:",
  argumentsTestStrict("original", "param")
);

console.log("Challenge 7 - Reserved words non-strict:", reservedWordsTest());
console.log("Challenge 7 - Reserved words strict:", reservedWordsTestStrict());

console.log("Challenge 8 - With statement non-strict:", withStatementTest());
console.log("Challenge 8 - With statement strict:", withStatementTestStrict());

console.log("Challenge 9 - Eval scope non-strict:", evalScopeTest());
console.log("Challenge 9 - Eval scope strict:", evalScopeTestStrict());

console.log("Challenge 10 - Mixed mode:", mixedModeTest());

// BONUS QUESTIONS FOR DISCUSSION:
console.log("\n=== Discussion Questions ===");
console.log("1. Why does 'use strict' make JavaScript safer?");
console.log("2. Should you always use strict mode in modern JavaScript?");
console.log("3. How does strict mode help with debugging?");
console.log("4. What are the performance implications of strict mode?");
console.log("5. How do modules automatically enable strict mode?");
