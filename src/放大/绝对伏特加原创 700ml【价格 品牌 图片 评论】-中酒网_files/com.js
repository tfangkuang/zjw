// JavaScript Document
$(function () {
    $('.picZoomer').picZoomer();
    //切换图片
    $('.piclist li').on('mouseover', function (event) {
        $(this).siblings('li').removeClass('selected');
        var $pic = $(this).addClass('selected').find('img');
        //$('.picZoomer-pic').attr('src', $pic.attr('src').split('.jpg')[0] + "ource.jpg");
        var src = $pic.attr('src');
        var i = src.lastIndexOf(".");
        var suffix = src.substring(i);
        $('.picZoomer-pic').attr('src', $pic.attr('src').split(suffix)[0] + "ource" + suffix);
    });
    //piclist向左向右切换图片列表
    var flag = { left: true, right: false };
    var $piclist = $('.piclist');
    var speed = $('.piclist-con').width() + parseInt($('.piclist').find('li').css("marginRight"));
    var onescreenNum = Math.floor($('.piclist-con').width() / $('.piclist').find('li').get(0).offsetWidth);
    var screenNum = Math.ceil($piclist.find('li').length / onescreenNum);
    var flag = 1;
    $('.piclist-btn-down').on('click', function () {
        if (++flag <= screenNum) {
            var l = parseInt($piclist.css('left')) - speed;
            $piclist.stop(true, true).animate({ left: l + 'px' }, 'fast', 'linear');
            $(this).siblings('.piclist-btn-up').removeClass('no').addClass('yes');
        } else {
            $(this).removeClass('yes').addClass('no');
            flag = screenNum;
        }
    });
    $('.piclist-btn-up').on('click', function () {
        if (--flag) {
            var l = parseInt($piclist.css('left')) + speed;
            $piclist.stop(true, true).animate({ left: l + 'px' }, 'fast', 'linear');
            $(this).siblings('.piclist-btn-down').removeClass('no').addClass('yes');
        } else {
            $(this).removeClass('yes').addClass('no');
            flag = 1;
        }
    });
    //rank
    $("#com-details .rank dt").eq(0).hide().next('dd').show();
    $("#com-details .rank dt").hover(
		  function () {
		      $(this).siblings("dd").hide();
		      $(this).hide().next("dd").show();
		  },
		  function () {
		      $(this).siblings("dt").show();
		  }
		);
    //tab
    var iTop = $('#com-details .tab-t').offset().top;
    $(window).scroll(function () {
        if ($(window).scrollTop() >= iTop) {
            $('#com-details .tab-t').addClass('tab-t-fix');
        } else {
            $('#com-details .tab-t').removeClass('tab-t-fix');
        }
    });
    //tab items change
    $("#com-details .tab-t li").click(function () {
        TCChange($(this), $("#com-details .tab-con"), 'data-ind', 'sel');
    });
    $("#com-details .tab-con-eva .t li").click(function () {
        TCChange($(this), $("#com-details .tab-con-eva .c"), 'data-ind', 'sel');
    });

    //num++ num--
    $("#num a").click(function () {
        var $Inp = $("#num input");
        var iNum = parseInt($Inp.val());
        var iMaxNum = parseInt($("#maxNum").text());
        if (isNaN(iMaxNum) || iMaxNum == "undefined" || iMaxNum == null) {
            iMaxNum = 99;
        }
        $Inp.attr('data-max', iMaxNum);
        if ($(this).hasClass("add") && iNum === iMaxNum) {
            $(this).addClass("dis");
        } else if ($(this).hasClass("plus") && iNum === 0) {
            $(this).addClass("dis");
        } else if ($(this).hasClass("add") && iNum < iMaxNum) {

            if (iNum === 0) { $(this).siblings(".plus").removeClass("dis") };
            iNum++;

        } else if ($(this).hasClass("plus") && iNum > 0) {
            if (iNum === iMaxNum) { $(this).siblings(".add").removeClass("dis") };
            iNum--;

        }
        $Inp.val(iNum);
    });
    $("#num input").blur(function () {
        $("#num a").removeClass("dis")
        var iNum = parseInt($(this).val());
        var iMaxNum = parseInt($("#maxNum").text());
        if (isNaN(iNum)) {
            $(this).val(1);
        } else if (iNum <= 0) {
            $(this).val(1);
            $("#num .plus").addClass("dis");

        } else if (iNum >= iMaxNum) {
            $(this).val(iMaxNum);
            $("#num .add").addClass("dis");
        }
    });

});
		
