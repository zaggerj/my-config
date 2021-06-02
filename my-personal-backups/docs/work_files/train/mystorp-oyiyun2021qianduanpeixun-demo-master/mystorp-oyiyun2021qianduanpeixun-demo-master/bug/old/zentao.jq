# ansi escape codes:
# Colors:
#   Black: \u001b[30m
#   Red: \u001b[31m
#   Green: \u001b[32m
#   Yellow: \u001b[33m
#   Blue: \u001b[34m
#   Magenta: \u001b[35m
#   Cyan: \u001b[36m
#   White: \u001b[37m
#   Reset: \u001b[0m
# Background Colors:
#   Background Black: \u001b[40m
#   Background Red: \u001b[41m
#   Background Green: \u001b[42m
#   Background Yellow: \u001b[43m
#   Background Blue: \u001b[44m
#   Background Magenta: \u001b[45m
#   Background Cyan: \u001b[46m
#   Background White: \u001b[47m
# Decorations: 
#   Bold: \u001b[1m
#   Underline: \u001b[4m
#   Reversed: \u001b[7m
# Cursor Navigation
#   Up: \u001b[{n}A
#   Down: \u001b[{n}B
#   Right: \u001b[{n}C
#   Left: \u001b[{n}D
def colorred(string; flag): if flag then "\u001b[37m\u001b[41m" + string + "\u001b[0m" else string end;
def colorTitle(string; flag): if flag then "\u001b[32m\u001b[4m" + string + "\u001b[0m" else string end;
def colorSteps(string; flag): if flag then "\u001b[36m" + string + "\u001b[0m" else string end;
def colorComment(string; flag): if flag then "\u001b[35m" + string + "\u001b[0m" else string end;
def resp(f): if .status == "success" then .data|fromjson|f else .reason | error end;
# 忽略用户登录、退出的动态消息
def dynamic: resp(.users as $users
    | .dateGroups
    | to_entries
    | map(.value)
    | add[]
    | select(.objectType != "user")
    | .originalDate + " " + ($users[.actor] // .actor) + " " + .actionLabel + " " + .objectLabel + "(" + .objectID + ") " + .objectName);

def tasks: resp(.tasks[] | select(.status != "done") | colorred("#" + .id + " " + .projectName + " " + .name + " " + .deadline; .needConfirm));

def env(f): resp(f|to_entries|map(("zentao_" + .key|ascii_upcase) + "=" + .value)|join("\n"));

def html2text: . | gsub("<[^>]+>"; "")
    | gsub("&lt;"; "<") | gsub("&gt;"; ">") | gsub("&nbsp;"; " ") | gsub("&amp;"; "&")
    | gsub("\t"; "    ")
    | gsub(" +\r?\n"; "\r\n")
    | gsub("(\r?\n){2,}"; "\r\n");

def actionNames: {opened: "创建", edited: "编辑", assigned: "指派给", resolved: "解决为", commented: "备注", activated: "激活"};

def resolvedNames: {fixed: "已解决", bydesign: "设计如此", duplicate: "重复BUG", external: "外部原因", notrepro: "无法复现", willnotfix: "不予解决", postponed: "下个版本解决"};

def showbug: resp(.users as $users
    | .title as $title
    | .bug.steps as $steps
    | .actions | to_entries | map(.value)
    | map(.date + " " + ($users[.actor] // .actor) + " " + actionNames[.action] + (if (.extra | length) > 0 then " " + ($users[.extra] // resolvedNames[.extra] // .extra) else "" end) + (if (.comment | length) > 0 then ": " + colorComment(.comment; true) else "" end))
    | [colorTitle($title; true), colorSteps($steps; true)] + .|join("\n")
    | html2text);

def bughours: (now - (.assignedDate|strptime("%Y-%m-%d %H:%M:%S")|mktime)) / 3600 + 8 | if . < 0 then 0 else . | floor end;

def bug2text(users): bughours as $hours|colorred(.assignedDate + " #" + .id + " " + (users[.assignedTo] // .assignedTo) + " " + ($hours | tostring) + " " + .title; $hours > 36);

def bugs: resp(.users as $users|.bugs[]|select((.resolution|length) == 0)|bug2text($users));

def stories: resp(.users as $users|.stories[]|select(.status == "active")|"#" + .id + " " + ($users[.openedBy]//.openedBy) + " => " + ($users[.assignedTo]//.assignedTo) + "\t" + .title);

def projects: resp(.projects|map(select(.status != "closed"))[]|.id + " " + .name);

def main:
    if $url == "product-all" then
        resp(.productStats[]|"#" + .id + " " + .name + "\t" + .createdBy + " " + .createdDate)
    elif ($url | startswith("user-login")) then
        resp(1)
    elif ($url | startswith("my-task")) then
        tasks
    elif ($url | startswith("my-bug")) then
        bugs
    elif ($url | startswith("my-story")) then
        stories
    elif ($url | startswith("my-project")) then
        projects
    elif ($url | startswith("my-dynamic")) then
        dynamic
    elif $url == "company-browse" then
        "TODO: not implemented"
    elif $url == "company-group" then
        resp((.groups|map({key: .id, value: .name})|from_entries) as $groups|.groupUsers|to_entries[]|$groups[.key] + ": " + (.value|to_entries|map(.value)|join(", ")))
    elif $url == "company-dynamic" then
        dynamic
    elif $url == "api-getSessionID" then
        resp(.sessionName + "=" + .sessionID)
    elif ($url | startswith("my-profile")) then
        resp(1)
    elif ($url | startswith("product-browse-")) then
        stories
    elif ($url | startswith("product-dynamic-")) then
        dynamic
    elif ($url | startswith("productplan-browse-")) then
        resp(.plans[]|"#" + .id + " " + .title + "\t" + .begin + "~" + .end)
    elif ($url | startswith("productplan-view-")) then
        # TODO: 复用 stories 处理单条 story 的部分
        resp(.planStories|to_entries[]|.value|"#" + .id + " " + .title)
    elif ($url | startswith("product-project-all-")) then 
        resp(.projectStats[]|select(.status != "closed")|"#" + .id + " " + .name + "\t" + .openedBy + " " + .openedDate|html2text)
    elif ($url | startswith("project-story-")) then
        stories
    elif ($url | startswith("project-bug-")) then
        bugs
    elif ($url | startswith("project-task-")) then
        tasks
    elif ($url | startswith("project-dynamic-")) then
        dynamic
    else
        "TODO: not implemented"
    end;