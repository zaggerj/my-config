// TestCase: {integer: 1}
expect(run([1])).to.deep.equal({integer: 1});
// TestCase: {boolean: 1}
expect(run([true])).to.deep.equal({boolean: 1});
// TestCase: {boolean: 2}
expect(run([true, true])).to.deep.equal({boolean: 2});
// TestCase: {float: 1}
expect(run([1.1])).to.deep.equal({float: 1});
// TestCase: {string: 1}
expect(run(["1"])).to.deep.equal({string: 1});
// TestCase: {string: 1, float: 2}
expect(run(["1", 1.3, 1.4])).to.deep.equal({string: 1, float: 2});
// TestCase: {string: 2, integer: 3, float: 1, boolean: 2}
expect(run(["1", "2", 3, 5, 6.1, 7.0, true, false])).to.deep.equal({string: 2, integer: 3, float: 1, boolean: 2});
// TestCase: null
expect(() => run([null])).to.throw();
// TestCase: undefined
expect(() => run([undefined])).to.throw();
// TestCase: function
expect(() => run([function(){}])).to.throw();