/*
2016年12月23日 威智网络 前端
*/
	// 窗口自适应，
	//20160826 对 rem 应用做了调整
function adjustrem(){
		if($(window).innerWidth() < 767){
			var fs = $(window).innerWidth()*100/320;
		}else{
			var fs = 320*100/320;
		}
		$('html').css('font-size',fs)
		
		//如果首页banner在，则自适应窗口变化首页banner的尺寸，如果不在则不执行
		if($(".index_banner").is(":visible") && $(window).height()>580){
			//浏览器窗口高度
			$(".index_banner").css({"height": "650px"});
		}else if($(".index_banner").is(":visible") && $(window).height()<580 ){
			//return false;
			$(".index_banner").css({"height": $(window).height()});
		}else{
			$(".index_banner").css({"height": "650px"});
		}
		//如果手机版首页轮播在，则自适应窗口变化开场动画的尺寸，如果不在则不执行
		//if($(".banner_index_phone").is(":visible") & $(window).height()>600){
//			//浏览器窗口高度
//			$(".banner_index_phone").css({"height": $(window).height()-$('.head-phone').height()});
//		}else{
//			//return false;
//			$(".banner_index_phone").css({"height": $(window).height()-$('.head-phone').height()});
//		}
			
		/*if ($(window).innerWidth() < 1200) {
			$('.pc').hide();
			$('.mobile').show();
		}else{
			$('.pc').show();
			$('.mobile').hide();
		}*/
};
$(function(){
	adjustrem();
});
window.onresize = adjustrem;
if ((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
	window.attachEvent("onresize",adjustrem);
};


