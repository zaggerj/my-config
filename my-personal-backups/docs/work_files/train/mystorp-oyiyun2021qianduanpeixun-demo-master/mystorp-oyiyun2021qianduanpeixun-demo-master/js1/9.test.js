// TestCase: 1, 2, 3, 4
expect(run(1,2,3,4)).to.deep.equal([1, 4]);
// TestCase: 2, 3, 5
expect(run(2, 3, 5)).to.deep.equal([]);
// TestCase: 9, 9, 27
expect(run(9, 9, 27)).to.deep.equal([9, 9]);