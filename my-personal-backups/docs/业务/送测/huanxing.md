### wol唤醒
##### 概述：
- [x]  WOL是一种电源管理功能
- [x]  WOL允许设备通过活动的网络被唤醒

#####  wol 具体配置
1. wol 基本配置
```sh
 ethtool  eth0  #查看 wake模块是否开启   
 # 注：“Supports Wake-on”与“Wake-on”值为“g”则网络唤醒可用
```
如果不可用  需要开启主板的唤醒哦功能

2.  获取硬件地址
```sh
  ifconfig  # 可确定被唤醒的网卡mac地址 一般对应的eth0的mac
```

3. 配置执行唤醒的服务器 安装wol
```sh
  yum install -y epel-release   #配置源 待选
  yum install -y wol
  wol --help 
```

4. 执行唤醒服务器命令
```sh
wol 00:07:E8:A5:F2:5B
ping  172.16.201.91 
```



###  ipmi唤醒
##### 概述：
- [x] 确保目标服务器的BMC模块对应网卡网上插上网线，且指示灯在闪烁。
- [x] 确保目标服务器BMC网络配置、用户配置正常，ip能被ping通
- [x] 确保主机服务器上有加载ipmltool工具

#####  ipmi 具体配置

1. 查看是否支持ipmi命令

```sh
 ipmitool -h
 lsmod |  grep  ipmi
```

2. 找到所使用的channel
```sh
for i in `seq 1 14`; do ipmitool lan print $i 2>/dev/null | grep -q ^Set && echo Channel $i; done
```

2. 设置用户
```sh
 ipmitool user list 1  # 2.1 查看用户列表
 ipmitool  user  set name 3 {用户名} # 2.2 设置用户  3对应userId
 ipmitool  user  set password 3 {密码} # 2.3 设置用户
  #2.4 设置用户权限  	 channel 为1，user ID为3，privilege为4
 ipmitool channel setaccess 1 3 callin=on ipmi=on link=on privilege=4 
 # 查看权限
 ipmitool channel getaccess 1 3
```


3. 配置网络
   以172.16.201.91 为被唤醒主机为例说明，配置BMC ip 172.16.201.89 （确保此ip没被占用）
```sh
 ipmitool lan set 1 ipaddr   172.16.201.89   # 设置channel 1 的IP地址
 ipmitool lan set 1 netmask 255.255.0.0
 ipmitool lan set 1 defgw ipaddr 172.16.0.250  # Gateway IP  #netstat -rn
 ipmitool lan set 1 access on
 ipmitool lan set 1 ipsrc static #设置channel 1  的ip是静态获得的
 ipmitool lan print 1  # 查看网络配置
 ping  172.16.201.89 # 配置好后一致会是可ping通状态，bmc网卡是独立的网口
```

4. 在主控服务器执行唤醒、关机、查看状态
```sh
 ipmitool -H  {172.16.201.89} -U {ipmitest} -P {oseasy@123} -I lan power status  # 获取当前电源状态
 ipmitool -I lan -U {BMC用户名} -P {BMC密码} -H {BMC IP} power {on/off} # 唤醒/关机
 ping 172.16.201.91
 
 ipmitool -I lan -H 172.16.243.102 -U yansi -P Oseasy@123 power status
 如果是arm服务器 应该用lanplus
```