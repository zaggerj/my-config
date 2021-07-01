# 常用命令

## 打增量包

用途：需要打补丁包时，一般仅仅打增量包就够了，打全量包有百害而无一利。

原理：打增量包就是把变动的文件集合起来，因此核心在于如何获取变更的文件列表。在 git 里面，获取文件变更列表可以通过两种方式完成，这取决于你的实际情况。

### build 后提交前获取变更列表

此时，变更的文件列表可以使用 `git status` 命令查看到，因此获取文件列表很简单：

```bash
git status -s
```

### build 后提交后获取变更列表

这种方式更常见，通用性也更强，因为可能打了不止一次包，如何找到从开始到现在的所有的变更文件呢？使用 `git diff` 命令

```bash
# 假设首次提交的 COMMIT ID 为 3a7bb6d0a7580eaf3f0c3ddc483dc717c66d01cc
# 则从 3a7bb6d0a7580eaf3f0c3ddc483dc717c66d01cc 到分支当前状态，所有的文件变更列表为：
git diff 3a7bb6d0a7580eaf3f0c3ddc483dc717c66d01cc.. --name-status
```

这条命令获取指定的 git 提交范围（revision range），并计算差异，最终打印变更类型和文件名（--name-status）

变更的文件列表一般长这样：

```plain
M       built/forget.map
M       built/index.js
M       built/index.map
M       built/init.map
M       built/spice.js
M       built/spice.map
M       built/split.map
M       built/ssh.map
M       built/weblogin.map
M       resources/arm/lang.json
M       resources/en/lang.json
M       resources/vpc/lang.json
M       resources/zh-cn/lang.json
M       resources/zh-tw/lang.json
```

可以看到，变更列表由两列组成，第一列就是变更类型，第二列是文件路径，文件列表就是第二列的全部内容。在 git bash 里面可以使用 awk 命令获取这个列表：

```bash
git diff 3a7bb6d0a7580eaf3f0c3ddc483dc717c66d01cc.. --name-status | awk -e '{print $2}'
```

输出：

```plain
built/forget.map
built/index.js
built/index.map
built/init.map
built/spice.js
built/spice.map
built/split.map
built/ssh.map
built/weblogin.map
resources/arm/lang.json
resources/en/lang.json
resources/vpc/lang.json
resources/zh-cn/lang.json
resources/zh-tw/lang.json
```

之后将文件列表传递给 `git archive` 命令即可完成打包压缩：

```bash
git diff 3a7bb6d0a7580eaf3f0c3ddc483dc717c66d01cc.. --name-status | awk -e '{print $2}' | xargs git archive -o update.zip HEAD
```

某些情况，`git archive` 可能仅仅打了一部分文件，这时可以使用 bash 数组来存储文件列表，然后打包：

```bash
FILES=($(git diff 3a7bb6d0a7580eaf3f0c3ddc483dc717c66d01cc.. --name-status | awk -e '{print $2}'))
# 此处为 bash 数组特定用法，不可修改半个字符
git archive -o update.zip HEAD "${FILES[@]}"
```

## 打包翻译资源给产品经理

用途：需要做繁体、英文版时，产品经理会要求前端提供目前的翻译资源，然后交由国际部进行翻译，翻译完成后，由前端整合进代码里面

命令（需要提前 build）

```bash
cd ngconsole
mkdir -p out/{en,zh-cn,zh-tw,vpc}
for dir in en zh-cn zh-tw vpc; do
    for file in code.json lang.json; do
        # 也可以使用 node 格式化
        # node -e 'process.stdout.write(JSON.stringify(fs.readFileSync(process.argv[1], "utf-8"), null, 4))' resources/$dir/$file > out/$dir/$file
        jq -r '.' resources/$dir/$file > out/$dir/$file
    done
done
cd out
zip -r ../语言包.zip .
cd ..
rm -rf out
```

提交资源给产品经理时，将如下说明一并发送，确保收到的资源被正确的修改。

翻译说明：

1. .json 是一种键值一一对应的纯文本文件，每行的格式为："键": "值"
2. 翻译时，仅仅翻译值的部分就可以了，如下面绿色部分：

     ```json
   {
     "101": "资源池未找到",
     "102": "资源池创建失败",
     "103": "资源池更新失败",
     "104": "资源池销毁失败",
     "105": "创建云PC HA策略名称相同",
     "106": "创建云PC HA策略必须有云PC",
     "分布式存储": "分布式存储",
     "新增分布式存储": "新增分布式存储",
     "修改分布式存储": "修改分布式存储",
     "删除分布式存储": "删除分布式存储",
     "分布式存储名": "分布式存储名",
   }
     ```

3. 以下情况无需翻译：
   * &lt;li&gt;  即  小于号和大于号包裹的区域
   * <https://www.baidu.com>  即  网址无需翻译
   * {{0} } 双大括号直接忽略
   * `&xxxx;`  形如这种格式的都忽略，常见的有 `&nbsp`;
4. 推荐使用 notepad++ 等支持高亮特性编辑器打开.json文件进行编辑
