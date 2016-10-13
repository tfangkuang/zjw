$(function () {
    //获取搜索框搜索推荐词
    searchBox.getWord();
});

var UserTopComm = {
    //退出
    unLogin: function () {
        CommonTopControl.unLogin(UserTopComm.unLoginCallBack);
    },
    unLoginCallBack: function (resHtmlccb) {
        if (resHtmlccb.value == "1") {
            $("#site-nav").empty().html("<div id='site-nav'><div class='w clearfix'>  <ul class='fl clearfix'> <li><i class='icon-home'></i><a title='' href='http://mall.zhongjiu.cn/' target='_self'>中酒首页</a></li><li>Hi,欢迎来中酒</li><li><a title='' href='http://login.zhongjiu.cn' target='_self'>请登录</a></li>  <li><a title='' href='http://login.zhongjiu.cn/new/reg/' target='_self' class='highlight'>注册</a></li></ul><ul class='fr clearfix'><li><i class='icon-my'></i><a title='' href='http://login.zhongjiu.cn?returl=http://i.zhongjiu.cn/' target='_self'>我的中酒</a></li><li><i class='icon-goweb'></i><a title='' href='http://pro.zhongjiu.cn/20141209/shouji/shouji.html' target='_self'>手机版</a></li>   <li><i class='icon-help'></i><a title='' href='http://pro.zhongjiu.cn/helpCenter/helpCenter.html' target='_self'>帮助中心</a></li><li><i class='icon-call'></i>订购热线：<strong class='highlight'>400-798-9999</strong></li>  </ul> </div>");
        }
    }
};
var searchBox = {
    //获取搜索框中搜索推荐词
    getWord: function () {
        HeaderControl.getRecommandWord(searchBox.getWordCallBack);
    },
    getWordCallBack: function (data) {
        $("#keyword").val(data.value);
    }
};