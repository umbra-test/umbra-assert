import { assert } from "../src/index";

describe("assert", () => {

    const primitives = ["0", "1", null, undefined, "", 0, 1, {}, true, false, function () { }];
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

    describe("equal", () => {

        it("Matches same primitive values", () => {
            for (const primitive of primitives) {
                assert.equal(primitive, primitive);
            }
        });

        it("Throws for different primitive values", () => {
            for (let i = 0; i < primitives.length; i++) {
                try {
                    assert.equal(primitives[i], primitives[(i + 1) % primitives.length]);
                } catch (e) {
                    continue;
                }

                throw new Error("Test should have failed");
            }
        });

        it("matches object deeply", () => {
            assert.equal(deepObject, deepObject);
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
            try {
                assert.has(deepObject, "missing", deepObject.foo);
            } catch (e) {
                return;
            }

            throw new Error("Did not fail the test");
        });

    });

});