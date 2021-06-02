// TestCase: integer
expect(run([1, 2, 3])).to.deep.equal({integer: 3});
// TestCase: float
expect(run([1.12, 2.13, 3.14])).to.deep.equal({float: 3});
// TestCase: boolean
expect(run([true, false, false])).to.deep.equal({boolean: 3});
// TestCase: string
expect(run(["true", "false", "false"])).to.deep.equal({string: 3});
// TestCase: integer, float
expect(run([1, 2, 3.14])).to.deep.equal({integer: 2, float: 1});
// TestCase: integer, float, string
expect(run([1, "2", 3.14])).to.deep.equal({integer: 1, float: 1, string: 1});
// TestCase: integer, float, string, boolean
expect(run([1, "2", 3.14, false])).to.deep.equal({integer: 1, float: 1, string: 1, boolean: 1});
