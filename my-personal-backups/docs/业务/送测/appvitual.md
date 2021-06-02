# 1.管理台
日志路径：
模板开机时
	tail -f -n1000 /etc/thor/log/guest.log

![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/b17aa67ba00d4fb95e3c1662aa0e6d8f)
产看通道数据是否正确

端连接桌面时，查看数据是否正确

	tail -f /var/log/vdi/api.log | grep "cloud_app"
	
# 2.客户端
### 日志：
/opt/apps/appclient/log
→ remoteapp.log 客户端底层日志
→ freerdp.log   freerdp日志
→ resource.log  客户端前端日志

### 可能的问题：
1. 远程应用无法使用本地打印机。
   在桌面找到有USB菜单项的悬浮窗，点击USB菜单查看打印机是否被重定向。如果  是，在管理台设置USB重定向策略，将打印机设为重定向例外。关闭云应用，云引用客户端后重启。
   
2. 客户端开机后一直显示应用准备中超过5分钟以上。
   云应用桌面可能进入恢复模式。在管理台的个人桌面列表找到对应的云应用桌面，使用远程协助功能手动重启虚拟机，选单界面选择正常进入windows。

3. 启动云应用过一段时间报【云应用启动失败】
   可能云应用虚拟机没有正常响应，过一小会再试。
   如果连续几次都不行，查看freerdp日志报错信息分析具体原因。
   

	



