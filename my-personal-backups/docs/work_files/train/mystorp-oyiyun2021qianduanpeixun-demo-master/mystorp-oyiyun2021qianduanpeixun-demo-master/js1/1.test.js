// TestCase: 1
expect(run(1)).to.deep.equal([1]);
// TestCase: 2
expect(run(2)).to.deep.equal([1, 2]);
// TestCase: 10
expect(run(10)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// TestCase: -5
expect(run(-5)).to.deep.equal([]);
