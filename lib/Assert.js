"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const umbra_util_1 = require("@umbra-test/umbra-util");
let objectIs = Object.is;
if (!objectIs) {
    objectIs = (x, y) => {
        if (x === y) {
            return x !== 0 || 1 / x === 1 / y;
        }
        else {
            return x !== x && y !== y;
        }
    };
}
class AssertionError extends Error {
    constructor(ourMessage, theirMessage) {
        const message = theirMessage ? ourMessage + "\n" + theirMessage : ourMessage;
        super(message);
    }
}
class Assert {
    static that(output) {
    }
    static equal(expected, actual, message) {
        if (umbra_util_1.deepEqual(expected, actual)) {
            return;
        }
        throw new AssertionError(`Expected ${Assert.printObject(actual)} to deeply equal ${Assert.printObject(expected)}`, message);
    }
    static notEqual(expected, actual, message) {
        if (!umbra_util_1.deepEqual(expected, actual)) {
            return;
        }
        throw new AssertionError(`Expected ${Assert.printObject(actual)} to not deeply equal ${Assert.printObject(expected)}`, message);
    }
    static looseEqual(actual, expected, message) {
        if (expected == actual) {
            return;
        }
        throw new AssertionError(`Expected ${Assert.printObject(actual)} to loosely equal ${Assert.printObject(expected)}`, message);
    }
    static notLooseEqual(actual, expected, message) {
        if (expected != actual) {
            return;
        }
        throw new AssertionError(`Expected ${Assert.printObject(actual)} to not loosely equal ${Assert.printObject(expected)}`, message);
    }
    static strictEqual(actual, expected, message) {
        if (objectIs(expected, actual)) {
            return;
        }
        throw new AssertionError(`Expected ${Assert.printObject(actual)} to strictly equal ${Assert.printObject(expected)}`, message);
    }
    static notStrictEqual(actual, expected, message) {
        if (objectIs(expected, actual)) {
            return;
        }
        throw new AssertionError(`Expected ${Assert.printObject(actual)} to not strictly equal ${Assert.printObject(expected)}`, message);
    }
    static is(actual, expected, message) {
        Assert.strictEqual(actual, expected, message);
    }
    static has(target, keyPath, expected, message) {
        const pathArray = typeof keyPath === "string" ? keyPath.split(".") : [keyPath];
        let result = target;
        for (const path of pathArray) {
            const newResult = result[path];
            if (!newResult) {
                Assert.fail(`Missing key "${path}" in object ${Assert.printObject(result)}\n` +
                    `Available keys: ${Assert.printObject(Object.keys(expected))}`);
            }
            result = newResult;
        }
        Assert.strictEqual(result, expected, message);
    }
    static regexMatches(actual, expected, message) {
        if (expected.test(actual)) {
            return;
        }
        throw new AssertionError(`Expected ${Assert.printObject(actual)} to match the regex ${Assert.printObject(expected)}`, message);
    }
    static resolvesTo(actual, expected, message) {
        return actual
            .then((actualValue) => {
            Assert.equal(actualValue, expected);
        })
            .catch((e) => {
            throw new AssertionError(`Promise should not have successfully resolved.\nException: ${e}\n`, message);
        });
    }
    static rejects(actual, expected, message) {
        return actual
            .then(() => {
            throw new AssertionError("Promise should not have successfully resolved", message);
        })
            .catch((e) => {
            if (expected) {
                Assert.equal(expected.message, e.message);
            }
        });
    }
    static fail(message) {
        throw new AssertionError("Test failed", message);
    }
    static isTrue(value, message) {
        Assert.equal(true, value, message);
    }
    static isFalse(value, message) {
        Assert.equal(false, value, message);
    }
    static isTruthy(value, message) {
        Assert.looseEqual(true, value, message);
    }
    static isFalsy(value, message) {
        Assert.looseEqual(false, value, message);
    }
    static printObject(object) {
        if (object instanceof RegExp) {
            return object.toString();
        }
        return JSON.stringify(object);
    }
}
exports.Assert = Assert;
//# sourceMappingURL=Assert.js.map