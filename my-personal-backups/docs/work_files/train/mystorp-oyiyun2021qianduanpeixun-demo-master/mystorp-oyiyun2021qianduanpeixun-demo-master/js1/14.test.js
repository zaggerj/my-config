// TestCase: 3+4
expect(run("3+4")).to.equal(7);
// TestCase: 3-4
expect(run("3-4")).to.equal(-1);
// TestCase: 3*4
expect(run("3*4")).to.equal(12);
// TestCase: 3/4
expect(run("3/4")).to.equal(0.75);
// TestCase: 3+4+6
expect(run("3+4+6")).to.equal(13);
// TestCase: 3+4-6
expect(run("3+4-6")).to.equal(1);
// TestCase: 3+4*6
expect(run("3+4*6")).to.equal(27);
// TestCase: 3+4/6
expect(run("3+4/6") + "").to.include("3.666666");