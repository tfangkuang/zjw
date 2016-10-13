/*
用户收藏商品
*/
var UserOper = {
    LoginUrl: "http://login.zhongjiu.cn",
    AddFavorite: function () {
        var pId = $("#ProductID").val();
        PictureShowControl.ShouCang(pId, UserOper.AddFavoriteCallBack);
    },
    AddFavoriteCallBack: function (data) {
        var res = data.value;
        if (res == "0") {
            alert("您还没有登录，请先登录！");
            location.href = UserOper.LoginUrl + '?returl=' + encodeURI(location.href);
        } else if (res == "1") {
            alert("该商品已收藏，不可重复收藏！");
        } else if (res == "2") {
            alert("收藏成功！");
        } else {
            alert("收藏失败！");
        }
    }
};
/*
商品详情页获取用户购物车
*/
var MyCar = {

}