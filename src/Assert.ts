import { deepEqual } from "@umbra-test/umbra-util";
import { assert } from "../src";

type ExtractArrayType<T> = T extends any[] ? T[number] :
                           T extends object ? Partial<T> :
                           T;

class AssertionError extends Error {

    constructor(ourMessage: string, theirMessage: string | undefined) {
        const message = theirMessage ? ourMessage + "\n" + theirMessage : ourMessage;
        super(message);
    }
}

class Assert {

    public static that<T>(output: boolean): void {
        // TODO
    }

    public static equal(expected: any, actual: any, message?: string): void {
        if (deepEqual(expected, actual)) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to deeply equal ${Assert.printObject(expected)}`, message);
    }

    public static notEqual(expected: any, actual: any, message?: string): void {
        if (!deepEqual(expected, actual)) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to not deeply equal ${Assert.printObject(expected)}`, message);
    }

    public static looseEqual(actual: any, expected: any, message?: string): void {
        // tslint:disable-next-line: triple-equals
        if (expected == actual) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} == ${Assert.printObject(expected)}`, message);
    }

    public static notLooseEqual(actual: any, expected: any, message?: string): void {
        // tslint:disable-next-line: triple-equals
        if (expected != actual) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} != ${Assert.printObject(expected)}`, message);
    }

    public static strictEqual<T>(actual: T, expected: T, message?: string): void {
        if (Object.is(expected, actual)) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to strictly equal ${Assert.printObject(expected)}`, message);
    }

    public static notStrictEqual<T>(actual: T, expected: T, message?: string): void {
        if (!Object.is(expected, actual)) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to not strictly equal ${Assert.printObject(expected)}`, message);
    }

    public static is(actual: any, expected: any, message?: string): void {
        Assert.strictEqual(actual, expected, message);
    }

    public static has<T, U>(target: T, keyPath: string, expected: U, message?: string): void {
        assert.exists(target, "target");
        assert.exists(keyPath, "keyPath");
        assert.exists(target, "target");
        const pathArray = keyPath.split(".");
        let result: any = target;
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

    public static regexMatches(actual: string, expected: RegExp, message?: string): void {
        if (expected.test(actual)) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to match the regex ${Assert.printObject(expected)}`, message);
    }

    public static resolvesTo<T>(actual: Promise<T>, expected: T, message?: string): Promise<void> {
        return actual
            .then((actualValue: T) => {
                Assert.equal(actualValue, expected);
            }, (e) => {
                throw new AssertionError(`Promise should not have successfully resolved.\nException: ${e}\n`, message);
            });
    }

    public static rejects<T>(actual: Promise<T>, expected?: Error | string, message?: string): Promise<void> {
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

    public static fail(message?: string): void {
        throw new AssertionError("Test failed", message);
    }

    public static isTrue(value: boolean, message?: string): void {
        Assert.equal(true, value, message);
    }

    public static isFalse(value: boolean, message?: string): void {
        Assert.equal(false, value, message);
    }

    public static isTruthy(value: any, message?: string): void {
        if (!value) {
            throw new AssertionError(`Expected ${value} to be truthy`, message);
        }
    }

    public static isFalsy(value: any, message?: string): void {
        if (value) {
            throw new AssertionError(`Expected ${value} to be falsy`, message);
        }
    }

    public static exists<T>(expected: T | null | undefined, message?: string): expected is T {
        this.notEqual(expected, null, `Expected ${Assert.printObject(expected)} to not be null. ${message}`);
        this.notEqual(expected, undefined, `Expected ${Assert.printObject(expected)} to not be undefined. ${message}`);
        return true;
    }

    public static contains<T extends any[] | string | any>(target: T, value: ExtractArrayType<T>, message?: string) {
        this.exists(target);
        if (typeof target === "string") {
            Assert.isTrue(target.indexOf(value) !== -1, `String: ${value} was not found in ${target}`);
        } else if (Array.isArray(target)) {
            Assert.isTrue(target.indexOf(value) !== -1,
                `${Assert.printObject(value)} was not found in target array ${Assert.printObject(target)}. ${message ?? ""}`);
        } else {
            for (const [entryKey, entryValue] of Object.entries(value)) {
                Assert.equal(target[entryKey], entryValue);
            }
        }
    }

    public static containsAll<T>(target: T[], values: T[], message?: string) {
        this.exists(target);
        this.exists(values);
        for (const value of values) {
            Assert.contains(target, value, message);
        }
    }

    private static printObject(object: any): string {
        if (object instanceof RegExp) {
            return object.toString();
        }

        return JSON.stringify(object);
    }
}

export {
    Assert
};