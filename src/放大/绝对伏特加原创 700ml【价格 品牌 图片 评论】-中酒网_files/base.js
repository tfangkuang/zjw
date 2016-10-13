// JavaScript Document
$(function () {
    $("#side-service .t li").filter("[data-ind]").click(function () {
        TCChange($(this), $("#side-service .c"), 'data-ind', 'sel');
        if (parseInt($("#side-service").css("right")) === 0) {
        } else {
            startMove($('#side-service'), -270, 0);

        }

    });
    $("#side-service .op-close").click(function () {
        $('#side-service').find('h3').css({ 'position': 'absolute' });
        $('#side-service').find('.foot').css({ 'position': 'fixed' });
        startMove($('#side-service'), 0, -270);
        $("#side-service .t li").removeClass("sel");
    });
    $("#back-to-top").click(function () {
        $('body,html').animate({ scrollTop: 0 }, 1000);
        return false;
    });
})
/*TCChange:tab的c切换*
*$TLi:
t中点击的当前li对象
*$C：
c对象
*attrname:
t c 中实现匹配的凭证（attrname相等则匹配是一对）
*classname:
t c 内容中选中时（必须用同一个类名通过父级类实现）
*/
function TCChange($TLi, $C, attrname, classname) {
    $TLi.siblings('li').removeClass(classname);
    var sInd = $TLi.addClass(classname).attr(attrname);
    $C.children().removeClass(classname).filter(function (ind, obj) {
        return $(obj).attr(attrname) === sInd;
    }).addClass(classname);
}

/*
弹性运动
$obj
iRight:right的初始值
iTarget:right的目标值
*/
var timer = null;
function startMove($obj, iRight, iTarget) {
    var iR = iRight;
    clearInterval(timer);
    timer = setInterval(function () {
        var iSpeed = (iTarget - iRight) / 5;
        iSpeed *= 0.7;
        $('#side-service').find('.foot').css({ 'position': 'fixed' });
        if (Math.abs(iSpeed) < 1 && Math.abs(iTarget - iRight) < 1) {
            clearInterval(timer);
            if (iTarget > iR) {
                $('#side-service').find('h3').css({ 'position': 'fixed' });
                //$('#side-service').find('.foot').css({ 'position': 'fixed' });
                //$('#side-service').find('.foot').css({ "display": "block" });
            }

            $obj.css('right', iTarget + 'px');
        }
        else {
            iRight += iSpeed;
            $obj.css('right', iRight + 'px');
            $('#side-service').find('.foot').css({ 'position': 'fixed', "right": "" + iRight + "" });
            $('#side-service').find('.foot').css('right', iRight + 'px');
        }


    }, 30);
}
function closeSide() {
    $('#side-service').find('h3').css({ 'position': 'absolute' });
    $('#side-service').find('.foot').css({ 'position': 'absolute' });
    startMove($('#side-service'), 0, -270);
    $("#side-service .t li").removeClass("sel");

}