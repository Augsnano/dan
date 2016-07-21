//提示
function ShowMsg(msg, success) {
    if (success) {
        window.top.art.dialog({ id: 'colse', content: msg, lock: true, width: '350px' }, function () { this.close(); });
    } else {
        window.top.art.dialog({ id: 'colse', content: msg, lock: true, width: '350px' }, function () { this.close(); });
    }
}
//复制
function toCopy(obj) {
    $(".copy-btn").zclip({
        copy: $("#" + obj).html()
    });
}

function showMsg(select, str, type) {
    $(select).attr('class', type).html(str);
}

function send_countdown(obj, time, str) {
    obj.val(time + str);
    obj.attr('data-time', time);
    window.countdownTimer = setInterval(function () {
        if (--time > 0) {
            obj.val(time + str);
        } else {
            clearInterval(countdownTimer);
            obj.val('重新发送').removeClass('btnDisabled').addClass('btn');
            obj.removeAttr('disabled');
            obj.removeAttr('disabled');
        }
    },
	1000);
}

function isPhone(str) {
    var reg = /^0?(13|14|15|17|18)[0-9]{9}$/;
    return reg.test(str);
}
function isIDCard(str) {
    var reg = /^[1-9]([0-9]{14}|[0-9|X|x]{17})$/;
    return reg.test(str);
}
function isEmail(str) {
    var reg = /^[a-zA-z0-9_\-]+(\.[_a-zA-z0-9\-]+)*@([_a-zA-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)$/;
    //var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(str);
}
function isUsername(str) {
    var reg = new RegExp("^[a-zA-Z\\u4E00-\\u9FA5][\\u4E00-\\u9FA5\\uF900-\\uFA2D_\\w]{2,19}$", "i");
    return reg.test(str);
}
function isQQ(str) {
    var reg = /[1-9]*[1-9][0-9]*/;
    return reg.test(str);
}

function isEmail11(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    var emailSplit = str.split('.');
    var suffix = emailSplit[emailSplit.length - 1];
    var emails = {
        "com": "com",
        "cn": "cn",
        "cc": "cc",
        "co": "co",
        "net": "net",
        "hk": "hk",
        "me": 'me',
        "mobi": "mobi",
        "name": "name",
        "org": "org",
        "so": "so",
        "tel": "tel",
        "tv": "tv",
        "biz": "biz"
    };
    if (reg.test(str) && emails[suffix]) return true;
    return false;
}
function isAbc(str) {
    var reg = /^([a-zA-Z]+)$/;
    return reg.test(str);
}
function isNum(str) {
    var reg = /^([0-9]+)$/;
    return reg.test(str);
}
function isFh(str) {
    var reg = /^([*$#%&@!+-|^)(]+)$/;
    return reg.test(str);
}

function check_space(str) {
    var reg = /[\s]/g;
    return reg.test(str);
}

function isTY(str) {
    var fh = /^([*$#%&@!+_-|^)(]+)$/;
    rev_str = str.split("").reverse().join("");
    //var reg = /[*$#%&@!+_-|^)(]/g;
    var az = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]$/;
    if (rev_str == str && fh.test(str) == true) {
        return true//纯符号
    } else {
        return false
    }

}

function addMsg(select, str, msg) {
    $(select).html('<span class="' + msg + '">' + str + '</span>');
}
function checkpage(url) {
    var pv = document.getElementById('page').value;
    if (pv == "") {
        alert("请输入页码");
        return false;
    } else {
        window.location.href = url;
    }
}

//保留两位小数
//功能：将浮点数四舍五入，取小数点后2位
function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x * 100) / 100;
    return f;
}


//制保留2位小数，如：2，会在2后面补上00.即2.00
function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

function fomatFloat(src, pos) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

Number.prototype.toFixed = function (len) {
    var add = 0;
    var s, temp;
    var s1 = this + "";
    var start = s1.indexOf(".");
    if (s1.substr(start + len + 1, 1) >= 5) add = 1;
    temp = Math.pow(10, len);
    s = Math.floor(this * temp) + add;
    return s / temp;
}