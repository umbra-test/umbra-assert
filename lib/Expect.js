"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.Expect = void 0;
const Assert_1 = require("./Assert");
class Expect {
    constructor(target) {
        this.target = target;
    }
    toBe(value) {
        Assert_1.assert.equal(this.target, value);
    }
    toHaveProperty(keyPath, value) {
        Assert_1.assert.has(this.target, keyPath, value);
    }
    toBeTruthy() {
        Assert_1.assert.isTruthy(this.target);
    }
    toBeFalsy() {
        Assert_1.assert.isFalsy(this.target);
    }
}
exports.Expect = Expect;
function expect(target) {
    return new Expect(target);
}
exports.expect = expect;
//# sourceMappingURL=Expect.js.map