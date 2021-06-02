interface ISharedActionHistory {
    id: number;
    /**
     * 动作外键值
     */
    action: number;
    field: string;
    old: string;
    new: string;
    diff: string;
}
interface ISharedAction {
    id: number;
    objectType: "bug";
    objectID: number;
    product: string;
    project: number;
    /**
     * 当前 bug 动作的发起人
     */
    actor: string;
    /**
     * 当前 bug 动作
     */
    action: "opened" | "edited" | "assigned" | "resolved" | "commented" | "activated";
    /**
     * 当前 bug 动作发生的时间
     */
    date: string;
    /**
     * 当前 bug 动作的注释
     */
    comment: string;
    /**
     * 当前 bug 动作的额外参数
     * 动作是 opened; commented 时，此字段为空
     * 动作是 assigned 时，此字段表示被指派人
     */
    extra: string;
    read: number;
    efforted: number;
    history: ISharedActionHistory[];
}

interface IActions {
    [key: string]: ISharedAction
}

interface IBug {
    id: number;
    product: number;
    branch: number;
    module: number;
    project: number;
    plan: number;
    story: number;
    storyVersion: number;
    task: number;
    toTask: number;
    toStory: number;
    /**
     * bug 标题
     */
    title: string;
    keywords: string;
    /**
     * 严重程度
     */
    severity: number;
    pri: number;
    /**
     * bug 类型
     */
    type: string;
    os: string;
    browser: string;
    hardware: string;
    found: string;
    /**
     * bug 复现步骤
     */
    steps: string;
    /**
     * bug 状态
     */
    status: "active" | "resolved" | "closed";
    color: string;
    /**
     * bug 是否确认的标志
     */
    confirmed: number;
    /**
     * bug 激活次数，默认 0
     */
    activatedCount: number;
    /**
     * bug 最近一次被激活的时间
     */
    activatedDate: string;
    mailto: string;
    /**
     * bug 创建者，一般是测试人员
     */
    openedBy: string;
    /**
     * bug 创建时间
     */
    openedDate: string;
    /**
     * bug 创建时版本号
     */
    openedBuild: number;
    /**
     * 当前指派给，可能是测试人员，研发人员，产品经理等
     */
    assignedTo: string;
    /**
     * bug 最近一次被指派的时间
     */
    assignedDate: string;
    deadline: string;
    /**
     * bug 解决者，一般是研发人员
     */
    resolvedBy: string;
    /**
     * bug 解决后一定有一个解决方案
     */
    resolution: string;
    /**
     * bug 被解决的版本号
     */
    resolvedBuild: string;
    /**
     * bug 被解决的时间
     */
    resolvedDate: string;
    /**
     * bug 关闭者，一般是测试人员
     */
    closedBy: string;
    /**
     * bug 关闭时间
     */
    closedDate: string;
    duplicateBug: number;
    linkBug: string;
    case: number;
    caseVersion: number;
    feedback: number;
    result: number;
    repo: number;
    entry: string;
    lines: string;
    v1: string;
    v2: string;
    repoType: string;
    testtask: number;
    lastEditedBy: string;
    lastEditedDate: string;
    deleted: number;
    actions?: IActions;
}

interface ITask {
    /**任务编号 */
    id: number;
    parent: number;
    project: number;
    module: number;
    /**
     * 需求编号
     */
    story: number;
    /**
     * 当前任务关联的需求版本号
     */
    storyVersion: number;
    /**
     * 是否从 bug 派生
     */
    fromBug: number;
    /**
     * 任务标题
     */
    name: string;
    type: string;
    pri: number;
    estimate: number;
    consumed: number;
    left: number;
    deadline: string;
    status: "wait" | "done" | "cancel";
    color: string;
    mailto: string;
    desc: string;
    openedBy: string;
    /**任务开始时间 */
    openedDate: string;
    assignedTo: string;
    assignedDate: string;
    estStarted: string;
    realStarted: string;
    finishedBy: string;
    /**任务结束时间 */
    finishedDate: string;
    finishedList: string;
    canceledBy: string;
    canceledDate: string;
    closedBy: string;
    closedDate: string;
    closedReason: string;
    lastEditedBy: string;
    lastEditedDate: string;
    deleted: number;
    /**
     * 需求编号
     */
    storyID: number;
    /**
     * 需求标题
     */
    storyTitle: string;
    product: number;
    branch: number;
    /**
     * 最新的需求版本号，如果和当前版本号不一致，需要手动确认
     */
    latestStoryVersion: number;
    /**
     * 需求状态
     */
    storyStatus: "active";
    assignedToRealName: string;
    needConfirm: boolean;
    productType: string;
    progress: number;
}

interface IStory {
    project: number;
    product: number;
    /**需求编号 */
    story: number;
    version: number;
    order: number;
    /**需求编号 */
    id: number;
    branch: number;
    module: number;
    /**当前需求所在的产品计划 */
    plan: number;
    source: string;
    sourceNote: string;
    fromBug: number;
    feedback: number;
    /**需求标题 */
    title: string;
    keywords: string;
    type: string;
    pri: number;
    estimate: number;
    status: string;
    color: string;
    stage: string;
    mailto: string;
    /**需求作者 */
    openedBy: string;
    /**需求创建时间 */
    openedDate: string;
    /**需求指派人 */
    assignedTo: string;
    /**需求指派给研发人员的时间 */
    assignedDate: string;
    /**需求最后编辑人 */
    lastEditedBy: string;
    lastEditedDate: string;
    /**需求评审人 */
    reviewedBy: string;
    /**需求评审时间 */
    reviewedDate: string;
    closedBy: string;
    closedDate: string;
    closedReason: string;
    toBug: number;
    childStories: string;
    linkStories: string;
    duplicateStory: number;
    deleted: number;
    productBranch: number;
    productType: string;
    actions: IActions
}

interface IDynamic {
    /**动态编号 */
    id: number;
    /**当前动态关联的对象的类型 */
    objectType: "story" | "bug" | "task";
    /**当前动态关联的对象的编号 */
    objectID: number;
    product: string;
    project: number;
    /**当前动态关联的用户 */
    actor: string;
    /**当前动态关联的用户动作 */
    action: string;
    /**当前动态发生的时间 */
    date: string;
    /**当前动态关联的注释 */
    comment: string;
    /**当前动态关联的用户动作的结果 */
    extra: string;
    read: number;
    efforted: number;
    /**当前动态关联的对象的标题 */
    objectName: string;
    originalDate: string;
    /**当前动态关联的用户动作描述 */
    actionLabel: string;
    /**当前动态关联的对象类型的描述 */
    objectLabel: string;
    /**当前动态关联的对象的链接 */
    objectLink: string;
    major: number;
    /**当前动态发生时间 */
    time: string;
}

interface IProject {
    id: number;
    type: "sprint" | "waterfall";
    account: string;
    role: string;
    /**当前项目名称 */
    name: string;
    code: string;
    /**当前项目开始时间 */
    begin: string;
    /**当前项目结束时间 */
    end: string;
    /**当前项目状态 */
    status: "closed" | "doing" | "wait";
    /**当前项目创建者 */
    openedBy: string;
    openedDate: string;
    openedVersion: string;
    closedBy: string;
    closedDate: string;
    canceledBy: string;
    canceledDate: string;
}

type IUserRole = "dev" | "pm" // 研发
    | "qa" | "qd" // 测试
    | "po" | "pd" // 产品
    | "others" | "top";

interface IUser {
    id: number;
    dept: number;
    account: string;
    realname: string;
    role: IUserRole;
    nickname: string;
    commiter: string;
    avatar: string;
    birthday: string;
    gender: string;
    email: string;
    skype: string;
    qq: string;
    yahoo: string;
    gtalk: string;
    wangwang: string;
    mobile: string;
    phone: string;
    weixin: string;
    dingding: string;
    slack: string;
    whatsapp: string;
    address: string;
    zipcode: string;
    join: string;
    /**访问次数 */
    visits: number;
    ip: string;
    /**最后登录时间 */
    last: number;
    fails: number;
    locked: string;
    feedback: number;
    ranzhi: string;
    /**分数，暂时不明白意义 */
    score: number;
    scoreLevel: number;
    deleted: number;
    clientStatus: "offline" | "online";
    clientLang: "zh-cn";
}

interface ISyncResult {
    [string]: boolean;
}

interface ITimeConsume {
    user: string;
    role: IUserRole;
    hours: number;
}