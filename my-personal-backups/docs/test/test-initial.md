[TOC]

### 一、如何初始化

1. 通过【公共模板】选择 **"uos-x86-初始化自测"** 或 **"uos-arm-初始化自测"** 模板进入

 > 用户名均为：**uos**
 > 密码均为：**Uos123$%^**

 <a href="#四、启动异常处理" level="3">💡 **启动异常处理**</a> ——（见最后章）<small>...没有锚点竟然</small>

1. 配置网络

 ```py
 ip 地址: 172.16.x.x  （注意不要和已有 ip 冲突）
 子网掩码：255.255.0.0
 网关：172.16.0.250
 ```

1. 上传安装包

+ **x86** 安装包 路径：`172.16.201.91:/home/uos/vpc-x.x-…….bin`（uos / Uos123$%^）
+ **arm** 安装包 路径：`172.16.200.47:/root/vpc-x.x-…….bin`（root / 111111）

 > 应通过 `ls -lt` 获取最新的安装包

+ scp 拷贝文件：

  ```
  # 在本地服务器获取远程服务器文件
  scp root@172.16.201.91:/home/uos/vpc-x.x-…….bin  /home/uos

  # 在远程服务器传送文件到本地服务器
  scp /home/uos/vpc-x.x-…….bin uos@172.16.x.x:/home/uos
  ```

1. 安装 bin 包

 ```
 su root
 chmod 775 vpc-x.x-…….bin && ./vpc-x.x-…….bin
 ```

1. 重启该模板并按上述方法配置网络

<br>

### 二、如何验证初始化正确

+ 重启后应显示以下页面：

 <center><img src="http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/12466389202feed7b2e57bcfeaec09ee" width=760></center>

<br>

+ 在浏览器中输入你已经配好的 ip 地址，进入如下页面，并能正确

 <center><img src="http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/21503b7d1ced55d3a5365ad4bd553c5d" width=760></center>

<br>

### 三、如何重置模板

&emsp;&emsp;选中你要重置的公共模板，鼠标移至右下角 `…` 区域，打开扩展列表，选择重置模板（请在模板关机下进行）

<center><img src="http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/d442b7c877796059b6876cd408ae5e5a" width=460></center>

<br>

### 四、启动异常处理

+ 开机遇到如下情形：

 <center><img src="http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/b3dc76e03f5eb408b4427b3ec6f5b52f" width=800></center>

+ 按图示方法解决：

 <center><img src="http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/77bf41605b09f47476af583cb2e65e09" width=800></center>

<br>

<center>- 完 -</center>
