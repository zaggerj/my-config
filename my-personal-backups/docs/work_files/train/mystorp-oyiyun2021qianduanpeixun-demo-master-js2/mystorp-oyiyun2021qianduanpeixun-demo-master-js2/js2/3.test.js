// TestCase: sin(45°)
expect(run(45, "sin").toFixed(10)).to.equal("0.7071067812"); 
// TestCase: arcsin(0.7071067812)
expect(run(0.7071067812, "arcsin").toFixed(10)).to.equal("0.7853981634"); 
// TestCase: sin(90°)
expect(run(90, "sin")).to.equal(1); 
// TestCase: arcsin(90)
expect(run(90, "asin").toFixed(10)).to.equal("1.5707963268"); 
// TestCase: cos(45°)
expect(run(45, "cos").toFixed(10)).to.equal("0.7071067812"); 
// TestCase: arccos(45°)
expect(run(45, "acos").toFixed(10)).to.equal("0.7853981634"); 
// TestCase: cos(90°)
expect(run(90, "cos").toFixed(10)).to.equal("0.0000000000"); 
// TestCase: arccos(90°)
expect(run(90, "acos").toFixed(10)).to.equal("1.5707963268"); 
// TestCase: tan(45°)
expect(run(45, "tan").toFixed(10)).to.equal("1.0000000000"); 
// TestCase: arctan(45°)
expect(run(45, "atan").toFixed(10)).to.equal("0.7853981634"); 
