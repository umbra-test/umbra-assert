"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Assert_1 = require("./Assert");
class Expect {
    constructor(target) {
        this.target = target;
    }
    toBe(value) {
        Assert_1.Assert.equal(this.target, value);
    }
    toHaveProperty(keyPath, value) {
        Assert_1.Assert.has(this.target, keyPath, value);
    }
    toBeTruthy() {
        Assert_1.Assert.isTruthy(this.target);
    }
    toBeFalsy() {
        Assert_1.Assert.isFalsy(this.target);
    }
}
exports.Expect = Expect;
//# sourceMappingURL=Expect.js.map