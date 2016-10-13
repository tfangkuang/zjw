//	$(function(){
//			 var index=0;
// 			 var $_picn=$(".list li").length;
// 			 
//// 	初始状态		 
//	  	$(".list2 li").eq(0).addClass("active");
//	    $(".list li").eq(0).show().siblings(".list li").hide();
//	    
//	    
//	    
//		$(".list2 li").on("click",function(){
//			
//			
//	  	 var index=$(this).index();
//	  	$(this).addClass("active").siblings().removeClass("active");
//	  	
//	  	$(".list li").eq(index).fadeIn(500).siblings(" li").fadeOut(500);
//	  	console.log(index);
//	  });
//	  setInterval(function(){
//	  	
//	 
//	  	
//	  	
//	    show(index);
//	    index++;
//	    if(index==$_picn){index=0;}
//	  },3000);  
//	  
//	  function show(index){
//	    $(".list2 li").removeClass("active").eq(index).addClass("active");
//	    $(".list li").eq(index).fadeIn(500).siblings("li").fadeOut(500);
//	  }
//	  
//	})
//
////$(function(){
////				
////				var li1 = $("#list1 li");
////				var li2 = $("#list2 li");
////				
////				//初始化显示第一张图
////				li1.addClass("normal");
////				li1.first().removeClass().addClass("hover");
////				
////				li2.addClass("hide");
////				li2.first().removeClass().addClass("show");
////				
////				//鼠标移入tab
////				li1.mouseover(function(){
////					//改变tab按钮的选中状态
////					li1.removeClass().addClass("normal");
////					$(this).removeClass().addClass("hover");
////					
////					//显示第index张图片
////					var index = $(this).index();
////					li2.removeClass().addClass("hide");
////					li2.eq(index).removeClass().addClass("show");
////					
////				})
////				
////				
////			})
////		</script>
////	</head>
////	<body>
////		<div id="tab">
////			<ul id="list1">
////				<li>tab1</li>
////				<li>tab2</li>
////				<li>tab3</li>
////			</ul>
////			<ul id="list2">
////				<li><img src="img/4.jpg"/></li>
////				<li><img src="img/5.jpg"/></li>
////				<li><img src="img/6.jpg"/></li>
////			</ul>
////			

	$(function(){
 			 var $_picn=$(".list li").length;
 			 console.log($_picn);
 			 
// 	初始状态		 
	  	$(".list2 li").eq(0).addClass("active");
	    $(".list li").eq(0).show().siblings(".list li").hide();
	    
	    
	    
		$(".list2 li").on("click",function(){
			
			
	  	 var index = $(this).index();
	  	 count = index ;
	  	$(this).addClass("active").siblings().removeClass("active");
	  	
	  	$(".list li").eq(index).fadeIn(500).siblings(" li").fadeOut(500);
	  	// console.log(index);
	  });
      
      var count = 0 ;
	  setInterval(function(){
	    show(count);
	    count++;
	    if(count==$_picn){count=0;}
	  },2000);  
	  
	  function show(count){
	    $(".list2 li").eq(count).addClass("active").siblings().removeClass("active");
	    $(".list li").eq(count).fadeIn(500).siblings("li").fadeOut(500);
	  }
	  
	})