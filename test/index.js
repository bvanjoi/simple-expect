import { expect } from "../lib/index.js";
import test from "node:test";

test("equal", async (t) => {
  await t.test("object", () => {
    expect({}).equal({});
    expect({ a: 1 }).equal({ a: 1 });
    expect({ a: 1 }).not.equal({ b: 1 });
    expect({ a: 1, b: [] }).not.not.equal({ a: 1, b: [] });
  });

  await t.test("basic type", () => {
    expect(1).equal(1)
    expect(1 + 1).not.equal(1)
    expect('a').equal('a')
    expect(1n).equal(1n)
    expect(null).equal(null)
    expect(undefined).equal(undefined)
    expect(undefined).not.equal(null)
  })
});

test("is", async (t) => {
  await t.test("function", () => {
    function a1() {}
    const a2 = a1;
    expect(a2).is(a1);
    expect(function () {}).not.is(a1);
  })

  await t.test("object", () => {
    const a1 = {};
    const a2 = a1;
    const a3 = a2;
    expect(a3).is(a1);
    expect(a3).is(a2);
    expect(a2).is(a2);
    expect({}).not.is(a3);
  })
});

// TODO: more test case and snapshot.