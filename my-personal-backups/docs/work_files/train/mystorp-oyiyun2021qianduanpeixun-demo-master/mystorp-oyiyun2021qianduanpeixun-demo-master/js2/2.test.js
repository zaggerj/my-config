// TestCase: "3+4-7"
expect(run("3+4-7")).to.equal(0);
// TestCase: "3*(4-7)"
expect(run("3*(4-7)")).to.equal(-9);
// TestCase: "30+14-37"
expect(run("30+14-37")).to.equal(7);
// TestCase: "(3*4+3)/7"
expect(run("(3*4+3)/7")).to.equal(2);
// TestCase: "3+4-7+8-1+3*3"
expect(run("3+4-7+8-1+3*3")).to.equal(16);
// TestCase: "3+4/2-7+8-1+3*3"
expect(run("3+4/2-7+8-1+3*3")).to.equal(14);