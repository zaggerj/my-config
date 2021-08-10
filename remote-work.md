# 远程办公相关配置

## 资源访问
**代码仓库**
方法1：
在自己的本地全局git配置或者项目git配置中添加下列配置项，
linux环境对应配置位置为~/.gitconfig 
(linux环境命令：`git config --global http.http://172.16.203.254.proxy socks5://59.175.233.194:8181`)
window对应地址可以通过[小乌龟](https://tortoisegit.org/ "小乌龟")软件上面的设置打开
配置内容：
```
[http "http://172.16.203.254"]
	proxy = socks5://59.175.233.194:8181
```
方法2：
示例：http://172.16.203.254/hanxiaoxiang/console.git 替换为 http://bbt.os-easy.com/hanxiaoxiang/console.git 进行代码的拉取和更新

**禅道、开发环境**
1. 安装代理插件
浏览器安装 SwitchyOmega 插件，添加 59.175.233.194 8181 为 socks5 代理，添加对应的规则即可访问公司内网的 web 环境
插件下载地址：浏览器的应用商店页面或者 https://github.com/FelisCatus/SwitchyOmega/releases
附插件配置相关：
2. 新增一个情景模式：
![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/defdf860b65d01207344cd9ee711b863)
再新增一个类型为自动切换的情景模式，配置一下条件（这里以公司的172.16网段为例子，如果需要访问内网其他网段的则对应添加即可，例如showdoc的192.168.0.*）
![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/81f17758e09b8f17a8ff7a9978c51392)
3. 在浏览器插件菜单选择上面新增的自动切换模式
