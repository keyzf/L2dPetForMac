const path = require("path");
function log(any, tag = "debug") {
    let get_time = function () {
        let now = new Date();
        let nowTime = now.toLocaleString();
        let date = nowTime.substring(0, 10);//截取日期
        let time = nowTime.substring(10, 20); //截取时间
        let week = now.getDay(); //星期
        let hour = now.getHours(); //小时
        return date + time;
    }
    // let obj2string = function (o) {
    //     var r = [];
    //     if (typeof o == "string") {
    //         return "" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "";
    //     }
    //     if (typeof o == "object") {
    //         if (!o.sort) {
    //             for (var i in o) {
    //                 r.push(i + ":" + obj2string(o[i]));
    //             }
    //             if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
    //                 r.push("toString:" + o.toString.toString());
    //             }
    //             r = "{" + r.join() + "}";
    //         } else {
    //             for (var i = 0; i < o.length; i++) {
    //                 r.push(obj2string(o[i]))
    //             }
    //             r = "[" + r.join() + "]";
    //         }
    //         return r;
    //     }
    //     return o.toString();
    // }

    let time = get_time()

    console.log(`[${time}][${tag}]${getCallerFileNameAndLine()}`,any);
}

function getCallerFileNameAndLine(){
    function getException() {
        try {
            throw Error('');
        } catch (err) {
            return err;
        }
    }

    const err = getException();

    const stack = err.stack;
    const stackArr = stack.split('\n');
    let callerLogIndex = 0;
    for (let i = 0; i < stackArr.length; i++) {
        if (stackArr[i].indexOf('at log') > 0 && i + 1 < stackArr.length) {
            callerLogIndex = i + 1;
            break;
        }
    }

    if (callerLogIndex !== 0) {
        const callerStackLine = stackArr[callerLogIndex];
        return `[${callerStackLine.substring(callerStackLine.lastIndexOf(path.sep) + 1, callerStackLine.lastIndexOf(':'))}]`;
    } else {
        return '[-]';
    }
}

global["log"] = log
