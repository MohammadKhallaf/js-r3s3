"use strict";

console.log("=== Spread Operator Challenge ===");

// CHALLENGE 1: Array spreading edge cases
// Predict the output of these spread operations

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

console.log("1a - Basic spread:", [...arr1, ...arr2]);
console.log("1b - Mixed spread:", [0, ...arr1, 3.5, ...arr2, 7]);
console.log("1c - Nested arrays:", [...arr1, [arr2]]);
console.log("1d - Flatten nested:", [...arr1, ...arr2]);

// What happens with sparse arrays?
const sparse = [1, , 3, , 5];
console.log("1e - Sparse array:", sparse);
console.log("1f - Spread sparse:", [...sparse]);

// CHALLENGE 2: String spreading complexities
// How does spread work with different string types?

const regularString = "hello";
const unicodeString = "👋🌍";
const emptyString = "";

console.log("2a - Regular string:", [...regularString]);
console.log("2b - Unicode string:", [...unicodeString]);
console.log("2c - Empty string:", [...emptyString]);

// Compare with split
console.log("2d - Unicode split(''):", unicodeString.split(''));
console.log("2e - Unicode spread:", [...unicodeString]);

// CHALLENGE 3: Object spreading with complex scenarios
// Advanced object spreading edge cases

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const obj3 = { c: 5, d: 6 };

console.log("3a - Object merge:", { ...obj1, ...obj2 });
console.log("3b - Triple merge:", { ...obj1, ...obj2, ...obj3 });
console.log("3c - Override order:", { b: 999, ...obj1, ...obj2 });

// What about non-enumerable properties?
const objWithDescriptor = {};
Object.defineProperty(objWithDescriptor, 'hidden', {
    value: 'secret',
    enumerable: false
});
objWithDescriptor.visible = 'shown';

console.log("3d - With non-enumerable:", { ...objWithDescriptor });

// CHALLENGE 4: Function call spreading
// Complex function argument spreading

function multiParam(a, b, c, d, e) {
    return { a, b, c, d, e };
}

const args = [1, 2, 3];
const moreArgs = [4, 5, 6, 7];

console.log("4a - Basic spread call:", multiParam(...args));
console.log("4b - Mixed spread:", multiParam(0, ...args, ...moreArgs));
console.log("4c - Excess args:", multiParam(...moreArgs));

// CHALLENGE 5: Spread with iterables
// Different iterable types

const set = new Set([1, 2, 3, 2, 1]);
const map = new Map([['a', 1], ['b', 2]]);
const nodeList = { 0: 'div', 1: 'span', length: 2 }; // Array-like but not iterable

console.log("5a - Set spread:", [...set]);
console.log("5b - Map spread:", [...map]);

try {
    console.log("5c - Array-like spread:", [...nodeList]);
} catch (error) {
    console.log("5c error:", error.message);
}

// Make it iterable
nodeList[Symbol.iterator] = function* () {
    for (let i = 0; i < this.length; i++) {
        yield this[i];
    }
};

console.log("5d - Made iterable:", [...nodeList]);

// CHALLENGE 6: Performance implications
// When spread might cause performance issues

const largeArray = new Array(100000).fill(1);

console.time("6a - Array.from");
const copy1 = Array.from(largeArray);
console.timeEnd("6a - Array.from");

console.time("6b - Spread operator");
const copy2 = [...largeArray];
console.timeEnd("6b - Spread operator");

console.time("6c - Slice method");
const copy3 = largeArray.slice();
console.timeEnd("6c - Slice method");

console.log("Arrays equal length:", copy1.length === copy2.length && copy2.length === copy3.length);

// CHALLENGE 7: Nested spreading and references
// Understanding shallow vs deep copying

const originalObj = {
    primitive: 42,
    nested: { value: 100 },
    array: [1, 2, 3]
};

const shallowCopy = { ...originalObj };
const deeperCopy = {
    ...originalObj,
    nested: { ...originalObj.nested },
    array: [...originalObj.array]
};

// Modify original
originalObj.primitive = 999;
originalObj.nested.value = 999;
originalObj.array.push(4);

console.log("7a - Original:", originalObj);
console.log("7b - Shallow copy:", shallowCopy);
console.log("7c - Deeper copy:", deeperCopy);

// CHALLENGE 8: Spread with getters and setters
// How spread interacts with property descriptors

const objWithGetters = {
    _value: 10,
    get value() {
        console.log("Getter called");
        return this._value;
    },
    set value(val) {
        console.log("Setter called with:", val);
        this._value = val;
    },
    normal: "normal property"
};

console.log("8a - Original object access:", objWithGetters.value);

const spreadObj = { ...objWithGetters };
console.log("8b - Spread result:", spreadObj);
console.log("8c - Spread has getter?", 'get value' in Object.getOwnPropertyDescriptor(spreadObj, 'value') || {});

// CHALLENGE 9: Conditional spreading
// Advanced spreading patterns

const condition = true;
const baseConfig = { api: "v1", timeout: 5000 };

const config = {
    ...baseConfig,
    ...(condition && { debug: true }),
    ...(false && { development: true }),
    ...(!condition && { production: true })
};

console.log("9a - Conditional spread:", config);

// Spread with functions
function createConfig(isDev, isProd) {
    return {
        ...baseConfig,
        ...(isDev && { debug: true, verbose: true }),
        ...(isProd && { minify: true, optimize: true }),
        environment: isDev ? 'development' : isProd ? 'production' : 'test'
    };
}

console.log("9b - Dev config:", createConfig(true, false));
console.log("9c - Prod config:", createConfig(false, true));

// CHALLENGE 10: Spread operator precedence and evaluation
// Understanding when spread is evaluated

let counter = 0;
function incrementAndReturn() {
    return ++counter;
}

const functionsArray = [incrementAndReturn, incrementAndReturn, incrementAndReturn];

console.log("10a - Function array:", functionsArray.map(f => f()));
console.log("10b - Counter after map:", counter);

// Reset counter
counter = 0;

// What happens when we spread the results?
const results = [...functionsArray.map(f => f())];
console.log("10c - Spread results:", results);
console.log("10d - Counter after spread:", counter);

// CHALLENGE 11: Spread with class instances
// How spread works with objects that have prototypes

class CustomClass {
    constructor(value) {
        this.value = value;
        this.instance = true;
    }
    
    method() {
        return "I'm a method";
    }
    
    get computed() {
        return this.value * 2;
    }
}

const instance = new CustomClass(5);
instance.added = "after creation";

const spreadInstance = { ...instance };

console.log("11a - Original instance:", instance);
console.log("11b - Spread instance:", spreadInstance);
console.log("11c - Has method?", 'method' in spreadInstance);
console.log("11d - Has computed?", 'computed' in spreadInstance);
console.log("11e - Computed value:", spreadInstance.computed);

// CHALLENGE 12: Rest and spread together
// Complex patterns combining rest and spread

function processArgs(first, second, ...rest) {
    return {
        first,
        second,
        rest,
        all: [first, second, ...rest]
    };
}

const inputArgs = [1, 2, 3, 4, 5];
console.log("12a - Process with spread:", processArgs(...inputArgs));

// Function that redistributes arguments
function redistribute(...args) {
    const [first, ...middle, last] = args;  // Error: rest must be last
    return { first, middle, last };
}

// Correct version
function redistributeCorrect(...args) {
    const first = args[0];
    const last = args[args.length - 1];
    const middle = args.slice(1, -1);
    return { first, middle, last };
}

console.log("12b - Redistribute:", redistributeCorrect(...inputArgs));

// CHALLENGE 13: Spread with symbols and special properties
// Edge cases with symbols and non-string keys

const sym1 = Symbol('test');
const sym2 = Symbol('test');

const objWithSymbols = {
    [sym1]: 'symbol1',
    [sym2]: 'symbol2',
    string: 'string key',
    123: 'numeric key'
};

const spreadSymbols = { ...objWithSymbols };

console.log("13a - Original symbols:", Object.getOwnPropertySymbols(objWithSymbols));
console.log("13b - Spread symbols:", Object.getOwnPropertySymbols(spreadSymbols));
console.log("13c - Symbol values preserved?", spreadSymbols[sym1], spreadSymbols[sym2]);

// CHALLENGE 14: Real-world complex scenario
// Implement a sophisticated configuration merger

function mergeConfigs(...configs) {
    // TODO: Implement a function that:
    // 1. Merges multiple configuration objects
    // 2. Handles nested objects recursively
    // 3. Combines arrays instead of overriding
    // 4. Preserves special properties
    
    return configs.reduce((merged, config) => {
        return { ...merged, ...config };
    }, {});
}

const defaultConfig = {
    server: { port: 3000, host: 'localhost' },
    database: { url: 'localhost', options: ['cache'] },
    features: { auth: true, logging: false }
};

const envConfig = {
    server: { port: 8080 },
    database: { options: ['cache', 'ssl'] },
    features: { logging: true, debug: true }
};

const userConfig = {
    server: { ssl: true },
    features: { experimental: true }
};

console.log("14a - Simple merge:", mergeConfigs(defaultConfig, envConfig, userConfig));

// CHALLENGE 15: Write a spread utility library
// Create utilities that leverage spread operator

class SpreadUtils {
    // Merge arrays without duplicates
    static mergeUnique(...arrays) {
        return [...new Set([].concat(...arrays))];
    }
    
    // Flatten nested arrays to specified depth
    static flattenToDepth(array, depth = 1) {
        // TODO: Implement using spread
        return array;
    }
    
    // Clone object to specified depth
    static deepClone(obj, depth = Infinity) {
        // TODO: Implement deep cloning with spread
        return { ...obj };
    }
    
    // Combine objects with custom merge strategy
    static combineWith(mergeFn, ...objects) {
        // TODO: Implement custom merging logic
        return objects.reduce((result, obj) => ({ ...result, ...obj }));
    }
}

const arrays = [[1, 2], [2, 3], [3, 4]];
console.log("15a - Merge unique:", SpreadUtils.mergeUnique(...arrays));

// BONUS: Spread operator gotchas and best practices
console.log("\n=== Spread Operator Best Practices ===");
console.log("1. Remember spread creates shallow copies");
console.log("2. Be aware of performance with large arrays/objects");
console.log("3. Understand that spread calls getters");
console.log("4. Know that spread doesn't copy prototype properties");
console.log("5. Use spread for immutable updates in React/Redux");

// Common mistakes
const mistake1 = { a: { nested: 1 } };
const mistake2 = { ...mistake1 };
mistake2.a.nested = 999;
console.log("Mistake - original affected:", mistake1.a.nested);

// Correct approach for nested objects
const correct1 = { a: { nested: 1 } };
const correct2 = { ...correct1, a: { ...correct1.a } };
correct2.a.nested = 999;
console.log("Correct - original safe:", correct1.a.nested);