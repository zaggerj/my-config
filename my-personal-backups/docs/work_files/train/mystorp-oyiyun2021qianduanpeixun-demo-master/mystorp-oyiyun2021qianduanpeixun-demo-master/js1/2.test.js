// TestCase: 1
expect(run(1)).to.equal(-1);
// TestCase: 2
expect(run(2)).to.equal(1);
// TestCase: 1000
expect(run(1000)).to.equal(500);
// TestCase: 999
expect(run(999)).to.equal(-500);
// TestCase: 0
expect(run(0)).to.equal(0);
// TestCase: -3
expect(run(-3)).to.equal(0);
// TestCase: -4
expect(run(-4)).to.equal(0);