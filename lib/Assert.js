"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const umbra_util_1 = require("@umbra-test/umbra-util");
const src_1 = require("../src");
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
        throw new AssertionError(`Expected ${Assert.printObject(actual)} == ${Assert.printObject(expected)}`, message);
    }
    static notLooseEqual(actual, expected, message) {
        if (expected != actual) {
            return;
        }
        throw new AssertionError(`Expected ${Assert.printObject(actual)} != ${Assert.printObject(expected)}`, message);
    }
    static strictEqual(actual, expected, message) {
        if (Object.is(expected, actual)) {
            return;
        }
        throw new AssertionError(`Expected ${Assert.printObject(actual)} to strictly equal ${Assert.printObject(expected)}`, message);
    }
    static notStrictEqual(actual, expected, message) {
        if (!Object.is(expected, actual)) {
            return;
        }
        throw new AssertionError(`Expected ${Assert.printObject(actual)} to not strictly equal ${Assert.printObject(expected)}`, message);
    }
    static is(actual, expected, message) {
        Assert.strictEqual(actual, expected, message);
    }
    static has(target, keyPath, expected, message) {
        src_1.assert.exists(target, "target");
        src_1.assert.exists(keyPath, "keyPath");
        src_1.assert.exists(target, "target");
        const pathArray = keyPath.split(".");
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
        }, (e) => {
            throw new AssertionError(`Promise should not have successfully resolved.\nException: ${e}\n`, message);
        });
    }
    static rejects(actual, expected, message) {
        const errorMessage = expected instanceof Error ? expected.message : expected;
        return actual
            .then(() => {
            throw new AssertionError("Promise should not have successfully resolved", message);
        }, (e) => {
            if (errorMessage) {
                Assert.equal(errorMessage, e.message);
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
        if (!value) {
            throw new AssertionError(`Expected ${value} to be truthy`, message);
        }
    }
    static isFalsy(value, message) {
        if (value) {
            throw new AssertionError(`Expected ${value} to be falsy`, message);
        }
    }
    static exists(expected, message) {
        this.notEqual(expected, null, `Expected ${Assert.printObject(expected)} to not be null. ${message}`);
        this.notEqual(expected, undefined, `Expected ${Assert.printObject(expected)} to not be undefined. ${message}`);
        return true;
    }
    static contains(target, value, message) {
        this.exists(target);
        if (typeof target === "string") {
            Assert.isTrue(target.indexOf(value) !== -1, `String: ${value} was not found in ${target}`);
        }
        else if (Array.isArray(target)) {
            Assert.isTrue(target.indexOf(value) !== -1, `${Assert.printObject(value)} was not found in target array ${Assert.printObject(target)}. ${message !== null && message !== void 0 ? message : ""}`);
        }
        else {
            for (const [entryKey, entryValue] of Object.entries(value)) {
                Assert.equal(target[entryKey], entryValue);
            }
        }
    }
    static containsAll(target, values, message) {
        this.exists(target);
        this.exists(values);
        for (const value of values) {
            Assert.contains(target, value, message);
        }
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