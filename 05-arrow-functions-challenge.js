"use strict";

console.log("=== Arrow Functions Challenge ===");

// CHALLENGE 1: Syntax variations
// Convert these regular functions to arrow functions
// Some may not be appropriate for arrow functions - identify which ones

const regularFunctions = {
  // Function 1
  add: function (a, b) {
    return a + b;
  },

  // Function 2
  greet: function (name) {
    console.log("Hello " + name);
  },

  // Function 3
  getThis: function () {
    return this;
  },

  // Function 4
  constructor: function (name) {
    this.name = name;
  },

  // Function 5
  generator: function* () {
    yield 1;
    yield 2;
  },

  // Function 6
  async asyncFunction() {
    return Promise.resolve("async");
  },
};

// TODO: Convert appropriate functions to arrow syntax
const arrowFunctions = {
  // Your arrow function conversions here
};

// CHALLENGE 2: 'this' binding differences
// Predict the output of these scenarios

const thisChallenge = {
  name: "ThisChallenge",

  regularMethod: function () {
    const inner = function () {
      return this.name;
    };
    return inner();
  },

  arrowMethod: function () {
    const inner = () => {
      return this.name;
    };
    return inner();
  },

  doubleArrow: () => {
    const inner = () => {
      return this.name;
    };
    return inner();
  },

  mixedNesting: function () {
    const level1 = () => {
      const level2 = function () {
        return this.name;
      };
      return level2();
    };
    return level1();
  },
};

console.log("2a - Regular + inner function:", thisChallenge.regularMethod());
console.log("2b - Regular + inner arrow:", thisChallenge.arrowMethod());
console.log("2c - Arrow + inner arrow:", thisChallenge.doubleArrow());
console.log("2d - Mixed nesting:", thisChallenge.mixedNesting());

// CHALLENGE 3: Arguments object
// What happens to the arguments object in arrow functions?

function regularWithArguments() {
  console.log("Regular arguments:", arguments);

  const inner = function () {
    console.log("Inner regular arguments:", arguments);
  };

  const innerArrow = () => {
    console.log("Inner arrow arguments:", arguments);
  };

  inner("inner", "args");
  innerArrow("arrow", "args");
}

const arrowWithArguments = (...args) => {
  console.log("Arrow rest params:", args);

  const inner = (...innerArgs) => {
    console.log("Nested arrow rest:", innerArgs);
  };

  inner("nested", "args");
};

console.log("3a - Regular function:");
regularWithArguments("outer", "args");

console.log("3b - Arrow function:");
arrowWithArguments("outer", "args");

// CHALLENGE 4: Constructor usage
// Which of these work as constructors?

function RegularConstructor(name) {
  this.name = name;
}

const ArrowConstructor = (name) => {
  this.name = name;
};

const ObjectWithConstructor = {
  RegularMethod: function (name) {
    this.name = name;
  },

  ArrowMethod: (name) => {
    this.name = name;
  },
};

try {
  const regular = new RegularConstructor("Regular");
  console.log("4a - Regular constructor:", regular);
} catch (error) {
  console.log("4a error:", error.message);
}

try {
  const arrow = new ArrowConstructor("Arrow");
  console.log("4b - Arrow constructor:", arrow);
} catch (error) {
  console.log("4b error:", error.message);
}

try {
  const objRegular = new ObjectWithConstructor.RegularMethod("ObjRegular");
  console.log("4c - Object regular constructor:", objRegular);
} catch (error) {
  console.log("4c error:", error.message);
}

// CHALLENGE 5: Method definitions
// What's the difference between these object method definitions?

const methodDefinitions = {
  // Method 1: Traditional function
  method1: function (x) {
    return x * 2;
  },

  // Method 2: Arrow function property
  method2: (x) => {
    return x * 2;
  },

  // Method 3: ES6 method shorthand
  method3(x) {
    return x * 2;
  },

  // Method 4: Arrow function with 'this'
  value: 10,
  method4: function (x) {
    return x * this.value;
  },

  method5: (x) => {
    return x * this.value; // What 'this'?
  },
};

console.log("5a - Traditional function:", methodDefinitions.method1(5));
console.log("5b - Arrow property:", methodDefinitions.method2(5));
console.log("5c - ES6 method:", methodDefinitions.method3(5));
console.log("5d - Traditional with this:", methodDefinitions.method4(5));
console.log("5e - Arrow with this:", methodDefinitions.method5(5));

// CHALLENGE 6: Event handlers
// How do arrow functions behave in event handling scenarios?

class EventHandler {
  constructor() {
    this.count = 0;
    this.name = "EventHandler";
  }

  handleClickRegular() {
    this.count++;
    console.log(`${this.name} count: ${this.count}`);
  }

  handleClickArrow = () => {
    this.count++;
    console.log(`${this.name} count: ${this.count}`);
  };
}

const handler = new EventHandler();

// Simulate event binding where 'this' gets changed
function simulateEventBinding(callback) {
  const fakeElement = { name: "FakeElement" };
  callback.call(fakeElement); // Simulate browser event binding
}

console.log("6a - Regular method as event handler:");
simulateEventBinding(handler.handleClickRegular);

console.log("6b - Arrow method as event handler:");
simulateEventBinding(handler.handleClickArrow);

// CHALLENGE 7: Array methods and callbacks
// When should you use arrow functions vs regular functions in array methods?

const numbers = [1, 2, 3, 4, 5];

const processor = {
  multiplier: 10,

  processWithRegular: function () {
    // Using regular function - what happens to 'this'?
    return numbers.map(function (num) {
      return num * this.multiplier;
    });
  },

  processWithArrow: function () {
    // Using arrow function - what happens to 'this'?
    return numbers.map((num) => {
      return num * this.multiplier;
    });
  },

  processWithBind: function () {
    // Using bind to fix 'this'
    return numbers.map(
      function (num) {
        return num * this.multiplier;
      }.bind(this)
    );
  },

  processWithThisArg: function () {
    // Using thisArg parameter
    return numbers.map(function (num) {
      return num * this.multiplier;
    }, this);
  },
};

console.log("7a - Regular function callback:", processor.processWithRegular());
console.log("7b - Arrow function callback:", processor.processWithArrow());
console.log("7c - Bound function callback:", processor.processWithBind());
console.log("7d - thisArg parameter:", processor.processWithThisArg());

// CHALLENGE 8: Complex nesting scenarios
// Trace 'this' through multiple levels of nesting

const complexNesting = {
  name: "Complex",

  level1Regular: function () {
    console.log("Level 1 regular this:", this.name);

    const level2Arrow = () => {
      console.log("Level 2 arrow this:", this.name);

      const level3Regular = function () {
        console.log("Level 3 regular this:", this.name);

        const level4Arrow = () => {
          console.log("Level 4 arrow this:", this.name);
        };

        level4Arrow();
      };

      level3Regular();
    };

    level2Arrow();
  },

  level1Arrow: () => {
    console.log("Level 1 arrow this:", this.name);

    const level2Regular = function () {
      console.log("Level 2 regular this:", this.name);
    };

    level2Regular();
  },
};

console.log("8a - Complex nesting starting with regular:");
complexNesting.level1Regular();

console.log("8b - Complex nesting starting with arrow:");
complexNesting.level1Arrow();

// CHALLENGE 9: Performance and memory implications
// Understanding when arrow functions create new instances

class PerformanceTest {
  constructor() {
    this.name = "PerformanceTest";

    // Arrow function property - created per instance
    this.arrowMethod = () => {
      return this.name;
    };
  }

  // Regular method - shared on prototype
  regularMethod() {
    return this.name;
  }

  // Method that returns arrow function - new function each call
  getArrowFunction() {
    return () => {
      return this.name;
    };
  }

  // Method that returns bound function - new function each call
  getBoundFunction() {
    return function () {
      return this.name;
    }.bind(this);
  }
}

const perf1 = new PerformanceTest();
const perf2 = new PerformanceTest();

console.log(
  "9a - Arrow methods same?",
  perf1.arrowMethod === perf2.arrowMethod
);
console.log(
  "9b - Regular methods same?",
  perf1.regularMethod === perf2.regularMethod
);
console.log(
  "9c - Generated arrows same?",
  perf1.getArrowFunction() === perf1.getArrowFunction()
);

// CHALLENGE 10: When NOT to use arrow functions
// Identify problematic uses of arrow functions

const problematicCases = {
  // Case 1: Object methods that need 'this'
  name: "ProblematicCases",
  getName: () => {
    return this.name; // Problem: 'this' doesn't refer to the object
  },

  // Case 2: Event handler that needs to bind to element
  setupEventHandler: function () {
    // In a real browser, this would be problematic:
    // button.addEventListener('click', () => {
    //     this.style.color = 'red';  // 'this' is not the button
    // });
  },

  // Case 3: Prototype methods
  // Don't do this:
  // User.prototype.getName = () => {
  //     return this.name;  // 'this' won't be the instance
  // };

  // Case 4: Dynamic context methods
  callWithContext: function (fn, context) {
    return fn.call(context);
  },
};

console.log("10a - Problematic arrow method:", problematicCases.getName());

// Test dynamic context
const arrowFn = () => "arrow";
const regularFn = function () {
  return this.value;
};
const testContext = { value: "context" };

console.log(
  "10b - Arrow with call:",
  problematicCases.callWithContext(arrowFn, testContext)
);
console.log(
  "10c - Regular with call:",
  problematicCases.callWithContext(regularFn, testContext)
);

// BONUS: Create a utility that demonstrates arrow function behavior
class ArrowFunctionAnalyzer {
  constructor() {
    this.testValue = "analyzer";
  }

  // TODO: Create methods that demonstrate:
  // 1. When arrow functions preserve 'this' correctly
  // 2. When they cause problems
  // 3. How to choose between arrow and regular functions

  analyzeFunction(fn) {
    // TODO: Analyze whether a function is arrow or regular
    // Return information about its 'this' binding behavior
  }
}

// Discussion questions:
console.log("\n=== Discussion Questions ===");
console.log("1. When should you use arrow functions vs regular functions?");
console.log("2. Why can't arrow functions be used as constructors?");
console.log("3. How do arrow functions affect the arguments object?");
console.log("4. What are the performance implications of arrow functions?");
console.log("5. How do arrow functions interact with 'use strict'?");
