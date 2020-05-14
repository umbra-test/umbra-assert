import { deepEqual, printObject } from "@umbra-test/umbra-util";

type ExtractArrayType<T> = T extends any[] ? T[number] :
                           T extends object ? Partial<T> :
                           T;

class AssertionError extends Error {

    constructor(ourMessage: string, theirMessage: string | undefined) {
        const message = theirMessage ? ourMessage + "\n" + theirMessage : ourMessage;
        super(message);
    }
}

class assert {

    public static that<T>(output: boolean): void {
        // TODO
    }

    public static equal(expected: any, actual: any, message?: string): void {
        if (deepEqual(expected, actual)) {
            return;
        }

        throw new AssertionError(`Expected ${printObject(actual)} to deeply equal ${printObject(expected)}`, message);
    }

    public static notEqual(expected: any, actual: any, message?: string): void {
        if (!deepEqual(expected, actual)) {
            return;
        }

        throw new AssertionError(`Expected ${printObject(actual)} to not deeply equal ${printObject(expected)}`, message);
    }

    public static looseEqual(actual: any, expected: any, message?: string): void {
        // tslint:disable-next-line: triple-equals
        if (expected == actual) {
            return;
        }

        throw new AssertionError(`Expected ${printObject(actual)} == ${printObject(expected)}`, message);
    }

    public static notLooseEqual(actual: any, expected: any, message?: string): void {
        // tslint:disable-next-line: triple-equals
        if (expected != actual) {
            return;
        }

        throw new AssertionError(`Expected ${printObject(actual)} != ${printObject(expected)}`, message);
    }

    public static strictEqual<T>(actual: T, expected: T, message?: string): void {
        if (Object.is(expected, actual)) {
            return;
        }

        throw new AssertionError(`Expected ${printObject(actual)} to strictly equal ${printObject(expected)}`, message);
    }

    public static notStrictEqual<T>(actual: T, expected: T, message?: string): void {
        if (!Object.is(expected, actual)) {
            return;
        }

        throw new AssertionError(`Expected ${printObject(actual)} to not strictly equal ${printObject(expected)}`, message);
    }

    public static is(actual: any, expected: any, message?: string): void {
        assert.strictEqual(actual, expected, message);
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
                assert.fail(`Missing key "${path}" in object ${printObject(result)}\nAvailable keys: ${printObject(Object.keys(expected))}`);
            }
            result = newResult;
        }
        assert.strictEqual(result, expected, message);
    }

    public static regexMatches(actual: string, expected: RegExp, message?: string): void {
        if (expected.test(actual)) {
            return;
        }

        throw new AssertionError(`Expected ${printObject(actual)} to match the regex ${printObject(expected)}`, message);
    }

    public static resolvesTo<T>(actual: Promise<T>, expected: T, message?: string): Promise<void> {
        return actual
            .then((actualValue: T) => {
                assert.equal(actualValue, expected);
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
                    assert.equal(errorMessage, e.message);
                }
            });
    }

    public static fail(message?: string): void {
        throw new AssertionError("Test failed", message);
    }

    public static isTrue(value: boolean, message?: string): void {
        assert.equal(true, value, message);
    }

    public static isFalse(value: boolean, message?: string): void {
        assert.equal(false, value, message);
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
        this.notEqual(expected, null, `Expected ${printObject(expected)} to not be null. ${message}`);
        this.notEqual(expected, undefined, `Expected ${printObject(expected)} to not be undefined. ${message}`);
        return true;
    }

    public static contains<T extends any[] | string | any>(target: T, value: ExtractArrayType<T>, message?: string) {
        this.exists(target);
        if (typeof target === "string") {
            assert.isTrue(target.indexOf(value as any) !== -1, `String: ${value} was not found in ${target}`);
        } else if (Array.isArray(target)) {
            assert.isTrue(target.indexOf(value) !== -1, `${printObject(value)} was not found in target array ${printObject(target)}. ${message ?? ""}`);
        } else {
            for (const [entryKey, entryValue] of Object.entries(value as any)) {
                assert.equal((target as any)[entryKey], entryValue as any);
            }
        }
    }

    public static containsAll<T>(target: T[], values: T[], message?: string) {
        this.exists(target);
        this.exists(values);
        for (const value of values) {
            assert.contains(target, value, message);
        }
    }

}

export {
    assert
};