~(function () {
    // 字符串编码转为unicode编码
    function charToUnicode (str) {
        let temp, i = 0, r = '';
        for (let val of str) {
            temp = val.codePointAt(0).toString(16);
            while (temp.length < 4) {
                temp = '0' + temp;
            }
            r += '\\u' + temp;
        }
        return r;
    }
    // unicode编码转为字符串编码
    function unicodeToChar (str) {
        // return eval('"' + str + '"');
        return unescape(str.replace(/\u/g, '%u'));
    }
    function getLength(str) {
        let length = 0;
        for(let val of str){
            length++;
        }
        return length;
    }
    function is32Bit(c) {
        return c.codePointAt(0) > 0xFFFF;
    }
    is32Bit('吉');
    is32Bit('啊')
    is32Bit('a')
    function getViewLength(str) {
        let length = 0;
        for (let c of str) {
            if(c.codePointAt(0) > 0x00FF) {
                length = length + 2;
            } else {
                length++;
            }
        }
        return length;
    }
})()
