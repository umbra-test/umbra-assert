declare class Assert {
    static that<T>(output: boolean): void;
    static equal<T>(expected: T, actual: T, message?: string): void;
    static notEqual<T>(expected: T, actual: T, message?: string): void;
    static looseEqual<T>(actual: T, expected: T, message?: string): void;
    static notLooseEqual<T>(actual: T, expected: T, message?: string): void;
    static strictEqual<T>(actual: T, expected: T, message?: string): void;
    static notStrictEqual<T>(actual: T, expected: T, message?: string): void;
    static is<T>(actual: T, expected: T, message?: string): void;
    static has<T, U>(target: T, keyPath: keyof T | string, expected: U, message?: string): void;
    static regexMatches(actual: string, expected: RegExp, message?: string): void;
    static resolvesTo<T>(actual: Promise<T>, expected: T, message?: string): Promise<void>;
    static rejects<T>(actual: Promise<T>, expected?: Error, message?: string): Promise<void>;
    static fail(message?: string): void;
    static isTrue(value: boolean, message?: string): void;
    static isFalse(value: boolean, message?: string): void;
    static isTruthy(value: boolean, message?: string): void;
    static isFalsy(value: boolean, message?: string): void;
    private static printObject;
}
export { Assert };
