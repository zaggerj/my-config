function convert(arr) {
    let obj = {integer: 0, float: 0, boolean: 0, string: 0};
    for(let i = 0, len = arr.length; i < len; i++) {
        let type = typeof arr[i];
        if(type !== "number" && !obj.hasOwnProperty(type)) {
            throw new Error("can't handle type: " + type);
        }
        if(type === "number") {
            if(arr[i] % 1 === 0) {
                obj.integer++;
            } else {
                obj.float++;
            }
        } else {
            obj[type]++;
        }
    }
    Object.keys(obj).filter(x => obj[x] === 0).forEach(x => {
        delete obj[x];
    });
    return obj;
}
// TestCase: {integer: 1}
expect(convert(run({integer: 1}))).to.deep.equal({integer: 1});
// TestCase: {boolean: 1}
expect(convert(run({boolean: 1}))).to.deep.equal({boolean: 1});
// TestCase: {boolean: 2}
expect(run({boolean: 2})).to.have.members([true, false]);
// TestCase: {float: 1}
expect(convert(run({float: 1}))).to.deep.equal({float: 1});
// TestCase: {string: 1}
expect(convert(run({string: 1}))).to.deep.equal({string: 1});
// TestCase: {xtype: 1}
expect(() => run({xtype: 1})).to.throw();