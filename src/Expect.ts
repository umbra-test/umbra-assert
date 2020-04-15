import { Assert } from "./Assert";

class Expect {

    private readonly target: any;

    constructor(target: any) {
        this.target = target;
    }

    public toBe(value: any): void {
        Assert.equal(this.target, value);
    }

    public toHaveProperty(keyPath: string, value?: any): void {
        Assert.has(this.target, keyPath, value);
    }

    public toBeTruthy(): void {
        Assert.isTruthy(this.target);
    }

    public toBeFalsy(): void {
        Assert.isFalsy(this.target);
    }
}

function expect(target: any) {
    return new Expect(target);
}

export {
    expect
};