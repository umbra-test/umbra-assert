import { assert } from "../src/index";

describe("assert", () => {

    const primitives = ["0", "1", null, undefined, "", 0, 1, {}, true, false, function () { }, [1, 2], "1,2"];
    const deepObject = {
        foo: {
            bar: {
                foo: "1",
                bar: "2"
            }
        },
        bar: {
            foo: ["bar"]
        }
    };

    const deepObject2 = {
        foobar: {},
        barfoo: {}
    };

    function expectTestFailure(callback: () => void) {
        try {
            callback();
        } catch (e) {
            return;
        }

        throw new Error("Test did not throw an error");
    }

    describe("equal/not equal", () => {

        it("Matches same primitive values", () => {
            for (const primitive of primitives) {
                assert.equal(primitive, primitive);
                expectTestFailure(() => assert.notEqual(primitive, primitive));
            }
        });

        it("Throws for different primitive values", () => {
            for (let i = 0; i < primitives.length; i++) {
                const comparisonValue = primitives[(i + 1) % primitives.length];
                expectTestFailure(() => assert.equal(primitives[i], comparisonValue));
                assert.notEqual(primitives[i], comparisonValue);
            }
        });

        it("matches object deeply", () => {
            assert.equal(deepObject, deepObject);
            expectTestFailure(() => assert.notEqual(deepObject, deepObject));
        });

        it("fails if object does not match deeply", () => {
            expectTestFailure(() => assert.equal(deepObject, deepObject2));
            assert.notEqual(deepObject, deepObject2);
        });

    });

    describe("strict equal/not equal", () => {

        it("Matches same primitive values", () => {
            for (const primitive of primitives) {
                assert.strictEqual(primitive, primitive);
                assert.is(primitive, primitive);
                expectTestFailure(() => assert.notStrictEqual(primitive, primitive));
            }
        });

        it("Throws for different primitive values", () => {
            for (let i = 0; i < primitives.length; i++) {
                const comparisonValue = primitives[(i + 1) % primitives.length];
                expectTestFailure(() => assert.strictEqual(primitives[i], comparisonValue));
                expectTestFailure(() => assert.is(primitives[i], comparisonValue));
                assert.notStrictEqual(primitives[i], comparisonValue);
            }
        });

    });

    describe("loose equal", () => {

        const looseEqualPrimitives1 = [false, 0, "", [[]], [], "0", [0], [1], "1", 1, true, -1, "-1", null, undefined, Infinity, -Infinity, "false", "true", {}, NaN];
        const looseEqualPrimitives2 = [false, 0, "", [[]], [], "0", [0], [1], "1", 1, true, -1, "-1", null, undefined, Infinity, -Infinity, "false", "true", {}, NaN];
        const expectedValues = [
            [true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [true, true, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [true, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        ]

        it("Matches loose equals contract", () => {
            for (let i = 0; i < looseEqualPrimitives1.length; i++) {
                for (let j = 0; j < looseEqualPrimitives2.length; j++) {
                    let threwEqualException = false;
                    let threwNotEqualException = false;
                    try {
                        assert.looseEqual(looseEqualPrimitives1[i], looseEqualPrimitives2[j]);
                    } catch (e) {
                        threwEqualException = true;
                    }

                    try {
                        assert.notLooseEqual(looseEqualPrimitives1[i], looseEqualPrimitives2[j]);
                    } catch (e) {
                        threwNotEqualException = true;
                    }

                    if (threwEqualException === expectedValues[i][j]) {
                        throw new Error(`Loose equals matched when not expected. Values: ${looseEqualPrimitives1[i]} ${looseEqualPrimitives2[j]}`);
                    }

                    if (threwEqualException === threwNotEqualException) {
                        throw new Error("Equals did not match not equals");
                    }
                }
            }
        });

        it("Matches loose equals contract for 1 like primitives", () => {
            const onePrimitives = [1, "1", [1], true]
            for (let i = 0; i < onePrimitives.length; i++) {
                for (let j = 0; j < onePrimitives.length; j++) {
                    assert.looseEqual(onePrimitives[i], onePrimitives[j]);
                }
            }
        });

    });

    describe("regexMatches", () => {

        it("Matches using regex", () => {
            assert.regexMatches("foobar", /^foo/);
        });

        it("Throws if the regex does not match", () => {
            try {
                assert.regexMatches("foobar", /^bar/);
            } catch (e) {
                if (`Expected "foobar" to match the regex /^bar/` === e) {
                    throw new Error("Error message did not match");
                }
            }
        });

    });

    describe("has", () => {

        it("Matches one level deep", () => {
            assert.has(deepObject, "foo", deepObject.foo);
        });

        it("Matches two levels deep", () => {
            assert.has(deepObject, "foo.bar", deepObject.foo.bar);
        });

        it("Fails if a given property is missing", () => {
            expectTestFailure(() => assert.has(deepObject, "missing", deepObject.foo));
        });

    });

    describe("exists", () => {

        it("handles primitives", () => {
            for (const primitive of primitives) {
                if (primitive === null || primitive === undefined) {
                    expectTestFailure(() => assert.exists(primitive));
                } else {
                    assert.exists(primitive);
                }
            }
        });

    });

    describe("boolean logic", () => {

        it("isTrue succeeds on true values", () => {
            assert.isTrue(true);
        });

        it("isTrue fails on false values", () => {
            expectTestFailure(() => assert.isTrue(false));
        });

        it("isFalse succeeds on false values", () => {
            assert.isFalse(false);
        });

        it("isFalse fails on true values", () => {
            expectTestFailure(() => assert.isFalse(true));
        });

        it("isTruthy succeeds on true values", () => {
            assert.isTruthy(true);
            assert.isTruthy({});
            assert.isTruthy({ a: "a" });
            assert.isTruthy("a");
        });

        it("isTruthy fails on true values", () => {
            expectTestFailure(() => assert.isTruthy(false));
            expectTestFailure(() => assert.isTruthy(""));
            expectTestFailure(() => assert.isTruthy(null));
            expectTestFailure(() => assert.isTruthy(undefined));
            expectTestFailure(() => assert.isTruthy(0));
        });

        it("isFalsy fails on falsy values", () => {
            assert.isFalsy(false);
            assert.isFalsy("");
            assert.isFalsy(null);
            assert.isFalsy(undefined);
            assert.isFalsy(0);
        });

        it("isFalsy fails on truthy values", () => {
            expectTestFailure(() => assert.isFalsy(true));
            expectTestFailure(() => assert.isFalsy({}));
            expectTestFailure(() => assert.isFalsy({ a: "a" }));
            expectTestFailure(() => assert.isFalsy("a"));
        });

    });

    describe("fail", () => {

        it("always fails the test", () => {
            expectTestFailure(() => assert.fail("failure"));
        });

    });

    describe("resolvesTo", () => {

        it("Succeeds if it matches returned value", () => {
            const value = "value";
            return assert.resolvesTo(Promise.resolve(value), value);
        });

        it("Fails if it cannot match returned value", () => {
            return assert.resolvesTo(Promise.resolve("value"), "value2")
                .then(() => {
                    throw new Error("Promise was resolved, but was expected to be rejected");
                }, () => {
                    // no-op
                });
        });

        it("Throws if rejected promise is expected", () => {
            return assert.resolvesTo(Promise.reject(), "value")
                .then(() => {
                    throw new Error("Promise was resolved, but was expected to be rejected");
                }, () => {
                    // no-op
                });
        });

    });

    describe("rejects", () => {

        it("Succeeds if rejected promise", () => {
            return assert.rejects(Promise.reject());
        });

        it("Succeeds if rejected promise error message matches", () => {
            const errorMessage = "error message";
            return assert.rejects(Promise.reject(new Error(errorMessage)), errorMessage);
        });

        it("Succeeds if rejected promise error matches", () => {
            const errorMessage = "error message";
            return assert.rejects(Promise.reject(new Error(errorMessage)), new Error(errorMessage));
        });

        it("Throws if rejected promise is expected", () => {
            return assert.rejects(Promise.resolve(""))
                .then(() => {
                    throw new Error("Promise was resolved, but was expected to be rejected");
                }, () => {
                    // no-op
                });
        });

        it("Throws if rejected promise is expected", () => {
            return assert.rejects(Promise.resolve(""))
                .then(() => {
                    throw new Error("Promise was resolved, but was expected to be rejected");
                }, () => {
                    // no-op
                });
        });

    });

    describe("contains", () => {

        it("succeeds if array contains the value", () => {
            assert.contains([1, 2, 3], 1);
        });

        it("fails if the array is missing the given value", () => {
            expectTestFailure(() => assert.contains([1, 2, 3], 4));
        });

        it("fails if the array is missing the given value with null message", () => {
            expectTestFailure(() => assert.contains([1, 2, 3], 4, null as any));
        });

        it("fails if the array is missing the given value with custom message", () => {
            expectTestFailure(() => assert.contains([1, 2, 3], 4, "message"));
        });

        it("succeeds if string contains the other substring", () => {
            assert.contains("123", "2");
        });

        it("fails if the string is missing the other substring", () => {
            expectTestFailure(() => assert.contains("123", "4"));
        });

        it("succeeds if object contains the other object", () => {
            assert.contains({ 1: 1, 2: 2, 3: 3 }, { 1: 1 });
        });

        it("fails if the object is missing the other object", () => {
            expectTestFailure(() => assert.contains({ 1: 1, 2: 2, 3: 3 }, { 1: 4 }));
        });

        it("fails if the object is missing the other object ", () => {
            expectTestFailure(() => assert.contains({ 1: 1, 2: 2, 3: 3 }, { 1: 4 }, null as any));
        });

        it("fails if the object is missing the other object with custom message", () => {
            expectTestFailure(() => assert.contains({ 1: 1, 2: 2, 3: 3 }, { 1: 4 }, "message"));
        });

    });

    describe("containsAll", () => {

        it("succeeds if array contains all the values", () => {
            assert.containsAll([1, 2, 3], [1, 3]);
        });

        it("fails if the array is missing the given values", () => {
            expectTestFailure(() => assert.containsAll([1, 2, 3], [4]));
        });

        it("fails if the array is missing one of the values", () => {
            expectTestFailure(() => assert.containsAll([1, 2, 3], [1, 4]));
        });

    });

});