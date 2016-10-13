/*
* @Author: far
* @Date:   2016-10-10 13:37:58
* @Last Modified by:   far
* @Last Modified time: 2016-10-10 15:59:25
*/

'use strict';
// var userId2 = document.getElementById("userId");
$(function() {

	 $("#userId").focus(function(){   //获得焦点的样式
    	$(this).css({'borderColor':'#7a8d54'});
    	$('#userId_MoRen').html('');
    });
    $("#userId").blur(function(){    //失去焦点的样式
    	$(this).css({'borderColor':'#cfcfd1'}); 
    	if(this.value =='') {
    		$('#userId_MoRen').html('请输入手机号');
    	}
    	else{
    		$('#userId_MoRen').html('');
    	}
    });
    $("#passWord").focus(function(){   //获得焦点的样式
    	$(this).css({'borderColor':'#7a8d54'});
    	$('#passWord_MoRen').html('');
    });
    $("#passWord").blur(function(){    //失去焦点的样式
    	$(this).css({'borderColor':'#cfcfd1'}); 
    	if(this.value =='') {
    		$('#passWord_MoRen').html('请输入密码');
    	}
    	else{
    		$('#passWord_MoRen').html('');
    	}	
    });
    var flag;
    $("#remberUserId").click(function() {

        $(this).css({"background":"url(images/load1101.png) no-repeat -406px -216px"});
        // cookie();
    });
	$(".r_load_btn").on('click',function() {

		var userId = $("#userId").val();
		var passWord = $("#passWord").val();
		var userPhone = JSON.parse($.cookie('userInfo')).userName;
		var userPwd = JSON.parse($.cookie('userInfo')).pwd;
         if(userId != userPhone) {
         	$("#userId_error").css("display","block");
         	$("#userId_ok").css("display","none");
         }else{
         	$("#userId_error").css("display","none");
         	$("#userId_ok").css("display","block");
         }
         if(passWord != userPwd){
			$("#passWord_error").css("display","block");
         	$("#passWord_ok").css("display","none");
		}else{
			$("#passWord_error").css("display","none");
         	$("#passWord_ok").css("display","block");
		}
		if(userId === userPhone && passWord === userPwd){
			 window.location.href = "index.html";
			//alert("哈哈,注册和登录都好了")
		}
	})
})

// function cookie(){
// 		var userInfo = {};
// 		userInfo.userName = userId2.value;
// 		$.cookie("userInfo",JSON.stringify(userInfo),{expires: 14,path:"/"});
// 	}



//<dl class="shopcar fr">
//	<dt>
//		<h3>
//			<i class="icon-car"></i>
//			<a title="" href="#" target="_blank">我的购物车</a>
//			<span class="icon-count">
//			<i id="countId">0</i>
//			</span>
//			<i class="arrow"></i>
//		</h3>
//	</dt>
//	<dd class="shopCartWrap dd">
//		<div class="con">
//			<h4 class="nothing">
//				<i></i>
//				购物车中还没有商品，赶紧选购吧！
//			</h4>
//		</div>
//	</dd>
//</dl>
 
#nav .shopcar {
    z-index: 3;
    position: relative;
    width: 142px;height: 38px;margin-top: 28px;margin-right: 30px;
}

.fr{float:right;}

#nav .shopcar dt {
    z-index: 1;
    position: relative;
    width: 140px;
    height: 36px;
    border: 1px solid #e6e3d3;
    line-height: 36px;
    text-align: center;
    color: #666;
}

#nav .shopcar i.icon-car {
    position: absolute;
    margin-top: 9px;
    left: 16px;
    *margin-top: auto;
    width: 17px;
    height: 17px;
    background: url(../images/banner/icon_index.png) 0 -80px no-repeat;
}
#nav .shopcar .icon-count {
    position: absolute;
    margin-top: -3px;
    *margin-top: -15px;
    padding-left: 5px;
    background: url(../images/banner/icon_index.png) -80px -80px no-repeat;
    font-size: 11px;
    color: #fff;}
    
    #nav.shopcar .icon-count i {
    display: inline-block;
    height: 14px;
    line-height: 14px;
    padding-right: 6px;
    background: url(../images/banner/icon_index.png) right -240px no-repeat;
}
#nav .shopcar i.arrow {
    position: absolute;
    margin-left: 19px;
    margin-left: font-size:10px;
}

#nav .shopcar dd {
    display: none;
    position: absolute;
    top: 42px;
    right: 0px;
    width: 273px;
    background-color: #fff;
    border: 1px solid #e7e7e7;
    box-shadow: 0 0 2px rgba(0,0,0,.2);
}
#nav .shopcar .nothing {
    margin-left: 73px;
    height: 61px;
    line-height: 61px;
    color: #999;
}

#nav .shopcar .nothing i {
    position: absolute;
    top: 0;
    width: 44px;
    height: 61px;
    margin-left: -52px;
    background: url(../images/banner/icon_index.png) -160px -68px no-repeat;
}