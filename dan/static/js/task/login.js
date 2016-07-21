$(document).keydown(function(event) {
    if (event.keyCode == 13) {
        if (!isNull()) {
            login();
        }
    }
});
$(function() {
    $("#submit").click(function () {
        if (!isNull()) {
            login();
        }
        return false;
    });
    
    (function initUsernameName() {
        var tqName = getCookie("tqName");
        if (tqName != '' && tqName != ' ' && tqName != 'undefined') {
            $("#username").val(tqName);
            $("input[name=password]").focus();
        } else {
            $("#username").focus();
        }
    })() ;
});
function chCode() {
    $("#imgCode").attr("src", "/Common/ValidateCode.aspx?_=" + Math.random());
    $("#vercode").val("");
}
function isNull() {
    var uName = document.getElementById("username"),
	uNameVal = uName.value,
	pwd = document.getElementById("pwd"),
	pwdVal = pwd.value;

    if (pwdVal === "" && uNameVal === "") {
        $(uName).focus();
        return true;
    }
    if (uNameVal === "") {
        $(uName).focus();
        return true;
    }
    if (pwdVal === "") {
        $(pwd).focus();
        return true;
    }
    return false;
}
function login() {
    var sel = $("#chkRemember").is(':checked');
    if (sel == true) {
        var tqName = $("#username").val();
        setCookie('tqName', tqName, 3);
    } else {
        delCookie('tqName');
    }
    var post = function () {

        $(".login_box").showLoading();

	    var busy = setTimeout(function () { alert("服务器繁忙，请耐心等待..."); }, 25000);
	    var time = new Date().getTime();
	    $.post('/ajax/Login.ashx?_=' + time, $("form").serialize(),
		function (msg) {
		    var data = msg.data;
		    clearInterval(busy);
		    if (data == 0) {
		        setTimeout(function() {alert("服务器繁忙，请耐心等待...");},25000);
		    };
		    switch (data.state) {
		        case 'SUCCESS':
		            window.location.href = data.url;
		            break;
		        case 'ISOLD':
		            window.location.href = data.url;
		            break;
		        case 'LOCKED':
		            window.location.href = data.url;
		            break;
		        case 'Verify':
		            window.location.href = data.url;
		            break;
		        case 'WRONG_PASSWORD':
		            alert(data.message);
		            $("#password").select().focus();
		            chCode();
		            break;
		        case 'NOT_FOUND':
		            alert(data.message);
		            $("#username").select().focus();
		            chCode();
		            break;
		        case 'VCODE_FAIL':
		            alert(data.message);
		            $("#username").select().focus();
		            chCode();
		            break;
		        default:
		            alert("服务器繁忙，请耐心等待...");
		            chCode();
                    break;
		    };
		    $(".login_box").hideLoading();
		},
		"json");
	};
    post();
    login = post;
}

function setCookie(name, value, expireHours) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expireHours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ((expireHours == null) ? "": ";expires=" + exdate.toGMTString());
}
function getCookie(name) {
    if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(name + "=");
        if (start != -1) {
            start = start + name.length + 1;
            var end = document.cookie.indexOf(";", start);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(start, end));
        };
    }
    return '';
}
function delCookie(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - 1000);
    setCookie(name, "", expdate);
}