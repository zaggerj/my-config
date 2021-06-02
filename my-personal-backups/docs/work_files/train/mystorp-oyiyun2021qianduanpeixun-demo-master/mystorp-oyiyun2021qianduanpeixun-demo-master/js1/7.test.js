// TestCase: 0123456789
expect("0123456789".split("").map(run)).to.deep.equal(new Array(10).fill("digit"));
// TestCase: abcdefghijklmnopqrstuvwxyz
expect("abcdefghijklmnopqrstuvwxyz".split("").map(run)).to.deep.equal(new Array(26).fill("letter"));
// TestCase: ABCDEFGHIJKLMNOPQRSTUVWXYZ
expect("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(run)).to.deep.equal(new Array(26).fill("LETTER"));
// TestCase: \t \r\n
expect("\t \r\n".split("").map(run)).to.deep.equal(new Array(4).fill("whitespace"));
// TestCase: ,.~!@#$%^&*()_+=-`,./;'":?><
expect(`,.~!@#$%^&*()_+=-\`,./;'":?><`.split("").map(run)).to.deep.equal(new Array(28).fill("punctuator"));
// TestCase: \x00\x01\x02\x03
expect("\x00\x01\x02\x03".split("").map(run)).to.deep.equal(new Array(4).fill("unknow"));