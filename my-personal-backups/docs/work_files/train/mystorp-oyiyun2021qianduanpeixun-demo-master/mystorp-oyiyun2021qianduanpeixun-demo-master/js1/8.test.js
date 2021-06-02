// TestCase: 3, 4
expect(run(3, 4)).to.equal(5);
// TestCase: 5, 12
expect(run(5, 12)).to.equal(13);
// TestCase: 3, 4, 5
expect(run(3, 4, 5) + "").to.include("7.07106781186");