const fs = require("fs");
const path = require("path");
const {expect} = require("chai");
const { toWeekHours } = require("./holiday");
const {BugAnalyzer} = require("./api");

// holiday tests
expect(toWeekHours("0000-00-00 00:00:00", "2021-04-29 17:23:00")).to.equal(0);
expect(toWeekHours("2021-04-29 17:23:00", "0000-00-00 00:00:00")).to.equal(0);
expect(toWeekHours("2021-04-29 17:23:00", "2021-05-01 12:00:23")).to.match(/^30\.616/);
expect(toWeekHours("2021-04-29 17:23:00", "2021-05-09 12:00:23")).to.match(/^102\.616/);
expect(toWeekHours("2021-05-01 12:00:23", "2021-05-01 17:23:00")).to.equal(0);
expect(toWeekHours("2021-04-29 12:23:23", "2021-04-29 17:23:30")).to.match(/^5\.0019/);

// BugAnalyzer tests
const bugData1 = {
    id: '20284',
    severity: '3',
    pri: '3',
    type: 'codeerror',
    status: 'resolved',
    confirmed: '1',
    title: "【VOI-终端数据盘】【1/4】桌面内，终端数据盘不能正常双击打开",
    activatedCount: '0',
    activatedDate: '0000-00-00 00:00:00',
    openedBy: 'liaoyuni',
    openedDate: '2020-10-28 10:55:39',
    openedBuild: '2388,2392',
    assignedTo: 'ruanke',
    assignedDate: '2021-03-31 11:59:05',
    resolvedBy: 'tanzhenhua',
    resolution: 'notrepro',
    resolvedBuild: 'trunk',
    resolvedDate: '2021-03-31 11:57:12',
    closedBy: '',
    closedDate: '0000-00-00 00:00:00',
    lastEditedBy: 'zhangmeng2',
    lastEditedDate: '2021-03-31 11:59:05',
    "actions": {
        "379862": {
            "id": "379862",
            "objectType": "bug",
            "objectID": "20284",
            "product": ",7,",
            "project": "397",
            "actor": "liaoyuni",
            "action": "opened",
            "date": "2020-10-28 10:55:39",
            "comment": "",
            "extra": "",
            "read": "1",
            "efforted": "0",
            "history": []
        },
        "379875": {
            "date": "2020-10-28 11:56:40",
            "history": [
                {
                    "id": "498348",
                    "action": "379875",
                    "field": "assignedTo",
                    "old": "chenxiaohu",
                    "new": "xufan",
                    "diff": ""
                }
            ]
        },
        "379883": {
            "date": "2020-10-28 13:24:41",
            "history": [
                {
                    "id": "498353",
                    "action": "379883",
                    "field": "assignedTo",
                    "old": "xufan",
                    "new": "tanzhenhua",
                    "diff": ""
                }
            ]
        },
        "381519": {
            "date": "2020-11-05 16:19:37",
            "history": [
                {
                    "id": "502100",
                    "action": "381519",
                    "field": "assignedTo",
                    "old": "tanzhenhua",
                    "new": "zouyuhui",
                    "diff": ""
                }
            ]
        },
        "395308": {
            "date": "2020-12-17 19:09:48",
            "history": [
                {
                    "id": "527398",
                    "action": "395308",
                    "field": "assignedTo",
                    "old": "zouyuhui",
                    "new": "liaoyuni",
                    "diff": ""
                }
            ]
        },
        "411153": {
            "date": "2021-02-24 22:09:39",
            "history": [
                {
                    "id": "558501",
                    "action": "411153",
                    "field": "assignedTo",
                    "old": "liaoyuni",
                    "new": "zouyuhui",
                    "diff": ""
                }
            ]
        },
        "418618": {
            "date": "2021-03-18 12:59:35",
            "history": [
                {
                    "id": "572573",
                    "action": "418618",
                    "field": "assignedTo",
                    "old": "zouyuhui",
                    "new": "tanzhenhua",
                    "diff": ""
                }
            ]
        },
        "422920": {
            "date": "2021-03-31 11:41:06",
            "history": [
                {
                    "id": "582799",
                    "action": "422920",
                    "field": "assignedTo",
                    "old": "tanzhenhua",
                    "new": "zhangmeng2",
                    "diff": ""
                }
            ]
        },
        "422935": {
            "date": "2021-03-31 11:57:00",
            "history": [
                {
                    "id": "582834",
                    "action": "422935",
                    "field": "assignedTo",
                    "old": "zhangmeng2",
                    "new": "tanzhenhua",
                    "diff": ""
                }
            ]
        },
        "422936": {
            "date": "2021-03-31 11:58:12",
            "history": [
                {
                    "id": "582835",
                    "action": "422936",
                    "field": "resolution",
                    "old": "",
                    "new": "notrepro",
                    "diff": ""
                },
                {
                    "id": "582836",
                    "action": "422936",
                    "field": "resolvedBuild",
                    "old": "",
                    "new": "trunk",
                    "diff": ""
                },
                {
                    "id": "582837",
                    "action": "422936",
                    "field": "resolvedDate",
                    "old": "",
                    "new": "2021-03-31 11:57:12",
                    "diff": ""
                },
                {
                    "id": "582838",
                    "action": "422936",
                    "field": "assignedTo",
                    "old": "tanzhenhua",
                    "new": "zhangmeng2",
                    "diff": ""
                },
                {
                    "id": "582839",
                    "action": "422936",
                    "field": "status",
                    "old": "active",
                    "new": "resolved",
                    "diff": ""
                },
                {
                    "id": "582840",
                    "action": "422936",
                    "field": "resolvedBy",
                    "old": "",
                    "new": "tanzhenhua",
                    "diff": ""
                }
            ]
        },
        "422937": {
            "date": "2021-03-31 11:59:05",
            "history": [
                {
                    "id": "582841",
                    "action": "422937",
                    "field": "assignedTo",
                    "old": "zhangmeng2",
                    "new": "ruanke",
                    "diff": ""
                }
            ]
        }
    }
};
const ba = new BugAnalyzer([bugData1]);
expect(ba.status("resolved").author("liaoyuni").owner("ruanke").title(/桌面/).end()).deep.equal([bugData1]);
expect(ba.reset().openDate("2020-10-28").openHour(10).end()).deep.equal([bugData1]);
expect(ba.reset().resolveDate("2021-03-31").resolveHour(11).resolution("notrepro").end()).deep.equal([bugData1]);
expect(ba.reset().activated().end()).deep.equal([]);
expect(ba.reset().timeout(1).end()).deep.equal([bugData1]);
expect(ba.reset().timeout("2021-04-02 09:20:22", 30).end()).deep.equal([bugData1]);
expect(ba.reset().severity12().end()).deep.equal([]);
expect(ba.reset().severity34().end()).deep.equal([bugData1]);
expect(ba.reset().elapsedStats()).deep.equal([{
    totalHours: 2545.0258333333186,
    userHours: [
        [ 'chenxiaohu', 1.0169444444444444 ],
        [ 'xufan', 1.4669444444444444 ],
        [ 'tanzhenhua', 146.91555555554805 ],
        [ 'zouyuhui', 722.8363888888853 ],
        [ 'liaoyuni', 1082.9974999999977 ],
        [ 'zouyuhui', 374.8322222222341 ],
        [ 'tanzhenhua', 214.69194444443565 ],
        [ 'zhangmeng2', 0.265 ],
        [ 'tanzhenhua', 0.02 ],
        [ 'zhangmeng2', 0.014722222222222222 ]
    ]
}]);