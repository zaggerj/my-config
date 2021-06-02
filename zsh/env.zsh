export XDG_CONFIG_HOME=$HOME/.config
#export LOCALBIN=$XDG_CONFIG_HOME/bin
export PATH=$PATH:$LOCALBIN
export LOCALPROG=$HOME/prog
export GOPATH=$HOME/go
export PATH=$PATH:$HOME/.gem/ruby/2.6.0
export PATH=$PATH:/usr/local/bin
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$HOME/go/bin
export PATH=$PATH:$HOME/.linuxbrew/bin
export PATH=$PATH:$HOME/.linuxbrew/sbin
export PATH=$PATH:$HOME/.local/bin
export PATH=$PATH:/usr/bin/xclip
export PATH=$PATH:/usr/local/Cellar/node/14.2.0/bin
export PATH=$PATH:$HOME/.cargo/bin
export PATH=$PATH:/snap/bin
export PATH=$PATH:/usr/local/opt/node@12/bin
export PATH=$PATH:$LOCALPROG/flutter/bin
export PATH=$PATH:$LOCALPROG/flutter/bin/cache/dart-sdk/bin
export PATH="$PATH":"$HOME/.pub-cache/bin"
export PATH=~/.npm-global/bin:$PATH

#export TERM=xterm-256color
export TERM=xterm-256color
export TERM_ITALICS=true
export RANGER_LOAD_DEFAULT_RC="false"
#export TERM=screen-256color
export EDITOR=nvim
export ZSH_AUTOSUGGEST_USE_ASYNC=1
export ZSH_AUTOSUGGEST_MANUAL_REBIND=1
export FLUTTER_STORAGE_BASE_URL="https://mirrors.bfsu.edu.cn/flutter"
export PUB_HOSTED_URL="https://mirrors.bfsu.edu.cn/dart-pub"

export HTTP_PROXY=127.0.0.1:10808
export HTTPS_PROXY=127.0.0.1:10808


# prefix 定义git仓库前缀
export WORK_OUTER_GIT_HOST=http://bbt.os-easy.com
export WORK_GIT_HOST=git@172.16.203.254

# some pre var 
export NG_OUTER_GIT_URL=$WORK_OUTER_GIT_HOST/hanxiaoxiang/ngconsole.git
export NG_GIT_URL=$WORK_GIT_HOST:hanxiaoxiang/ngconsole.git
export NG_RE_OUTER_GIT_URL=$WORK_OUTER_GIT_HOST/baiyu/ngconsole_resources.git
export NG_RE_GIT_URL=$WORK_GIT_HOST:baiyu/ngconsole_resources.git
export NC_OUTER_GIT_URL=$WORK_OUTER_GIT_HOST/zhangyao/new-vdi-client.git
export NC_GIT_URL=$WORK_GIT_HOST:zhangyao/new-vdi-client.git

# prefix 定义前缀路径

# /mnt/d/work
# ~/code

# windows 10 WSL
export WORK_HOME=/mnt/d/work
export NG_HOME=$WORK_HOME/ngconsole
export NG_RE_HOME=$WORK_HOME/ngconsole_resources

# WSL 配置相关路径

export XDG_WORK_HOME=$HOME/code
export XDG_HOME=$HOME

export XDG_CONFIG_HOME=$HOME/.config
export LOCALBIN=$XDG_CONFIG_HOME/bin
export XDG_NVIM_HOME=$XDG_CONFIG_HOME/nvim
export XDG_RANGER_HOME=$XDG_CONFIG_HOME/ranger
export XDG_ZSH_HOME=$XDG_CONFIG_HOME/zsh
export XDG_LAZYGIT_CONFIG_HOME=$XDG_CONFIG_HOME/jesseduffield/lazygit



export GOROOT=/usr/local/go #GOROOT是系统上安装Go软件包的位置。
export LSDPATH=/root/.cargo/bin
export LOCALPATH=/root/.local/bin
export GOPATH=/home/hadoop/GOPATH #GOPATH是工作目录的位置。
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
export PATH=$LSDPATH:$PATH
export PATH=$LOCALPATH:$PATH
