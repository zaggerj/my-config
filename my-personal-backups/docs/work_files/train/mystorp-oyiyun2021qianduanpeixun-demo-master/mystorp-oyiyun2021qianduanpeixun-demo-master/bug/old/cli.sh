#!/usr/local/bin/bash
DIR=`dirname $0`
# ZENTAO_ORIGIN=http://127.0.0.1:4609
ZENTAO_ORIGIN=http://172.16.203.12/zentao
ZENTAO_URL=
ZENTAO_SESSION_ARGS=
ZENTAO_HAS_SESSION=
__ZENTAO_RESPONSE=
declare -a CURL_ARGS

function __zentao_print_dynmic(){
    echo -n $__ZENTAO_RESPONSE|jq '.data|fromjson|.users as $users|.dateGroups|to_entries|map(.value)|add|map([.originalDate, if $users then $users[.actor] else .actor end, .objectLabel, .objectID, .actionLabel, .objectName]|join(" "))'
}

function __zentao_print_bugs(){
    echo -n $__ZENTAO_RESPONSE|jq --arg projects $ZENTAO_PROJECT '.data|fromjson|.bugs|map(select(.project == $projects))|map([.assignedDate, "#" + .id, .title]|join(" "))'
}

function __zentao_print_task(){
    echo -n $__ZENTAO_RESPONSE|jq --arg projects $ZENTAO_PROJECT '.data|fromjson|.tasks|map(select($projects == .project and (.status != "done" or .needConfirm)))|map([.projectName, "#" + .id, .deadline, .name]|join(" "))'
}

function __zentao_curl_push_args() {
    CURL_ARGS=("${CURL_ARGS[@]}" "$@")
}

function __zentao_request() {
    # __zentao_curl_push_args -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.81'
    local url=
    if [[ $1 == *"?"* ]]; then
        url="$ZENTAO_ORIGIN/$1&$ZENTAO_SESSION_ARGS"
    elif [ -z $ZENTAO_SESSION_ARGS ]; then
        url="$ZENTAO_ORIGIN/$1.json"
    else
        url="$ZENTAO_ORIGIN/$1.json?$ZENTAO_SESSION_ARGS"
    fi
    if [ "raw" = "$2" ]; then
        curl -o- -b $DIR/cookies -c $DIR/cookies -s "${CURL_ARGS[@]}" $url
    else
        curl -o- -b $DIR/cookies -c $DIR/cookies -s "${CURL_ARGS[@]}" $url | jq --arg url $1 -r 'include "./zentao"; main'
    fi
}

function __zentao_session_create() {
    __zentao_curl_push_args -G
    ZENTAO_SESSION_ARGS=$(__zentao_request "api-getSessionID")
    # echo $ZENTAO_SESSION_ARGS
    # ZENTAO_SESSION_RAND=`echo -n $__ZENTAO_RESPONSE|jq -r '.data|fromjson|.rand'`
}

function __zentao_check_session() {
    ZENTAO_HAS_SESSION=$(__zentao_request "my-profile.json?onlybody=yes")
    echo $ZENTAO_HAS_SESSION
}

function __zentao_login(){
    # set -x
    # local passwd=$ZENTAO_PASSWORD
    # case `uname -s` in
    #     Darwin) passwd=$(echo `echo $ZENTAO_PASSWORD|md5`$ZENTAO_SESSION_RAND|md5) ;;
    #     Linux) passwd=$(echo `echo $ZENTAO_PASSWORD|md5sum`$ZENTAO_SESSION_RAND|md5sum) ;;
    # esac
    # local poststr="account=$ZENTAO_USER&password=$passwd&verifyRand=$ZENTAO_SESSION_RAND"
    # set +x
    # __zentao_curl_push_args --data-urlencode $poststr
    __zentao_curl_push_args -G
    ZENTAO_HAS_SESSION=$(__zentao_request "user-login-L3plbnRhby8=.json?get&account=$ZENTAO_USER&password=$ZENTAO_PASSWORD")
}

function __zentao_overview(){
    # 我的动态
    ZENTAO_URL="my-dynamic.json"
    __zentao_request
    __zentao_print_dynmic
}

function __zentao_my() {
    # 我的地盘- Bug 列表
    ZENTAO_URL="my-bug-assignedTo-id_desc-0-2000-1.json"
    __zentao_request
    echo "我的 bug："
    __zentao_print_bugs
    # 我的地盘-任务列表
    ZENTAO_URL="my-task-assignedTo-id_desc-0-2000-1.json"
    __zentao_request
    echo "我的任务："
    __zentao_print_task
}

function __zentao_project() {
    ZENTAO_URL="my-project.json"
    __zentao_request
    local isid=
    local isname=
    case $1 in
        mark)
            isid=$(echo $__ZENTAO_RESPONSE|jq -r --arg id $2 '.data|fromjson|.projects|map(select(.id == $id))|.[0].id')
            if [ -z $isid ]; then
                echo "can not find project: '$2'"
            else
                ZENTAO_PROJECT=$isid
                __write_config
            fi
            ;;
        unmark)
            ;;
        search)
            echo $__ZENTAO_RESPONSE|jq --arg pattern $2 '.data|fromjson|.projects|to_entries|map(select(.value|ascii_downcase|contains($pattern|ascii_downcase)))|from_entries'
            ;;
        list)
            # echo $__ZENTAO_RESPONSE|jq -r '.data|fromjson|.projects|map({status})'
            echo $__ZENTAO_RESPONSE|jq -r '.data|fromjson|.projects|map(select(.status != "closed"))|map(.id + " " + .name)|join("\n")'
            ;;
        bug)
            ZENTAO_URL="project-bug-$ZENTAO_PROJECT-status,id_desc-0--0-0-2000-1.json"
            __zentao_request
            echo $__ZENTAO_RESPONSE > project-bug.json
            echo $__ZENTAO_RESPONSE|jq -r 'include "./zentao"; bugs'
            # TODO: 增加 bug 汇总信息：总数，影响考核数
            ;;
        *)
            echo "supported subcommand: "
            echo "  $0 project list                list all projects"
            echo "  $0 project search keyword      search projects by keyword"
            echo "  $0 project mark projectid      mark project, this will affect bug and task operations"
            echo "  $0 project unmark projectid    unmark project"
            ;;
    esac
}

function __zentao_company() {
    ZENTAO_URL="company-dynamic.json"
    __zentao_request
    echo "研发动态："
    __zentao_print_dynmic
}

function __zentao_bug(){
    ZENTAO_URL="bug-view-$1.json"
    __zentao_request
    # echo -n $__ZENTAO_RESPONSE|jq  'include "./zentao"; .|resp(.actions)'
    echo -n $__ZENTAO_RESPONSE|jq -r 'include "./zentao"; .|showbug'
    # echo -n $__ZENTAO_RESPONSE|jq -r '.data|fromjson|.users as $users|.title as $title|.bug.steps as $steps|.actions|to_entries|map(.value)|map([.date, $users[.actor], .action, if .extra then $users[.extra] else empty end, if .comment then ":" + .comment else empty end]|join(" "))|[$title, $steps] + .|join("\n")|gsub("<[^>]+>"; "")|gsub("&lt;"; "<")|gsub("&gt;"; ">")|gsub("&nbsp;"; " ")|gsub("\t"; "    ")|gsub("(\r?\n\t* *){2,}"; "\r\n")'
}

function __zentao_doctor(){
    echo "TODO"
}

function __read_config(){
    if [ -r $DIR/config.json ]; then
        eval $(jq -r 'to_entries|map("export " + ("zentao_" + .key|ascii_upcase) + "=" + .value)|join("\n")' $DIR/config.json)
    fi
    if [ -z $ZENTAO_USER ]; then
        read -p "zentao user: " ZENTAO_USER
        WRITE_ZENTAO_CONFIG=1
    fi
    if [ -z $ZENTAO_PASSWORD ]; then
        read -s -p "zentao password: " ZENTAO_PASSWORD
        WRITE_ZENTAO_CONFIG=1
    fi
}

function __write_config(){
    cat <<EOF > $DIR/config.json
{
    "user": "$ZENTAO_USER",
    "password": "$ZENTAO_PASSWORD",
    "product": "$ZENTAO_PRODUCT",
    "project": "$ZENTAO_PROJECT"
}
EOF
    WRITE_ZENTAO_CONFIG=
}

function __check_project() {
    if [ -z $ZENTAO_PROJECT ]; then
        __zentao_project list
        read -p "input project you are interested: " ZENTAO_PROJECT
        __write_config
    fi
}

# product
#   product-all         产品列表
#   product-browse-$id  产品 $id 的需求列表
#   product-dynamic-$id  产品 $id 的动态列表
#   productplan-browse-$id   产品 $id 的计划列表
#   productplan-view-$id     产品计划 $id 的需求列表
#   product-project-all-$id   产品 $id 的迭代列表
# project
#   project-story-$id   迭代 $id 的需求列表
#   project-bug-$id    迭代 $id 的bug 列表
#   project-task-$id   迭代 $id 的任务列表
#   project-dynamic-$id   迭代 $id 的动态列表
# my
#   my-task   我的任务列表
#   my-bug        我的bug列表
#   my-story       我的需求列表
#   my-project     我的迭代列表
#   my-dynamic     我的动态列表
# company
#   company-browse   公司用户列表
#   company-group     公司权限列表
#   company-dynamic    公司动态列表

function __zentao_usage() {
    echo "usage: $0 <command> [<sub_command>]"
    echo "avaiable commands:"
    echo "  $0 task"
    echo "  $0 bug"
    echo "  $0 story"
    echo "  $0 project"
    echo "  $0 dynamic"
    echo "  $0 product list"
    echo "  $0 product browse"
    echo "  $0 product dynamic"
    echo "  $0 product projects"
    echo "  $0 product plans"
    echo "  $0 product plan-story"
    echo "  $0 project story"
    echo "  $0 project bug"
    echo "  $0 project task"
    echo "  $0 project dynamic"
    echo "  $0 company browse"
    echo "  $0 company group"
    echo "  $0 company dynamic"
}

# /zentao/story-view-6328.html  .version 表示变更了几次
# /zentao/story-view-6328-3.html    第三次变更的版本
function __zentao_main() {
    local url=
    local need_product=0
    local need_project=0
    case $1 in
        project)
            case $2 in
                story)
                    # /zentao/project-story-461-order_desc-byModule-0-3-{recPerPage}-{page}.html
                    need_project=1
                    url="project-story-$ZENTAO_PROJECT"
                    ;;
                bug)
                    # /zentao/project-bug-461-status,id_desc-0--0-107-{recPerPage}-{page}.html
                    need_project=1
                    url="project-bug-$ZENTAO_PROJECT"
                    ;;
                task)
                    # /zentao/project-task-461-unclosed-0--81-{recPerPage}-{page}.html
                    need_project=1
                    url="project-task-$ZENTAO_PROJECT"
                    ;;
                dynamic)
                    # 今天
                    # 昨天 /zentao/project-dynamic-461-yesterday.html
                    # 本周 /zentao/project-dynamic-461-thisweek.html
                    # 上周 http://172.16.203.12/zentao/project-dynamic-461-lastweek.html
                    # 本月 /zentao/project-dynamic-461-thismonth.html
                    # 上月 /zentao/project-dynamic-461-lastmonth.html
                    # /zentao/product-dynamic-12-account-zhangyao.html
                    # /zentao/product-dynamic-12-account-zhangyao-560-1607875200-next.html
                    # "pager": {
                    #   "recTotal": 560,
                    #   "recPerPage": 50,
                    #   "pageCookie": "pagerProductDynamic",
                    #   "pageTotal": 12,
                    #   "pageID": 1,
                    #   "moduleName": "product",
                    #   "methodName": "dynamic",
                    #   "params": null
                    # }
                    # /zentao/product-dynamic-12-account-caozhen-353-1586102400-next.html
                    # /zentao/product-dynamic-12-account-caozhen-{totalDynamics}-{second}-next.html
                    need_project=1
                    url="project-dynamic-$ZENTAO_PROJECT"
                    ;;
                *)
                    url="my-project"
                    ;;
            esac
            ;;
        product)
            case $2 in
                list)
                    # /zentao/product-all-0-0-noclosed-order_desc-16-20-1.html
                    url="product-all"
                    ;;
                browse)
                    # /zentao/product-browse-12--unclosed-0--672-{recPerPage}-{page}.html
                    need_product=1
                    url="product-browse-$ZENTAO_PRODUCT"
                    ;;
                dynamic)
                    # /zentao/product-dynamic-12-yesterday.html
                    # /zentao/product-dynamic-12-today.html
                    need_product=1
                    url="product-dynamic-$ZENTAO_PRODUCT"
                    ;;
                projects)
                    # /zentao/product-project-all-12.html
                    need_product=1
                    url="product-project-all-$ZENTAO_PRODUCT"
                    ;;
                plans)
                    # /zentao/productplan-browse-12-0-all-begin_desc-15-25-1.html
                    # 未过期 /zentao/productplan-browse-12-0-unexpired.html
                    # 已过期 /zentao/productplan-browse-12-0-overdue.html
                    # /zentao/productplan-browse-12-0-overdue-begin_desc-7-35-1.html
                    need_product=1
                    url="productplan-browse-$ZENTAO_PRODUCT"
                    ;;
                plan-story)
                    # /zentao/productplan-view-161.html
                    need_product=1
                    url="productplan-view-$ZENTAO_PRODUCT"
                    ;;
            esac
            ;;
        company)
            case $2 in
                browse)
                    # /zentao/company-browse-0-bydept-id-79-50-1.html
                    url="company-browse"
                    ;;
                group)
                    url="company-group"
                    ;;
                dynamic)
                    url="company-dynamic"
                    ;;
            esac
            ;;
        task*)
            # /zentao/my-task-assignedTo-id_desc-207-35-1.html
            need_project=1
            url="my-task"
            ;;
        bug*)
            # /zentao/my-bug-assignedTo-id_desc-1-25-1.html
            need_project=1
            url="my-bug"
            ;;
        story*)
            # /zentao/my-story-assignedTo-id_desc-30-25-1.html
            need_project=1
            url="my-story"
            ;;
        project*)
            url="my-project"
            ;;
        dynamic*)
            url="my-dynamic"
            ;;
    esac
    if [ -z $url ]; then
        __zentao_usage
        exit 1
    else
        if [ 1 -eq $need_product ]; then
            __zentao_check_product
        fi
        if [ 1 -eq $need_project ]; then
            if [ -z $ZENTAO_PRODUCT ]; then
                __zentao_check_product
            fi
            __zentao_check_project
        fi
        __zentao_request $url
        __write_config
    fi
}

function __zentao_check_product(){
    if [ -z $ZENTAO_PRODUCT ]; then
        __zentao_request "product-all"
        read -p "please select your product: " ZENTAO_PRODUCT
    fi
}

function __zentao_check_project(){
    if [ -z $ZENTAO_PROJECT ]; then
        __zentao_request "product-project-all-$ZENTAO_PRODUCT"
        read -p "please select your project: " ZENTAO_PROJECT
    fi
}

__read_config
__zentao_session_create
__zentao_check_session
if [ "1" = "$ZENTAO_HAS_SESSION" ]; then
    if [ "1" = "$WRITE_ZENTAO_CONFIG" ]; then
        __write_config
    fi
else
    __zentao_login
fi
if [ ! "1" = "$ZENTAO_HAS_SESSION" ]; then
    exit 1;
fi
__zentao_main $1 $2 $3 $4