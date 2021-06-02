alias c='clear'
alias cls="clear"
# cowsay fortune fortune | cowsay -f duck 
alias cs='cowsay'
alias cdiff='colordiff'

alias ipy='ipython'
alias kc='kdeconnect-cli'
# old ls config
alias l="ls -la"
alias ll="ls -la --color=auto"
alias la="ls -a --color=auto"
if [ -x /usr/bin/dircolors  ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls="sudo ls --color=auto"
fi
alias lsa="sudo ls -la --color=auto"
alias l='ls -la'
# new awesome lsd
# cargo install lsd  be sure to add `/root/.cargo/bin` to your PATH to be able to run the installed binaries https://github.com/Peltoche/lsd
alias ls='lsd'
alias l='ls -l'
alias la='ls -a'
alias lla='ls -la'
alias lt='ls --tree'
alias lg='lazygit'
# alias cat='bat'
# unsetproxy pip install pysocks clone 
alias ms='mailsync'
alias we='weechat'
alias mt='neomutt'
alias r='echo $RANGER_LEVEL'
alias pu='python3 -m pudb'
alias ra='ranger'
# ra() {
	#if [ -z "$RANGER_LEVEL" ]
	#then
		#ranger
	#else
		#exit
	#fi
#}
# apt-get install neofetch
alias s='neofetch'
# apt-get install cargo git clone https://github.com/o2sh/onefetch cd onefetch make install onefetch /path/of/your/repo
alias g='onefetch'
alias sra='sudo -E ranger'
alias sudo='sudo -E'
alias vim='nvim'
alias reload='source ~/.zshrc'

# npm install git-yolo -g https://github.com/nerdsupremacist/git-yolo
alias gy='git-yolo'
#  apt-get install newsboat https://github.com/newsboat/newsboat
alias nb='newsboat -r'
alias nt="sh -c 'cd $(pwd); st' > /dev/null 2>&1 &"
alias ta='tmux a'
alias t='tmux'
# https://www.jianshu.com/p/a3aa6b01b2e1
alias lo='lsof -p $(fps) +w'



# action
alias rm="rm -i"
alias grep="grep --color=auto"
alias vi="vim"
alias nvi="nvim"
alias diff="vimdiff"
alias nw="/Applications/nwjs.app/Contents/MacOS/nwjs"
alias ra="ranger"
alias hs="http-server"
alias cdiff="colordiff"

# git alias
alias gg="git clone"
alias gs="git status"
alias gd="git diff"
alias gpl="git pull --rebase"
alias glg="git log --stat"
alias gpu="git push"
alias gau="git add -u"
alias gc='git config credential.helper store'
alias gg='git clone'
alias gsp='git submodule foreach git pull'
alias pgpl='proxychains git pull'
alias pgpu='proxychains git push'

# npm and yarn
alias ns="npm start"
alias ys="yarn run serve"

# proxy
# default socks5 
alias setproxy="export ALL_PROXY=socks5://127.0.0.1:10808"
# company socks5 ssh tunnel
alias setproxy1="export ALL_PROXY=socks5://59.175.233.194:8181"
# reset proxy
alias unsetproxy="unset ALL_PROXY"

alias cip="curl -i http://ip.cn"

alias gw="cd /mnt/d/work"

# alias show-last-tag=git describe --tags `git rev-list --tags --max-count=1` #这个代码一直报错  因为读取到这里时，代码会首先执行rev-list --tags --max-count=1
alias chng="git remote set-url origin $NG_OUTER_GIT_URL"
alias chng1="git remote set-url origin $NG_GIT_URL"
alias chre="git remote set-url origin $NG_RE_OUTER_GIT_URL"
alias chre1="git remote set-url origin $NG_RE_GIT_URL"
alias chnv="git remote set-url origin $NC_OUTER_GIT_URL"
alias chnv1="git remote set-url origin $NC_GIT_URL"

alias g188="ssh root@172.16.201.188"

# walk work dir
alias gh="cd $WORK_HOME"
alias gng="cd $WORK_HOME/ngconsole"
alias gnr="cd $WORK_HOME/ngconsole_resources"
alias gnf="cd $WORK_HOME/region-front"
alias gnc="cd $WORK_HOME/oefe-docs"
alias gnv="cd $WORK_HOME/new-vdi-client"
alias gnl="cd $WORK_HOME/vdi-client-release"

# walk XDG config dir
alias gfn="cd $XDG_NVIM_HOME"
alias gfr="cd $XDG_RANGER_HOME"
alias gfz="cd $XDG_ZSH_HOME"
alias gfl="cd $XDG_LAZYGIT_CONFIG_HOME"

alias gi="cd $XDG_HOME/Github"
alias gnd="cd $XDG_HOME/Desktop"    
alias gD="cd $XDG_HOME/Downloads"
alias gff="cd $XDG_HOME/.config"

alias lg="lazygit"
alias vpc="gng;git checkout 5.3.0-vpc-feature;gnr;git checkout 5.3.0-vpc;gng;"
alias vdi="gng;git checkout 5.3.0-bug;gnr;git checkout 5.3.0;gng;"
alias client="vpc;gnl;git checkout 5.3.0-uos;gnv;git checkout 5.3.0-uos;"
# TODO:bash脚本 方法 获取url，设置url为远程或者局域网
# function set_branch_url {
#     array=("ngconsole" "ngconsole_resources" "new-vdi-client" "vdi-client-release")
#     for i in ${array[@]}
#     do  
#         echo $i;
#         echo git remote set-url origin 
#     done
# }
# set_branch_url
