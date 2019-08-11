import { deepEqual } from "@umbra-test/umbra-util";

let objectIs = Object.is;
if (!objectIs) {
    objectIs = (x, y) => {
        // SameValue algorithm
        if (x === y) { // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        } else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    };
}

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

    public static equal<T>(expected: T, actual: T, message?: string): void {
        if (deepEqual(expected, actual)) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to deeply equal ${Assert.printObject(expected)}`, message);
    }

    public static notEqual<T>(expected: T, actual: T, message?: string): void {
        if (!deepEqual(expected, actual)) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to not deeply equal ${Assert.printObject(expected)}`, message);
    }

    public static looseEqual<T>(actual: T, expected: T, message?: string): void {
        // tslint:disable-next-line: triple-equals
        if (expected == actual) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to loosely equal ${Assert.printObject(expected)}`, message);
    }

    public static notLooseEqual<T>(actual: T, expected: T, message?: string): void {
        // tslint:disable-next-line: triple-equals
        if (expected != actual) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to not loosely equal ${Assert.printObject(expected)}`, message);
    }

    public static strictEqual<T>(actual: T, expected: T, message?: string): void {
        if (objectIs(expected, actual)) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to strictly equal ${Assert.printObject(expected)}`, message);
    }

    public static notStrictEqual<T>(actual: T, expected: T, message?: string): void {
        if (objectIs(expected, actual)) {
            return;
        }

        throw new AssertionError(
            `Expected ${Assert.printObject(actual)} to not strictly equal ${Assert.printObject(expected)}`, message);
    }

    public static is<T>(actual: T, expected: T, message?: string): void {
        Assert.strictEqual(actual, expected, message);
    }

    public static has<T, U>(target: T, keyPath: keyof T | string, expected: U, message?: string): void {
        const pathArray = typeof keyPath === "string" ? keyPath.split(".") : [keyPath];
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
            })
            .catch((e) => {
                throw new AssertionError(`Promise should not have successfully resolved.\nException: ${e}\n`, message);
            });
    }

    public static rejects<T>(actual: Promise<T>, expected?: Error, message?: string): Promise<void> {
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

    public static fail(message?: string): void {
        throw new AssertionError("Test failed", message);
    }

    public static isTrue(value: boolean, message?: string): void {
        Assert.equal(true, value, message);
    }

    public static isFalse(value: boolean, message?: string): void {
        Assert.equal(false, value, message);
    }

    public static isTruthy(value: boolean, message?: string): void {
        Assert.looseEqual(true, value, message);
    }

    public static isFalsy(value: boolean, message?: string): void {
        Assert.looseEqual(false, value, message);
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