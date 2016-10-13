/*
* @Author: far
* @Date:   2016-10-09 23:58:02
* @Last Modified by:   far
* @Last Modified time: 2016-10-10 14:27:49
*/

'use strict';
var userPhone = document.getElementById("userId");
var passWord = document.getElementById("passWord");
var mobileReg = /^[1]{1}[3|5|8]{1}[0-9]{1}\d{8}$/;  
var pwdReg = /[0-9a-zA-Z]{6,20}/;  //6到20位 正则表达式
var flag1,flag2,flag3;
$(function(){
    $("#userId").mouseover(function() {
        this.select()
    });
    //注册手机验证
    $("#userId").focus(function(){   //获得焦点的样式
    	$(this).css({'borderColor':'#7a8d54'});
    	$('#userId_moren').html('');
    });
    $("#userId").blur(function(){    //失去焦点的样式
    	$(this).css({'borderColor':'#cfcfd1'});
    	if(this.value == '') {
    		$("#userId_error").css("display","none");
    		$('#userId_moren').html('请输入手机号');
    	}
    	else if(!mobileReg.test(this.value)) {
    		$("#userId_error").css("display","block");
    		$('#userId_ok').css("display","none");
    		flag1 = false;
    	}
    	else{
    		$('#userId_ok').css("display","block");
    		$("#userId_error").css("display","none");
    		flag1 = true;
    	}
    });
    $("#passWord").focus(function() {
    	$(this).css({'borderColor':'#7a8d54'});
    	$('#passWord_moren').html('');
    });

    $("#passWord").blur(function(){    //失去焦点的样式
    	$(this).css({'borderColor':'#cfcfd1'});
    	if(this.value == '') {
    		$("#passWord_error").css("display","none");
    		$('#passWord_moren').html('请输入密码');
    	}
    	else if(!pwdReg.test(this.value) && this.value.length < 6) {
    		$("#passWord_error").css("display","block");
    		$('#passWord_ok').css("display","none");
    		flag2 = false;
    	}
    	else{
    		$('#passWord_ok').css("display","block");
    		$("#passWord_error").css("display","none");
    		flag2 = true;
    	}
    });

    // 验证密码
	$("#repeatPassWord").focus(function(){
           $(this).css({'borderColor':'#7a8d54'});
           $('#repeatPassWord_moren').html('');
	})
	$("#repeatPassWord").blur(function(){
		$(this).css({'borderColor':'#cfcfd1'});
		if(this.value == '') {
    		$("#repeatPassWord_error").css("display","none");
    		$('#repeatPassWord_moren').html('请输入确认密码');
    	}
		else if(this.value != passWord.value){
			$("#repeatPassWord_error").css("display","block");
			$('#repeatPassWord_ok').css("display","none");
			flag3 = false;
		}else{
			$('#repeatPassWord_ok').css("display","block");
			$("#repeatPassWord_error").css("display","none");
			flag3 = true;
		}
	});

	//注册
     $("#r_load_btn").on('click',function() {
     	if(flag1 && flag2 && flag3){
			cookie();
			alert("恭喜您，注册成功,请保存好您的账户和密码！");
			window.location.href = "login.html";
            $('#userId_moren').html('');
		}else{
			alert("所填信息有误，请您重写填写！");
		}
     });

})
// 创建登录的cookie
		function cookie(){
		var userInfo = {};
		userInfo.userName = userPhone.value;
		userInfo.pwd = passWord.value;
		$.cookie("userInfo",JSON.stringify(userInfo),{expires: 14,path:"/"});
	}