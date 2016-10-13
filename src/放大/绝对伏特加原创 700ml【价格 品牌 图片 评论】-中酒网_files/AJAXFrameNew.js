AJAXFrame = {};
var AppPath = window.location.protocol + "//" + window.location.host;

AJAXFrame.Ajax = {
    MAX_REREQUEST_COUNT: 2,
    _requestKeys: [],
    _requestErrorCounts: [],
    /*Ajax请求
    *@serverType:服务器端的类型
    *@serverMethod:服务器端的方法
    *@args:Json形式的参数
    *@clientCallBack:客户端回调的方法
    *@url:请求的URL
    *@httpMethod:请求的方法：get/post
    */
    callBack: function(serverType, serverMethod, args, clientCallBack, url, httpMethod, timeout) {
        var parameter = {};
        parameter["Ajax_CallBackType"] = serverType;
        parameter["Ajax_CallBackMethod"] = serverMethod;
        if (args) {
            for (var i = 0, count = args.length; i < count; i++) {
                parameter["Ajax_CallBackArgument" + i] = encodeURIComponent(args[i]);
            }
        }
        httpMethod = httpMethod || "post";
        if (url.indexOf("http://") < 0) {
            url = AppPath + url;
            AjaxCommon(url, clientCallBack, httpMethod, parameter);
        }
        var ajaxRequest = null;
    }
};

function AjaxCommon(url, clientCallBack, httpMethod, parameter) {
    $.ajax({
        type: httpMethod,
        url: url,
        data: parameter,
        contentType: "application/x-www-form-urlencoded,charset=UTF-8",
        async: "true",
        timeout: 50000,
        dataType: "json",
        success: clientCallBack
    });
}