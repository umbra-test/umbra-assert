declare class Expect {
    private readonly target;
    constructor(target: any);
    toBe(value: any): void;
    toHaveProperty(keyPath: string, value?: any): void;
    toBeTruthy(): void;
    toBeFalsy(): void;
}
export { Expect };