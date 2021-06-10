这个页面记录一些不得不做的事情：
# ngconsole

## css
1. 去掉无用的样式表、link 元素等
2. 将your_style.css 中非公用样式移动到合适的位置
3. 将总体样式合理拆分，并最终打包为 vendor.min.css 和 vdi.min.css
4. 支持 css modules

## js
1. 统一入口函数为独立模块（js/vdi/bootstrap.js, js/vdi/config/http.js），新增初始化加载器，优先发送4个请求，根据请求结果动态加载页面脚本，可联合第5条
2. 所有js代码中：templateUrl 转 template
3. 在 webpack.config.js 里面增加现有页面的 html 入口配置（使用 html-webpack-plugin），使得最终需要的页面被自动生成到 built 目录，并去掉devServer中相关页面路由函数
4. 开发集成按钮组，搜索框，分页框/条的大而全表格指令，可以方便替代现有表格页面，并使得代码量大幅降低
5. 统一管理台多页面为一个页面：1. 使用缓存确定实际页面类型；2. 根据类型动态加载代码
6. 使用 standardjs 规范自己的代码
7. 使用 husky 增加 pre-commit 

# ngconsole_resources
在语言包链的基础上，重构为基于行的以=分割的文本文件，而不是 json, 降低 json 文件合并冲突，降低添加翻译的语法错误
