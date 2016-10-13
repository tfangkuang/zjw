
$(function(){ 
$('.tab-brand img').mouseenter(function(){ 
var wValue=1.2 * $(this).width(); 
var hValue=1.2 * $(this).height(); 
$(this).animate({width: wValue, 
height: hValue, 
}, 500); 
}).mouseleave(function(){ 
$(this).stop().animate({width: "280", 
height: "180", 
left:"0px", 
top:"0px"}, 500 ); 
}); 
}); 
