declare type ExtractArrayType<T> = T extends any[] ? T[number] : T extends object ? Partial<T> : T;
declare class assert {
    static that<T>(output: boolean): void;
    static equal(expected: any, actual: any, message?: string): void;
    static notEqual(expected: any, actual: any, message?: string): void;
    static looseEqual(actual: any, expected: any, message?: string): void;
    static notLooseEqual(actual: any, expected: any, message?: string): void;
    static strictEqual<T>(actual: T, expected: T, message?: string): void;
    static notStrictEqual<T>(actual: T, expected: T, message?: string): void;
    static is(actual: any, expected: any, message?: string): void;
    static has<T, U>(target: T, keyPath: string, expected: U, message?: string): void;
    static regexMatches(actual: string, expected: RegExp, message?: string): void;
    static resolvesTo<T>(actual: Promise<T>, expected: T, message?: string): Promise<void>;
    static rejects<T>(actual: Promise<T>, expected?: Error | string, message?: string): Promise<void>;
    static fail(message?: string): void;
    static isTrue(value: boolean, message?: string): void;
    static isFalse(value: boolean, message?: string): void;
    static isTruthy(value: any, message?: string): void;
    static isFalsy(value: any, message?: string): void;
    static exists<T>(expected: T | null | undefined, message?: string): expected is T;
    static contains<T extends any[] | string | any>(target: T, value: ExtractArrayType<T>, message?: string): void;
    static containsAll<T>(target: T[], values: T[], message?: string): void;
}
export { assert };
