// TestCase: -1
expect(() => run(-1)).to.throw();
// TestCase: 0
expect(() => run(0)).to.throw();
// TestCase: 1
expect(run(1)).to.equal(0);
// TestCase: 10
expect(run(10)).to.equal(9);
// TestCase: 1000000
expect(run(1000000)).to.equal(999999);
// TestCase: 59323223112
expect(run(59323223112)).to.equal(59323132395);