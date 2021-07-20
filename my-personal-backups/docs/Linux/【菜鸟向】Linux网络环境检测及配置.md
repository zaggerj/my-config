# Linux 网络配置

网络配置是一个操作系统能与外交沟通、交流的前提。在有些情况下，我们需要临时让一个网络端口拥有一个地址，有时我们需要通过永久的配置文件让网卡记住一个地址。
   
本文将阐述Ubuntu Server、 CentOS7、RH等发行版中要实现这一目的的不同实现方法。

-----

## 通用


#### 0. 无鼠标打开终端快捷键（适用于UOS、Ubuntu GUI版）
```
[Mac] Command + Option + t
[Windows/Linux] Ctrl + Alt + t
```


#### 1. 物理网卡查询
```shell
# 查询系统的所有PCI外设硬件，并通过grep列出所有的以太网接口硬件
lspci -vv | grep Ethrenet 
# 查询系统的所有硬件，使用-class参数指定要查询的网络部分硬件。
lshw -class network 
```

####2. 物理网卡映射逻辑名·规则
```shell
/etc/udev/rules.d/
```


#### 3. 查询网络接口信息
```shell
# 在linux中的网络查看命令中通常有很多是不想看到的，需要通过某种方式过滤
ip a | egrep '^[0-9]: | inet'

```


#### 3. 网卡的启用与禁用
```shell
# 启用/禁用指定名字的网卡
ip link set [Ethernet Interface Name] up/down # ip工具箱
ifconfig [Ethernet Interface Name] up/down # ifconfig工具箱
```



#### 3.ip地址及子网掩码设置

- 给对应接口添加一项地址


```shell
# 使用ip工具箱配置
ip addr add [Address like 0.0.0.0/24] dev [Ethernet Interface Name]
# 使用ifconfig工具箱配置
ifconfig [Ethernet Interface Name] [Address like 0.0.0.0/24]
```

#### 4.域名解析设置
- 立即生效但无法永久保存
```shell
nameserver_ip="[nameserver ip address]"
cat "nameserver $nameserver_ip" >> /etc/resolv.conf
```

- 永久生效-使用Network Manager
  
使用本方法将告知本地DHCP客户端不论发生任何情况导致DNS服务器被改变，我们始终都有一条或记录可以使用。
```shell

dhcp_cnf='/etc/dhcp/dhclient.conf'

if [ -e $dhcp_cnf ]; then
    # 永久保存需要修改一个配置文件
  nameserver_ip="[nameserver ip address]"
  cat "prepend domain-name-servers $nameserver_ip" >> &dhcp_cnf
fi
  
```


####5.网关设置
```shell
ip route add default via [ip address]
```

<br><br>
----

#### 10.0 示例脚本
```shell
ETHNAME="ens33"
IPADDR="172.16.57.65/16"
ROUTE="172.16.0.250"

ENSSTATUS=$(ip a | grep $ETHNAME | grep DOWN)

if [ -n "$ENSSTATUS" ]; then
        echo "The $ETHNAME has been shutdown... Turning UP."
        ip link set $ETHNAME up
        ip addr add $IPADDR  dev $ETHNAME
        ip route add default via $ROUTE

fi
echo -e "nameserver 202.103.24.68\nnameserer 114.114.114.114" > /etc/resolv.conf

```

----
未完
