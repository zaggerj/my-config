## 日志路径
> backup_web: /opt/vbackup/backup_web/vbackup.log  /opt/vbackup/vbackup.log

> backup_webmiddle: /var/log/vbackup/web/webmiddle.log

> vbackup_server: /var/log/vbackup/server.log /var/log/vbackup/vbackup.log /var/log/vbackup/storage.log

> vbackup_agent: /var/log/vbackup/agent.log /var/log/vbackup/vbackup.log /var/log/vbackup/storage.log


```bash
tail -f /var/log/vbackup/web/webmiddle.log /var/log/vbackup/*.log /opt/vbackup/vbackup.log /opt/vbackup/backup_web/vbackup.log

tail -f /var/log/vbackup/web/webmiddle.log /var/log/vbackup/*.log /opt/vbackup/vbackup.log /opt/vbackup/backup_web/vbackup.log | grep -E '(do_restore)|(do_convert)|(RestoreTaskManager)|(qemu-img)|(SnapshotManager)|(ERROR)|(Error)|(do_backup)'
```

## 服务
server 端：
```bash
systemctl status mysql supervisord.service nfs-server vbackup_server
ps -elf | grep connection.py | grep -v grep
ps -elf | grep vbackup | grep "manage.py server" | grep -v grep
```

server 端注意检查 /etc/hosts 文件里是否配置了 backup-ip：
```
本机IP  backup-ip
```

如果没有配，可以运行以下命令来配置：
```bash
/bin/update_backup_ip.sh  server端本机IP
```


agent 端：
```bash
systemctl status vbackup_agent
ps -elf | grep agent.py | grep -v grep
```

## 端口
server 端
```
28443
28000
8001
```

agent 端
```
8089
```

防火墙需要放开这些端口
```bash
firewall-cmd --add-port 8089/tcp --zone=public --permanent
firewall-cmd --reload
```

## 代码路径
**server 端**

`backup_web` 和 `backup_webmiddle` 是由 supervisord 管理服务，代码路径：
```
/opt/vbackup/backup_web
```

所用的python虚拟环境路径是：
```
/opt/.virtualenvs/vbackup-web/
```

`vbackup_server` 服务的代码就在系统路径下：
```
/usr/lib/python2.7/site-packages/vbackupserver/
/usr/lib/python2.7/site-packages/vbackupcommon/
/usr/lib/python2.7/site-packages/vbackupstorage/
```

**agent 端**

`vbackup_agent` 服务的代码在虚拟环境中：
```
/opt/.virtualenvs/vbackup-agent/lib/python2.7/site-packages/vbackupagent
/opt/.virtualenvs/vbackup-agent/lib/python2.7/site-packages/vbackupcommon
/opt/.virtualenvs/vbackup-agent/lib/python2.7/site-packages/vbackupstorage
```
