// TestCase: 12345
expect(run("12345")).to.be.false;
// TestCase: 12321
expect(run("12321")).to.be.true;
// TestCase: 0
expect(run("0")).to.be.true;
// TestCase: 00
expect(run("00")).to.be.true;
// TestCase: empty
expect(run("")).to.be.false;