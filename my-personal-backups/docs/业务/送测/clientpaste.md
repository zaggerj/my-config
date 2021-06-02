# 文件剪贴板：
1. 文件剪贴板功能不生效
   a. 只有麒麟的端和麒麟的桌面有文件剪贴板功能
   b. 在端和桌面分别用以下命令查看剪贴板进程是否正常运行
      `ps -ef | grep clip`
	  
	  正常情况下应该有3个进程：
	  clip_monitor.sh
	  clip_set.sh
	  clip_click_monitor.sh

   c. 共享目录是否挂在成功
      在端的/var/opt/clipboard目录下随便创建一个文件，切换到桌面的/var/opt/clipboard目录，如果没看到刚才在端创建的文件，则说明共享挂在不成功。
   