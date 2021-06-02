// TestCase: 包含列表元素
expect(run()).to.include.members("ul ol li".split(" "));
// TestCase: 包含表单元素
expect(run()).to.include.members("form input select option textarea".split(" "));
// TestCase: 包含媒体元素
expect(run()).to.include.members("video audio canvas img".split(" "));
// TestCase: 包含表格元素
expect(run()).to.include.members("table thead tbody tr th td".split(" "));
// TestCase: 包含行内元素
expect(run()).to.include.members("a i span label strong button small".split(" "));
// TestCase: 包含块元素
expect(run()).to.include.members("div p h1 h2 h3 h4 h5 h6 header main footer section article".split(" "));