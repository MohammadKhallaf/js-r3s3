"use strict";

console.log("=== This Keyword Challenge ===");

// CHALLENGE 1: Predict 'this' in different contexts
// What is 'this' in each scenario?

const challenge1 = {
  name: "Challenge1",

  regularMethod: function () {
    return this.name;
  },

  arrowMethod: () => {
    return this.name;
  },

  nestedFunction: function () {
    function inner() {
      return this.name;
    }
    return inner();
  },

  nestedArrow: function () {
    const inner = () => {
      return this.name;
    };
    return inner();
  },
};

console.log("1a - Regular method:", challenge1.regularMethod());
console.log("1b - Arrow method:", challenge1.arrowMethod());
console.log("1c - Nested function:", challenge1.nestedFunction());
console.log("1d - Nested arrow:", challenge1.nestedArrow());

// CHALLENGE 2: Method extraction
// What happens when methods are extracted from objects?

const challenge2 = {
  value: 42,
  getValue: function () {
    return this.value;
  },
};

const extractedMethod = challenge2.getValue;
const boundMethod = challenge2.getValue.bind(challenge2);

console.log("2a - Direct call:", challenge2.getValue());
console.log("2b - Extracted method:", extractedMethod());
console.log("2c - Bound method:", boundMethod());

// CHALLENGE 3: Event handler simulation
// How does 'this' work in event handlers?

const button = {
  id: "myButton",
  clicked: false,

  handleClick: function () {
    this.clicked = true;
    return this.id;
  },

  handleClickArrow: () => {
    this.clicked = true; // What 'this' is this?
    return this.id;
  },
};

// Simulate event binding
function simulateClick(handler, context) {
  return handler.call(context);
}

console.log("4a - Regular handler:", simulateClick(button.handleClick, button));
console.log(
  "4b - Arrow handler:",
  simulateClick(button.handleClickArrow, button)
);

// CHALLENGE 4: Call, apply, bind complexity
// Master explicit 'this' binding

const challenge6 = {
  multiplier: 10,

  multiply: function (a, b) {
    return (a + b) * this.multiplier;
  },
};

const challenge6b = {
  multiplier: 100,
};

// Different ways to set 'this'
console.log("6a - Normal call:", challenge6.multiply(2, 3));
console.log("6b - Call:", challenge6.multiply.call(challenge6b, 2, 3));
console.log("6c - Apply:", challenge6.multiply.apply(challenge6b, [2, 3]));

const boundMultiply = challenge6.multiply.bind(challenge6b);
console.log("6d - Bind:", boundMultiply(2, 3));

// Partial application with bind
const boundPartial = challenge6.multiply.bind(challenge6b, 5);
console.log("6e - Partial bind:", boundPartial(3));

// CHALLENGE 7: 'this' in nested objects
// Complex object nesting scenarios

const challenge7 = {
  name: "outer",

  inner: {
    name: "inner",

    getNameRegular: function () {
      return this.name;
    },

    getNameArrow: () => {
      return this.name;
    },

    deepNest: {
      name: "deep",

      getName: function () {
        return this.name;
      },
    },
  },
};

console.log("7a - Inner regular:", challenge7.inner.getNameRegular());
console.log("7b - Inner arrow:", challenge7.inner.getNameArrow());
console.log("7c - Deep nest:", challenge7.inner.deepNest.getName());

// CHALLENGE 8: 'this' with array methods
// How does 'this' work in array callbacks?

const challenge8 = {
  numbers: [1, 2, 3, 4, 5],
  multiplier: 10,

  processNumbers: function () {
    // Method 1: Regular function callback
    const result1 = this.numbers.map(function (num) {
      return num * this.multiplier; // What 'this'?
    });

    // Method 2: Arrow function callback
    const result2 = this.numbers.map((num) => {
      return num * this.multiplier; // What 'this'?
    });

    // Method 3: Bind the callback
    const result3 = this.numbers.map(
      function (num) {
        return num * this.multiplier;
      }.bind(this)
    );

    // Method 4: Using thisArg parameter
    const result4 = this.numbers.map(function (num) {
      return num * this.multiplier;
    }, this);

    return { result1, result2, result3, result4 };
  },
};

const results = challenge8.processNumbers();
console.log("8a - Regular callback:", results.result1);
console.log("8b - Arrow callback:", results.result2);
console.log("8c - Bound callback:", results.result3);
console.log("8d - thisArg parameter:", results.result4);

// CHALLENGE 9: 'this' in async functions
// How does 'this' behave with async/await and promises?

const challenge9 = {
  value: "async-test",

  asyncMethod: async function () {
    return this.value;
  },

  promiseMethod: function () {
    return Promise.resolve(this.value);
  },

  complexAsync: async function () {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.value); // What 'this'?
      }, 10);
    });

    return promise;
  },

  complexAsyncArrow: async function () {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.value); // What 'this'?
      }, 10);
    });

    return promise;
  },
};

// Test async 'this' behavior (results will be logged asynchronously)
challenge9.asyncMethod().then((result) => {
  console.log("9a - Async method:", result);
});

const extractedAsync = challenge9.asyncMethod;
extractedAsync().then((result) => {
  console.log("9b - Extracted async:", result);
});

// BONUS CHALLENGE: 'this' quiz questions
console.log("\n=== This Binding Quiz ===");

// Question 1: What's the difference between these?
const obj1 = {
  name: "obj1",
  method: function () {
    return this.name;
  },
};

const obj2 = {
  name: "obj2",
  method: () => this.name,
};

console.log("Quiz 1a:", obj1.method());
console.log("Quiz 1b:", obj2.method());

// Question 2: How can you ensure 'this' always refers to the intended object?
const quiz2 = {
  value: 100,
  getValue: function () {
    return this.value;
  },
};

// TODO: Show 3 different ways to ensure getValue always uses quiz2 as 'this'

// Question 3: What happens with 'this' in strict vs non-strict mode?
function strictThisTest() {
  "use strict";
  return this;
}

function nonStrictThisTest() {
  return this;
}

console.log("Quiz 3a - Strict this:", strictThisTest());
console.log("Quiz 3b - Non-strict this:", typeof nonStrictThisTest());

// EXTRA CREDIT: Implement your own bind function
Function.prototype.myBind = function (context, ...args) {
  // TODO: Implement bind functionality
  // Should handle: context binding, partial application, constructor calls
};
