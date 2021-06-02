// TestCase: "  3232##32# 3# 9# #11  "
expect(run("  3232##32# 3# 9# #11  ")).to.deep.equal([3232, 32, 3, 9, 11]);
// TestCase: "  3232 32  3  9   11  "
expect(run("  3232  32  3  9   11  ")).to.deep.equal([3232, 32, 3, 9, 11]);