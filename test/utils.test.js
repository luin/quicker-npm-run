const { match } = require("../src/utils");
const { expect } = require("chai");

describe("match", () => {
  it("works", () => {
    expect(match("ds", ["docker:ssh", "dsool", "abc"])).to.eql([
      "docker:ssh",
      "dsool"
    ]);

    expect(match("ds", ["docker:ssh", "dsool", "abc", "ds"])).to.eql(["ds"]);

    expect(match("ds", ["docker:ssh", "dds"])).to.eql(["docker:ssh", "dds"]);
    expect(match("test", ["docker:ssh", "test:ts"])).to.eql(["test:ts"]);
    expect(match("", ["docker:ssh", "test:ts"])).to.eql([
      "docker:ssh",
      "test:ts"
    ]);
  });
});
