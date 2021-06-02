// TestCase: "1010000"
expect(run("1010000")).to.equal(80);
// TestCase: "0"
expect(run("0")).to.equal(0);
// TestCase: ""
expect(run("")).to.be.NaN;
// TestCase: "1"
expect(run("1")).to.equal(1);
// TestCase: "12345"
expect(run("12345")).to.be.NaN;