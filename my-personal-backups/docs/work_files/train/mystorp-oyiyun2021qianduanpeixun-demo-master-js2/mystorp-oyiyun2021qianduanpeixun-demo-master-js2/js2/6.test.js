// TestCase: demo
expect(run(logText)).to.deep.equal({
    authors: {
        '陈杰': 472,
        '罗乘凤': 225,
        '黄琼': 1642,
        '白雨': 1568,
        '韩晓祥': 110,
        '朱涛': 64,
        '佚名': 29,
        '郭咏梅': 50,
        '郭卫平': 3,
        '张垚': 1228,
        '涂浪': 272,
        '黄子杰': 1823,
        '魏聪': 1204,
        '王川': 643,
        '贾志浩': 3,
        '田怡文': 82
    },
    files: {
        exists: 2460,
        deleted: 1837
    }
});
// 需要实现的测试用例
// TODO: TestCase: file type modified count {js: 3, html: 1, css: 4}
// TODO: TestCase: chart: author, commit count
// TODO: TestCase: chart: top 100 modified & exists js file
// TODO: TestCase: chart: top 100 modified & exists css file
// TODO: TestCase: modified cound {"before lunch": 33, "after lunch": 33, "after dinner": 33}