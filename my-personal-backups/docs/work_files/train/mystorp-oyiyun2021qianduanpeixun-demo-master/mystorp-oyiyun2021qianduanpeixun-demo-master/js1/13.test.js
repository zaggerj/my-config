// TestCase: " x 3232#d#32#d 3# d9# #11 a "
expect(run(" x 3232#d#32#d 3# d9# #11 a ")).to.deep.equal([3232, 32, 3, 9, 11]);
// TestCase: " a 3232#b#32# c3# 9# #11d  "
expect(run(" a 3232#b#32# c3# 9# #11d  ")).to.deep.equal([3232, 32, 3, 9, 11]);
