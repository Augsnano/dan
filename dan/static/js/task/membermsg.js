function getMsg() {
    $.ajax({
        url: "/Ajax/MemberMsg.ashx?action=domsg",
        type: "GET",
        cache: false,
        dataType: "json",
        success: function (transport) 
        {
            if (transport.action) {
                var con = "";
                //if (transport.msg > 0) {
                //    //$("#umsg").removeClass("none").addClass("num").text(transport.msg);
                //    $("#mmsg").text(transport.msg);
                //}
                if (transport.notify > 0) {
                    //$("#unotify").removeClass("none").addClass("num").text(transport.notify);
                    $("#mnotify").text(transport.notify);
                    con += "您有<strong>" + transport.notify + "</strong>条公告未读，查看<a href=\"/member/message/sysmsg.aspx\">点击这里</a><br />";
                } else {
                    $("#mnotify").text(0);
                }
                if (transport.notice > 0) {
                    //$("#unotice").removeClass("none").addClass("num").text(transport.notice);
                    $("#mnotice").text(transport.notice);
                    con += "您有<strong>" + transport.notice + "</strong>条通知未读，查看<a href=\"/member/message/notice.aspx\">点击这里</a>";
                } else {
                    $("#mnotice").text(0);
                }
                if (con != "") {
                    window.top.art.dialog.notice({
                        title: '消息中心',
                        width: 230,// 必须指定一个像素宽度值或者百分比，否则浏览器窗口改变可能导致artDialog收缩
                        content: con,
                        icon: 'face-smile',
                        time: 5
                    });
                }
            }
        }
    });
}
$(document).ready(function () {
    getMsg();
})