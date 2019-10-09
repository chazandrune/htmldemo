
mui.ready(function(){
	mui('.mui-scroll-wrapper').scroll({
		indicators:true //显示滚动条
	});
	
	//让a链接href生效
	mui('body').on('tap','a',function(e){
		var hrefa = this.getAttribute('data-href');
		if(hrefa!= null){
			window.location.href=hrefa;
		}
	});
	
});
