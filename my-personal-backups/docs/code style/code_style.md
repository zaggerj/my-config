# 代码风格
目前前端代码仓库里面，风格各不相同，不便于统一维护管理。为了方便后期代码合并、优化等，这里给出一份统一的配置。

**说明：VOI 项目组目前使用 prettier 格式化，和 VDI 项目组略有不同。**

VDI 项目组代码风格简单说明如下：

| 语言 | 风格 |
| --- | ---- |
| JavaScript | [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) |
| CSS | [stylelint standard](https://github.com/stylelint/stylelint-config-standard) |
| HTML | [js-beautify](https://github.com/beautify-web/js-beautify) |

## 配置说明
由于前端语言的特殊性，单纯配置一个语言总是显得有些奇怪，比如：配置了 js 代码风格，如何处理 html, vue 里面的 js 代码？如果配置了 html, vue 的代码风格，则必然包括 js, css 的代码风格。这么一来，一个问题就变成了 3 个问题。

因此代码风格的统一，首先需要统一三个认识：
* 前端的代码风格有三种：js, css, html
* 当说 html 代码风格的时候，只针对 html, 不考虑嵌套的 css, js
* 不存在 vue 代码风格，我们可以说 vue 里面 js 或 css 的代码风格等

配置代码风格的过程大同小异，可以总结为下面四步：
1. 添加配置文件。如：代码风格需要的依赖库，存储诸如缩进、空格、换行等规则的通用配置文件
2. 添加编辑器支持。如：标红不规范代码，保存时自动格式化等，这样可以确保及时发现代码问题
3. 添加 git 支持。确保提交的代码都是合规的，如果编写了单元测试，也可以进一步发现代码问题
4. 添加 CI/CD 支持。代码合规不等于没有bug，因此提交后需要做一些集成测试、系统测试等

下面根据以上四步分别介绍三种代码风格的配置。
## JavaScript
js 的重要性不言而喻，因此开源社区对它的支持近乎完美，不管你的 js 在哪里，都可以很方便的配置。

我们将要配置的 js 代码风格是 StandardJS, 它通过汇总一些 eslint 规则而成，eslint 是 js 里校验代码质量的大哥。

### 1. 添加配置文件
StandardJS 本身是一些 eslint 规则的集合，因此添加配置文件就是添加 eslint 的配置文件。

**这一步主要参考 eslint 的[文档](https://eslint.org/docs/user-guide/configuring/)（切记：不要参考 StandardJS 文档）。**

首先安装 `eslint`:
```bash
npm install eslint --save-dev
```
安装成功后执行下面的命令配置 StandardJS:
```bash
npx eslint --init
```
执行命令后，命令会依次问你几个问题，如下：

![eslint](./assets/eslint.gif)

**PS: 如果你当前配置的是 vue 项目，上面第三步就选择 vue，如果是 angularjs, 就选最后一个**

### 2. 添加编辑器支持
首先在 vscode 里面安装插件：[eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

然后修改 vscode 配置（默认是图形化的，需要调整为 json格式）：
```json
{
  // 输入时格式化
  "editor.formatOnType": true,
  // 粘贴代码时格式化
  "editor.formatOnPaste": true,
  // 保存时，修复所有发现的可修复问题
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  }
}
```

### 3. 添加 git 支持
添加 git 支持的过程就是配置 git pre-commit hook。它允许我们在提交代码之前，运行自定义命令。

如果对 `git hook` 很陌生，可以在 git bash 里面执行并查看命令输出：
```bash
git help hooks
```

配置 git hook 需要用到 `lint-staged`，直接安装：
```bash
npm i -D lint-staged
```

lint-staged 本身和 pre-commit 没有半毛钱关系，但是开源社区帮我们简化了这个过程：
```bash
npm i -g mrm@2
```

`mrm` 提供了很多配置文件的生成能力，在生成 lint-staged 配置文件时，它会自动帮我们做两件事：
1. 安装配置 git hook 的依赖，即 husky:
2. 在 package.json 里面增加 `"lint-staged"` 对象字段描述不同的文件如何校验，默认自动加上了 js, css 的校验支持

运行下面的命令生成配置吧：
```bash
mrm lint-staged
```

运行后，如果 package.json `devDependencies` 中新增了 husky，则 `pre-commit` 已经被正确的设置了，看下面动图：

![lint-staged + pre-commit](./assets/lint-staged1.gif)

配置 `pre-commit` 后，简单写个代码测试一下代码风格是否生效：

![lint-staged](./assets/lint-staged2.gif)

**注：windows系统可能在提交时会报错“node不是内部或外部命令”，此时请检查是否有node、npm的环境变量，没有的话请添加**

### 4. 添加 CI/CD 支持
配置 `.gitlab-ci.yml`，[点击这里](http://172.16.203.254/help/ci/yaml/README.md)参考语法说明。

这里暂不展开，后面单端写一篇讲解如何写 `.gitlab-ci.yml`。

## CSS
stylelint 是开源社区对 css 代码校验给出的解决方案，同时它借鉴了 StandardJS 给出了一个 standard 规则集配置。

### 1. 添加配置文件
1. 先安装依赖：
```bash
npm install --save-dev stylelint stylelint-config-standard
```
2. 在仓库根目录添加配置文件 `.stylelintrc.json`：
```json
{
  "extends": "stylelint-config-standard"
}
```

### 2. 添加编辑器支持
在 vscode 里面安装插件：[stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)，它可以自动标红不规范的 css 

> 后面看情况是否增加 js-beautify-css 的说明

### 3. 添加 git 支持
添加 js 的 git 支持时安装了 lint-staged，我们只需要在 package.json 里面 `"lint-staged"` 字段添加上 css 文件的处理就可以了：

```json{3-4}
{
  "lint-staged": {
    "*.css": "stylelint",
    "*.vue": "stylelint"
  }
}
```

### 4. 添加 CI/CD 支持
同上

## HTML
html 的支持要特殊一点，因为目前开源社区除了 prettier, js-beautify 没有太好的支持，有很多烂尾项目。

### 1. 添加配置文件
js-beautify 本身并不是基于规则的，它将各个规范细节做成了选项，因此和 eslint，stylelint 对比起来，可能不太适应。还有一点很特殊的是，js-beautify 是一个全能的格式化工具，它同时支持 js, css, html。

由于 js, css 我们已经能够找到更好的开源支持，因此只将它用于 html。

首先安装依赖：
```bash
npm install js-beautify --save-dev
```

然后在仓库目录里面添加配置文件 `.jsbeautifyrc`:
```json
{
  "eol": "\n",
  "indent_size": 2,
  "wrap-attributes": "preserve",
  "indent_char": " ",
  "indent_with_tabs": false,
  "templating": ["none"],
  "unformatted": ["script","pre","style"]
}
```
还有一些其它的配置项，默认值已经 ok 了，一般不需要修改
### 2. 添加编辑器支持
首先安装 [js-beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) 插件。

如果你希望处理 vue 里面的 html，还需要安装 [vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) 插件.

修改编辑器配置，添加如下的代码：
```json
{
  // html 文件保存时自动格式化
  "[html]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "HookyQR.beautify"
  },
  // vue 文件保存时自动格式化
  "[vue]": {
    "editor.formatOnSave": true
  },
  "vetur.format.enable": true,
  // 仅仅格式化 html 部分，忽略 js, css
  "vetur.format.defaultFormatter.js": "none",
  "vetur.format.defaultFormatter.css": "none",
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // 需要手动指定配置，vetur 插件不会读取仓库根目录配置
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "eol": "\n",
      "indent_size": 2,
      "wrap-attributes": "preserve",
      "indent_char": " ",
      "indent_with_tabs": false,
      "templating": ["none"],
      "unformatted": ["script","pre","style"]
    }
  }
}
```

### 3. 添加 git 支持
默认建议配置 html 格式化，这样不需要在提交时做校验。

### 4. 添加 CI/CD 支持
同上

## 全局格式化
由于格式化工具并不是万能的，当代码规则不能兼容所有的编码情况时，格式化的效果很可能不是我们所期望的，基于此，全局格式化也是不推荐的。

统一代码风格时，如果你发现自己总在做重复的事情：打开，按空格，保存；你很可能想要全局格式化，这并非不可取，但是**全局格式化后，提交代码前，请务必检查代码是正常的。**

全局格式化的过程就是将需要格式化的文件路径传递给对应的格式化工具，格式化工具依次对每个路径进行格式化。

~~有的平台(windows)对路径通配符的支持存在缺陷，因此下面的某些命令可能执行不成功，格式化时确保在 git bash 里面运行。~~

**目前经过测试，`eslint`, `stylelint`, `js-beautify` 都支持传递 `glob` 字符串：**
```bash
npx eslint "src/**/*.js"
npx stylelint "src/**/*.css"
npx js-beautify "src/**/*.html"
```

### JS
eslint 支持比较好，可以直接传递目录，它会格式化所有它能处理的文件。
```bash
npx eslint <dir>
npx eslint file.js
```

### css, vue/css
注意：stylelint 运行完之后会显示不符合项列表，实际代码已经被修改了。

`src/**/*.css` 表示 `src` 目录及所有子孙目录下面的所有 css 文件。

`*.{css,vue}` 表示当前目录下所有 css, vue 文件。

这两种文件路径表示法叫 glob。

```bash
npx stylelint "src/**/*.{css,vue}" --fix
```

### html, vue/html
```bash
npx html-beautify -r "src/**/*.{html,vue}"
```

## 老代码如何应用代码风格？
代码量不大，建议仓库主要负责人按上述方法应用。

代码量较大，建议每个模块的负责人按上述方法应用。

如果有实习生，导师可安排实习生应用。

有争议的情况，根据行作者占比来决定负责人，作者A的行作者占比即：`当前文件作者A修改的行数`/`当前文件总行数`。

这里使用到的主要命令是 `git blame`，这个命令可以输出当前每一行关联的提交消息，进而使用命令抽取作者信息进行汇总，这里使用 `awk` 来解析 `git blame` 输出：

**使用时请复制并保存到你的机器里面，下文以 `blame.awk` 表示它的名称**
```awk
BEGIN {
  names["0obuwawao0"] = names["魏聪"] = names["weicong"] = "魏聪"
  names["肖玮"] = "肖玮"
  names["zagger"] = names["黄子杰"] = "黄子杰"
  names["wangchuan"] = "王川"
  names["tianyiwen"] = "田怡文"
  names["zhangyao"] = "张垚"
  names["dengyong"] = "邓勇"
  names["luokai"] = "罗凯"
  names["fengying"] = "冯颖"
}

{
  if(NF == 1) {
    report()
    print $0
    next
  }
  if(0 == match($0, /\(([^ ]+)/, ax)) {
    next
  }
  lineAuthor = names[ax[1]]
  if(length(lineAuthor) == 0) {
    lineAuthor = ax[1]
  }
  authors[lineAuthor] += 1
  total += 1
}

function report(){
  i = 0
  for(author in authors) {
    c = authors[author]
    if(c > 0) {
      if(i > 0) {
        printf ", "
      }
      printf "%s: %g%%", author, 100 * c / total
      i += 1
    }
  }
  printf "\n"
  delete authors
  total = 0
}

END {
  report()
}
```

使用 `find` 命令可以查找到仓库某目录下所有符合筛选规则的文件，并对每个文件执行特定的操作：

```bash
# 这里以 ngconsole views/vdi 目录为例
find views/vdi/ -type f -print -exec git blame '{}' \; | awk -f blame.awk
```

**注意：上面的命令最好在 git bash 里面执行，否则可能会失败**

下面显示了一部分上面命令执行的结果，从结果里面可以很清晰的看到每个文件所有作者修改的占比情况，应用代码风格时可以根据占比情况来辅助决定负责人。

```txt
views/vdi/help/upgrade-tab-vdiclient.html
张垚: 100%
views/vdi/help/deploy.html
王川: 3.62473%, baiyu: 0.426439%, 田怡文: 0.639659%, 魏聪: 84.6482%, 张垚: 8.31557%, 黄子杰: 2.34542%
views/vdi/help/upgrade-tab-server.html
张垚: 93.1034%, 黄子杰: 6.89655%
views/vdi/template/hardware.html
王川: 2.24719%, 田怡文: 35.3933%, 魏聪: 14.0449%, 张垚: 1.1236%, 邓勇: 3.93258%, 黄子杰: 43.2584%
views/vdi/template/teach.html
魏聪: 1.87354%, 田怡文: 49.1803%, 张垚: 9.13349%, huangqiong: 0.702576%, 黄子杰: 39.1101%
views/vdi/template/fuse.html
魏聪: 4.53608%, 田怡文: 49.0722%, 黄子杰: 46.3918%
views/vdi/template/personal.html
baiyu: 0.240385%, 田怡文: 43.0288%, 魏聪: 38.4615%, 张垚: 0.961538%, huangqiong: 0.480769%, 黄子杰: 16.8269%
views/vdi/login.html
王川: 19.2308%, 魏聪: 3.84615%, 张垚: 61.5385%, 黄子杰: 15.3846%
views/vdi/user/domainList.html
fancyguo: 4.54545%, 张垚: 95.4545%
views/vdi/user/domain.html
fancyguo: 80.7692%, baiyu: 2.88462%, ajc: 0.961538%, 田怡文: 0.961538%, 张垚: 1.92308%, 黄子杰: 12.5%
views/vdi/user/admin.html
chenjie: 2.5641%, 张垚: 12.8205%, 黄子杰: 84.6154%
views/vdi/user/uaa.html
田怡文: 1.03093%, 张垚: 39.1753%, 黄子杰: 59.7938%

```

