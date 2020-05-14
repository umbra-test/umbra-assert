import { assert } from "./Assert";

class Expect {

    private readonly target: any;

    constructor(target: any) {
        this.target = target;
    }

    public toBe(value: any): void {
        assert.equal(this.target, value);
    }

    public toHaveProperty(keyPath: string, value?: any): void {
        assert.has(this.target, keyPath, value);
    }

    public toBeTruthy(): void {
        assert.isTruthy(this.target);
    }

    public toBeFalsy(): void {
        assert.isFalsy(this.target);
    }
}

function expect(target: any) {
    return new Expect(target);
}

export {
    Expect,
    expect
};