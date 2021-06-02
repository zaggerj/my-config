const legalHoliday = {
    // 国务院办公厅关于2018年部分节假日安排的通知
    // 元旦：1月1日放假，与周末连休。
    "2018/1/1": true,
    "2018/1/2": true,
    "2018/1/3": true,
    // 春节：2月15日至21日放假调休，共7天。2月11日（星期日）、2月24日（星期六）上班。
    "2018/2/11": false,
    "2018/2/15": true,
    "2018/2/16": true,
    "2018/2/17": true,
    "2018/2/18": true,
    "2018/2/19": true,
    "2018/2/20": true,
    "2018/2/21": true,
    "2018/2/24": false,
    // 清明节：4月5日至7日放假调休，共3天。4月8日（星期日）上班。
    "2018/4/5": true,
    "2018/4/6": true,
    "2018/4/7": true,
    "2018/4/8": false,
    // 劳动节：4月29日至5月1日放假调休，共3天。4月28日（星期六）上班。
    "2018/4/28": false,
    "2018/4/29": true,
    "2018/4/30": true,
    "2018/5/1": true,
    // 端午节：6月18日放假，与周末连休。
    "2018/6/18": true,
    "2018/6/19": true,
    "2018/6/20": true,
    // 中秋节：9月24日放假，与周末连休。
    "2018/9/24": true,
    "2018/9/25": true,
    "2018/9/26": true,
    // 国庆节：10月1日至7日放假调休，共7天。9月29日（星期六）、9月30日（星期日）上班。
    "2018/9/29": false,
    "2018/9/30": false,
    "2018/10/1": true,
    "2018/10/1": true,
    "2018/10/1": true,
    "2018/10/1": true,
    "2018/10/1": true,
    "2018/10/1": true,
    "2018/10/1": true,
    // 国务院办公厅关于2019年部分节假日安排的通知
    // 元旦：2018年12月30日至2019年1月1日放假调休，共3天。2018年12月29日（星期六）上班。
    "2018/12/29": false,
    "2018/12/30": true,
    "2018/12/31": true,
    "2019/1/1": true,
    // 春节：2月4日至10日放假调休，共7天。2月2日（星期六）、2月3日（星期日）上班。
    "2019/2/2": false,
    "2019/2/3": false,
    "2019/2/4": true,
    "2019/2/5": true,
    "2019/2/6": true,
    "2019/2/7": true,
    "2019/2/8": true,
    "2019/2/9": true,
    "2019/2/10": true,
    // 清明节：4月5日放假，与周末连休。
    "2019/4/5": true,
    "2019/4/6": true,
    "2019/4/7": true,
    // 劳动节：5月1日放假。
    "2019/5/1": true,
    // 端午节：6月7日放假，与周末连休。
    "2019/6/7": true,
    "2019/6/8": true,
    "2019/6/9": true,
    // 中秋节：9月13日放假，与周末连休。
    "2019/9/13": true,
    "2019/9/14": true,
    "2019/9/15": true,
    // 国庆节：10月1日至7日放假调休，共7天。9月29日（星期日）、10月12日（星期六）上班。
    "2019/9/29": false,
    "2019/10/1": true,
    "2019/10/2": true,
    "2019/10/3": true,
    "2019/10/4": true,
    "2019/10/5": true,
    "2019/10/6": true,
    "2019/10/7": true,
    "2019/10/12": false,
    // 国务院办公厅关于2020年部分节假日安排的通知
    // 元旦
    "2020/1/1": true,
    // 春节
    "2020/1/19": false,
    "2020/1/24": true,
    "2020/1/25": true,
    "2020/1/26": true,
    "2020/1/27": true,
    "2020/1/28": true,
    "2020/1/29": true,
    "2020/1/30": true,
    "2020/2/1": false,
    // 清明节
    "2020/4/4": true,
    "2020/4/5": true,
    "2020/4/6": true,
    // 劳动节
    "2020/4/26": false,
    "2020/5/1": true,
    "2020/5/2": true,
    "2020/5/3": true,
    "2020/5/4": true,
    "2020/5/5": true,
    "2020/5/9": false,
    // 端午节
    "2020/6/25": true,
    "2020/6/26": true,
    "2020/6/27": true,
    "2020/6/28": false,
    // 国庆节、中秋节
    "2020/9/27": false,
    "2020/10/1": true,
    "2020/10/2": true,
    "2020/10/3": true,
    "2020/10/4": true,
    "2020/10/5": true,
    "2020/10/6": true,
    "2020/10/7": true,
    "2020/10/8": true,
    "2020/10/10": false,
    // 国务院办公厅关于2021年部分节假日安排的通知
    // 元旦
    "2021/1/1": true,
    "2021/1/2": true,
    "2021/1/3": true,
    // 春节
    "2021/2/7": false,
    "2021/2/11": true,
    "2021/2/12": true,
    "2021/2/13": true,
    "2021/2/14": true,
    "2021/2/15": true,
    "2021/2/16": true,
    "2021/2/17": true,
    "2021/2/20": false,
    // 清明节
    "2021/4/3": true,
    "2021/4/4": true,
    "2021/4/5": true,
    // 劳动节
    "2021/4/25": false,
    "2021/5/1": true,
    "2021/5/2": true,
    "2021/5/3": true,
    "2021/5/4": true,
    "2021/5/5": true,
    "2021/5/8": false,
    // 端午节
    "2021/6/12": true,
    "2021/6/13": true,
    "2021/6/14": true,
    // 中秋节
    "2021/9/18": false,
    "2021/9/19": true,
    "2021/9/20": true,
    "2021/9/21": true,
    // 国庆节
    "2021/9/26": false,
    "2021/10/1": true,
    "2021/10/2": true,
    "2021/10/3": true,
    "2021/10/4": true,
    "2021/10/5": true,
    "2021/10/6": true,
    "2021/10/7": true,
    "2021/10/9": false,
};

module.exports = {toWeekHours, isHoliday}
/**
 * 
 * @param {string} from 开始时间
 * @param {string} to 结束时间
 */
function toWeekHours(from, to) {
    const oneHour = 1 * 60 * 60 * 1000
    let fromDate = new Date(from);
    let toDate = new Date(to);
    if(isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return 0;
    }
    if(fromDate.toDateString() === toDate.toDateString()) {
        return isHoliday(fromDate) ? 0 : (toDate - fromDate) / oneHour;
    }
    let beforeHours = isHoliday(fromDate) ? 0 : fromDate.getHours() + fromDate.getTime() / oneHour % 1;
    let afterHours = isHoliday(toDate) ? 0 : 24 - toDate.getHours() - (toDate.getTime() / oneHour % 1)
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);
    let totalHours = (toDate - fromDate) / oneHour + 24;
    while(fromDate <= toDate) {
        if(isHoliday(fromDate)) {
            totalHours -= 24;
        }
        fromDate.setDate(fromDate.getDate() + 1);
    }
    return totalHours - beforeHours - afterHours;
}

/**
 * 判断指定的日期对象或字符串是否是节假日
 * @param {string|Date} str 日期
 * @returns {Boolean}
 */
function isHoliday(str) {
    let d = str;
    if(typeof d === "string") {
        d = new Date(str);
    }
    let dstr = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    if(legalHoliday.hasOwnProperty(dstr)) {
        return legalHoliday[dstr];
    }
    let weekday = d.getDay();
    return weekday === 0 || weekday === 6;
}