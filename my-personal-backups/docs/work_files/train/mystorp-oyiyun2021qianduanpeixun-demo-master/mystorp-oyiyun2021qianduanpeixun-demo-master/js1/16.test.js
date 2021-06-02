// TestCase: ""
expect(run("")).to.deep.equal({});
// TestCase: "a"
expect(run("a")).to.deep.equal({});
// TestCase: "&"
expect(run("&")).to.deep.equal({});
// TestCase: "=a"
expect(run("=a")).to.deep.equal({});
// TestCase: "a="
expect(run("a=")).to.deep.equal({a: ""});
// TestCase: "a=b"
expect(run("a=b")).to.deep.equal({a: "b"});
// TestCase: "a=b&a="
expect(run("a=b&a=")).to.deep.equal({a: ["b", ""]});
// TestCase: "a=b&b=c&c=1"
expect(run("a=b&b=c&c=1")).to.deep.equal({a: "b", b: "c", c: "1"});
// TestCase: "code=2323&type=user&id=3"
expect(run("code=2323&type=user&id=3")).to.deep.equal({code: "2323", type: "user", id: "3"});
// TestCase: "a=b&a=c&b=c&c=1&c=a"
expect(run("a=b&a=c&b=c&c=1&c=a")).to.deep.equal({a: ["b", "c"], b: "c", c: ["1", "a"]});