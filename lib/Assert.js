"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
const umbra_util_1 = require("@umbra-test/umbra-util");
class AssertionError extends Error {
    constructor(ourMessage, theirMessage) {
        const message = theirMessage ? ourMessage + "\n" + theirMessage : ourMessage;
        super(message);
    }
}
class assert {
    static that(output) {
    }
    static equal(expected, actual, message) {
        if (umbra_util_1.deepEqual(expected, actual)) {
            return;
        }
        throw new AssertionError(`Expected ${umbra_util_1.printObject(actual)} to deeply equal ${umbra_util_1.printObject(expected)}`, message);
    }
    static notEqual(expected, actual, message) {
        if (!umbra_util_1.deepEqual(expected, actual)) {
            return;
        }
        throw new AssertionError(`Expected ${umbra_util_1.printObject(actual)} to not deeply equal ${umbra_util_1.printObject(expected)}`, message);
    }
    static looseEqual(actual, expected, message) {
        if (expected == actual) {
            return;
        }
        throw new AssertionError(`Expected ${umbra_util_1.printObject(actual)} == ${umbra_util_1.printObject(expected)}`, message);
    }
    static notLooseEqual(actual, expected, message) {
        if (expected != actual) {
            return;
        }
        throw new AssertionError(`Expected ${umbra_util_1.printObject(actual)} != ${umbra_util_1.printObject(expected)}`, message);
    }
    static strictEqual(actual, expected, message) {
        if (Object.is(expected, actual)) {
            return;
        }
        throw new AssertionError(`Expected ${umbra_util_1.printObject(actual)} to strictly equal ${umbra_util_1.printObject(expected)}`, message);
    }
    static notStrictEqual(actual, expected, message) {
        if (!Object.is(expected, actual)) {
            return;
        }
        throw new AssertionError(`Expected ${umbra_util_1.printObject(actual)} to not strictly equal ${umbra_util_1.printObject(expected)}`, message);
    }
    static is(actual, expected, message) {
        assert.strictEqual(actual, expected, message);
    }
    static has(target, keyPath, expected, message) {
        assert.exists(target, "target");
        assert.exists(keyPath, "keyPath");
        assert.exists(target, "target");
        const pathArray = keyPath.split(".");
        let result = target;
        for (const path of pathArray) {
            const newResult = result[path];
            if (!newResult) {
                assert.fail(`Missing key "${path}" in object ${umbra_util_1.printObject(result)}\nAvailable keys: ${umbra_util_1.printObject(Object.keys(expected))}`);
            }
            result = newResult;
        }
        assert.strictEqual(result, expected, message);
    }
    static regexMatches(actual, expected, message) {
        if (expected.test(actual)) {
            return;
        }
        throw new AssertionError(`Expected ${umbra_util_1.printObject(actual)} to match the regex ${umbra_util_1.printObject(expected)}`, message);
    }
    static resolvesTo(actual, expected, message) {
        return actual
            .then((actualValue) => {
            assert.equal(actualValue, expected);
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
                assert.equal(errorMessage, e.message);
            }
        });
    }
    static fail(message) {
        throw new AssertionError("Test failed", message);
    }
    static isTrue(value, message) {
        assert.equal(true, value, message);
    }
    static isFalse(value, message) {
        assert.equal(false, value, message);
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
        this.notEqual(expected, null, `Expected ${umbra_util_1.printObject(expected)} to not be null. ${message}`);
        this.notEqual(expected, undefined, `Expected ${umbra_util_1.printObject(expected)} to not be undefined. ${message}`);
        return true;
    }
    static contains(target, value, message) {
        this.exists(target);
        if (typeof target === "string") {
            assert.isTrue(target.indexOf(value) !== -1, `String: ${value} was not found in ${target}`);
        }
        else if (Array.isArray(target)) {
            assert.isTrue(target.indexOf(value) !== -1, `${umbra_util_1.printObject(value)} was not found in target array ${umbra_util_1.printObject(target)}. ${message !== null && message !== void 0 ? message : ""}`);
        }
        else {
            for (const [entryKey, entryValue] of Object.entries(value)) {
                assert.equal(target[entryKey], entryValue);
            }
        }
    }
    static containsAll(target, values, message) {
        this.exists(target);
        this.exists(values);
        for (const value of values) {
            assert.contains(target, value, message);
        }
    }
}
exports.assert = assert;
//# sourceMappingURL=Assert.js.map