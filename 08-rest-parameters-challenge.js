"use strict";

console.log("=== Rest Parameters Challenge ===");

// CHALLENGE 1: Rest parameter positioning
// Where can rest parameters be placed?

function challenge1a(a, b, ...rest) {
    return { a, b, rest };
}

// What about these?
try {
    // function challenge1b(...rest, a) { }  // Syntax error
    // function challenge1c(a, ...rest, b) { }  // Syntax error
    console.log("1a - Valid rest:", challenge1a(1, 2, 3, 4, 5));
} catch (error) {
    console.log("1 error:", error.message);
}

// CHALLENGE 2: Rest vs arguments object
// Fundamental differences between rest and arguments

function withArguments(a, b) {
    console.log("2a - Arguments object:", arguments);
    console.log("2b - Arguments is array?", Array.isArray(arguments));
    console.log("2c - Arguments length:", arguments.length);
    
    // Try to use array methods
    try {
        const mapped = arguments.map(x => x * 2);
        console.log("2d - Arguments map:", mapped);
    } catch (error) {
        console.log("2d - Arguments map error:", error.message);
    }
    
    // Convert to array
    const argsArray = Array.from(arguments);
    console.log("2e - Converted to array:", argsArray.map(x => x * 2));
}

function withRest(a, b, ...rest) {
    console.log("2f - Rest parameters:", rest);
    console.log("2g - Rest is array?", Array.isArray(rest));
    console.log("2h - All parameters:", [a, b, ...rest]);
    console.log("2i - Rest map:", rest.map(x => x * 2));
}

withArguments(1, 2, 3, 4);
withRest(1, 2, 3, 4);

// CHALLENGE 3: Rest parameters in arrow functions
// How do arrow functions handle rest parameters?

const arrowWithRest = (...args) => {
    // No arguments object in arrow functions
    try {
        console.log("3a - Arguments in arrow:", arguments);
    } catch (error) {
        console.log("3a - No arguments object:", error.name);
    }
    
    console.log("3b - Rest in arrow:", args);
    return args.reduce((sum, val) => sum + val, 0);
};

console.log("3c - Arrow sum:", arrowWithRest(1, 2, 3, 4));

// CHALLENGE 4: Destructuring with rest
// Rest in destructuring contexts

const array = [1, 2, 3, 4, 5];
const [first, second, ...restElements] = array;

console.log("4a - Destructure rest:", { first, second, restElements });

// What about this?
const [a, ...middle, last] = array;  // Error: rest must be last

// Correct way to get middle elements
const [firstEl, ...temp] = array;
const lastEl = temp.pop();
const middleElements = temp;

console.log("4b - Get middle:", { firstEl, middleElements, lastEl });

// CHALLENGE 5: Rest parameters with default values
// How do rest parameters interact with defaults?

function challenge5(a = 1, b = 2, ...rest) {
    return { a, b, rest, totalArgs: [a, b, ...rest].length };
}

console.log("5a - All defaults:", challenge5());
console.log("5b - Some args:", challenge5(10));
console.log("5c - With rest:", challenge5(10, 20, 30, 40));
console.log("5d - Undefined args:", challenge5(undefined, undefined, 50));

// CHALLENGE 6: Rest parameters and function length
// How does function.length work with rest parameters?

function normalFunction(a, b, c) {}
function withDefaults(a, b = 2, c = 3) {}
function withRest(a, b, ...rest) {}
function complexFunction(a, b = 2, ...rest) {}

console.log("6a - Normal length:", normalFunction.length);
console.log("6b - With defaults length:", withDefaults.length);
console.log("6c - With rest length:", withRest.length);
console.log("6d - Complex length:", complexFunction.length);

// CHALLENGE 7: Nested rest patterns
// Complex rest parameter scenarios

function outerFunction(...outerRest) {
    function innerFunction(...innerRest) {
        return { outerRest, innerRest };
    }
    
    return innerFunction(...outerRest.slice(1));
}

console.log("7a - Nested rest:", outerFunction(1, 2, 3, 4));

// Rest with closure
function createAccumulator() {
    let total = 0;
    
    return function(...numbers) {
        total += numbers.reduce((sum, num) => sum + num, 0);
        return { total, added: numbers };
    };
}

const accumulator = createAccumulator();
console.log("7b - Accumulator 1:", accumulator(1, 2, 3));
console.log("7c - Accumulator 2:", accumulator(4, 5));

// CHALLENGE 8: Rest parameters with 'this'
// How 'this' works with rest parameters

const objectWithRest = {
    name: "RestObject",
    
    method: function(...args) {
        return { name: this.name, args };
    },
    
    arrowMethod: (...args) => {
        return { name: this.name, args };
    }
};

console.log("8a - Regular method:", objectWithRest.method(1, 2, 3));
console.log("8b - Arrow method:", objectWithRest.arrowMethod(1, 2, 3));

// CHALLENGE 9: Rest parameters with apply/call
// Explicit binding with rest parameters

function restWithThis(...args) {
    return { thisValue: this, args };
}

const context = { value: 42 };

console.log("9a - Call with rest:", restWithThis.call(context, 1, 2, 3));
console.log("9b - Apply with rest:", restWithThis.apply(context, [4, 5, 6]));

// CHALLENGE 10: Performance considerations
// When rest parameters might impact performance

function heavyProcessing(...items) {
    // Simulating expensive operations on each item
    return items.map(item => {
        let result = item;
        for (let i = 0; i < 1000; i++) {
            result = Math.sqrt(result + i);
        }
        return result;
    });
}

const manyItems = Array.from({ length: 1000 }, (_, i) => i + 1);

console.time("10a - Rest parameter performance");
heavyProcessing(...manyItems);
console.timeEnd("10a - Rest parameter performance");

// Compare with direct array processing
function heavyProcessingArray(items) {
    return items.map(item => {
        let result = item;
        for (let i = 0; i < 1000; i++) {
            result = Math.sqrt(result + i);
        }
        return result;
    });
}

console.time("10b - Array parameter performance");
heavyProcessingArray(manyItems);
console.timeEnd("10b - Array parameter performance");

// CHALLENGE 11: Rest parameters and recursion
// Using rest in recursive functions

function sumRecursive(first, ...rest) {
    if (rest.length === 0) {
        return first || 0;
    }
    return first + sumRecursive(...rest);
}

console.log("11a - Recursive sum:", sumRecursive(1, 2, 3, 4, 5));

function flattenRecursive(...arrays) {
    if (arrays.length === 0) return [];
    
    const [first, ...rest] = arrays;
    
    if (Array.isArray(first)) {
        return [...flattenRecursive(...first), ...flattenRecursive(...rest)];
    } else {
        return [first, ...flattenRecursive(...rest)];
    }
}

console.log("11b - Recursive flatten:", flattenRecursive([1, [2, 3]], 4, [5, [6, 7]]));

// CHALLENGE 12: Rest parameters with generators
// How rest parameters work with generators

function* generatorWithRest(...values) {
    for (const value of values) {
        yield value * 2;
    }
}

const gen = generatorWithRest(1, 2, 3, 4);
console.log("12a - Generator rest:", [...gen]);

// CHALLENGE 13: Dynamic function creation with rest
// Creating functions that use rest parameters dynamically

function createSumFunction(operation) {
    switch (operation) {
        case 'add':
            return (...numbers) => numbers.reduce((sum, num) => sum + num, 0);
        case 'multiply':
            return (...numbers) => numbers.reduce((product, num) => product * num, 1);
        case 'concat':
            return (...strings) => strings.join('');
        default:
            return (...args) => args;
    }
}

const add = createSumFunction('add');
const multiply = createSumFunction('multiply');
const concat = createSumFunction('concat');

console.log("13a - Dynamic add:", add(1, 2, 3, 4));
console.log("13b - Dynamic multiply:", multiply(2, 3, 4));
console.log("13c - Dynamic concat:", concat("Hello", " ", "World"));

// CHALLENGE 14: Rest parameters with class methods
// Rest in class contexts

class RestProcessor {
    constructor(name) {
        this.name = name;
        this.processed = [];
    }
    
    process(...items) {
        const processed = items.map(item => `${this.name}: ${item}`);
        this.processed.push(...processed);
        return processed;
    }
    
    static combine(...processors) {
        const combined = new RestProcessor('Combined');
        for (const processor of processors) {
            combined.processed.push(...processor.processed);
        }
        return combined;
    }
}

const processor1 = new RestProcessor('P1');
const processor2 = new RestProcessor('P2');

processor1.process('a', 'b', 'c');
processor2.process('x', 'y', 'z');

const combined = RestProcessor.combine(processor1, processor2);
console.log("14a - Combined processed:", combined.processed);

// CHALLENGE 15: Advanced rest parameter patterns
// Complex real-world scenarios

function apiRequest(url, ...middlewares) {
    let request = { url, headers: {}, data: null };
    
    // Apply middlewares
    for (const middleware of middlewares) {
        request = middleware(request);
    }
    
    return request;
}

const authMiddleware = (req) => ({
    ...req,
    headers: { ...req.headers, Authorization: 'Bearer token' }
});

const jsonMiddleware = (req) => ({
    ...req,
    headers: { ...req.headers, 'Content-Type': 'application/json' }
});

const loggingMiddleware = (req) => {
    console.log('Request:', req.url);
    return req;
};

const request = apiRequest(
    'https://api.example.com',
    authMiddleware,
    jsonMiddleware,
    loggingMiddleware
);

console.log("15a - API request:", request);

// CHALLENGE 16: Error handling with rest parameters
// How errors propagate through rest parameter functions

function safeSum(...numbers) {
    try {
        return numbers.reduce((sum, num) => {
            if (typeof num !== 'number') {
                throw new Error(`Expected number, got ${typeof num}`);
            }
            return sum + num;
        }, 0);
    } catch (error) {
        console.log("Error in safeSum:", error.message);
        return null;
    }
}

console.log("16a - Valid sum:", safeSum(1, 2, 3));
console.log("16b - Invalid sum:", safeSum(1, "2", 3));

// CHALLENGE 17: Memory implications
// Understanding memory usage with rest parameters

function memoryTest(...args) {
    // Rest parameters create a new array each time
    return args;
}

function memoryTestArray(args) {
    // Direct array parameter doesn't create new array
    return args;
}

// In practice, rest parameters create more memory allocations
const testArgs = [1, 2, 3, 4, 5];

// Each call creates a new array
console.log("17a - Rest creates new array:", memoryTest(...testArgs) !== testArgs);
console.log("17b - Array param same reference:", memoryTestArray(testArgs) === testArgs);

// BONUS: Write a rest parameter utility library
class RestUtils {
    // Validate all arguments are of the same type
    static validateTypes(expectedType, ...args) {
        return args.every(arg => typeof arg === expectedType);
    }
    
    // Group arguments into chunks
    static chunk(size, ...args) {
        const chunks = [];
        for (let i = 0; i < args.length; i += size) {
            chunks.push(args.slice(i, i + size));
        }
        return chunks;
    }
    
    // Apply function to each argument and collect results
    static mapArgs(fn, ...args) {
        return args.map(fn);
    }
    
    // Filter arguments based on predicate
    static filterArgs(predicate, ...args) {
        return args.filter(predicate);
    }
}

console.log("Utility 1:", RestUtils.validateTypes('number', 1, 2, 3));
console.log("Utility 2:", RestUtils.validateTypes('number', 1, '2', 3));
console.log("Utility 3:", RestUtils.chunk(2, 1, 2, 3, 4, 5, 6));
console.log("Utility 4:", RestUtils.mapArgs(x => x * 2, 1, 2, 3, 4));
console.log("Utility 5:", RestUtils.filterArgs(x => x > 2, 1, 2, 3, 4, 5));

console.log("\n=== Discussion Questions ===");
console.log("1. When should you use rest parameters vs. accepting an array?");
console.log("2. What are the performance implications of rest parameters?");
console.log("3. How do rest parameters improve function flexibility?");
console.log("4. Why can't rest parameters be placed anywhere except the end?");
console.log("5. How do rest parameters compare to the arguments object?");