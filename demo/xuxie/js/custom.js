/*
2015年8月19日 威智网络 前端
*/
/**
* 图片头数据加载就绪事件 - 更快获取图片尺寸
* @param{String}图片路径
* @param{Function}尺寸就绪
* @param{Function}加载完毕 (可选)
* @param{Function}加载错误 (可选)
* @example imgReady('url', function () {
alert('size ready: width=' + this.width + '; height=' + this.height);
});
*/
var imgReady = (function() {
    var list = [],
    intervalId = null,
    // 用来执行队列
    tick = function() {
        var i = 0;
        for (; i < list.length; i++) list[i].end ? list.splice(i--, 1) : list[i]();

        ! list.length && stop();
    },
    // 停止所有定时器队列
    stop = function() {
        clearInterval(intervalId);
        intervalId = null;
    };
    return function(url, ready, load, error) {
        var onready, width, height, newWidth, newHeight, img = new Image();

        img.src = url;
        if (img.complete) { // 如果图片被缓存，则直接返回缓存数据
            ready.call(img);
            load && load.call(img);
            return;
        };
        width = img.width;
        height = img.height;
        // 加载错误后的事件
        img.onerror = function() {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };
        // 图片尺寸就绪
        onready = function() {
            newWidth = img.width;
            newHeight = img.height;
            console.log(newWidth + ',' + newHeight);
			if (newWidth !== width || newHeight !== height || newWidth * newHeight > 1024) { // 如果图片已经在其他地方加载可使用面积检测
                ready.call(img);
                onready.end = true;
            };
        };
        onready();

        // 完全加载完毕的事件
        img.onload = function() {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            ! onready.end && onready();

            load && load.call(img);

            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };

        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
})();



/*
函数定义
*/

//动态加载css/js函数
var dynamicLoading = {
    css: function(path){
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function(path){
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
}

//微信弹窗函数
function tanchuweixin(){
	var tcweixin = layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		area: ['auto', 'auto'],
		shade: [0.5, '#fff'],
		skin: 'layui-layer-custom',
		shadeClose: true,
		scrollbar: true,
		shift:0,
		content: $('#tc-weixin'),
		zIndex:9999
	});
	$('.tc-closebtn').on('click',function(){
		layer.close(tcweixin);
	})
}

//登录弹窗函数
function tanchudenglu(){
	var denglu = layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		offset:"0px",
		area: ['490px', 'auto'],
		shade: [0.5, '#fff'],
		skin: 'layui-layer-custom',
		shadeClose: false,
		scrollbar: true,
		move:'.bt',
		moveType: 1,
		shift:1,
		content: $('#tc-denglu'),
		zIndex:9999
	});
	$('.tc-closebtn').on('click',function(){
		layer.close(denglu);
	})
}

//登录意见反馈函数
function tanchufeedback(){
	var feedback = layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		offset:'rb',
		area: ['600px', 'auto'],
		shade: [0.5, '#fff'],
		skin: 'layui-layer-custom',
		shadeClose: true,
		scrollbar: true,
		move:'.bt',
		moveType: 1,
		shift:2,
		content: $('#tc-feedback'),
		zIndex:9999
	});
	$('.tc-closebtn').on('click',function(){
		layer.close(feedback);
	})
}


//添加地址弹窗函数
function tanchuaddress(){
	var address = layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		offset:"0",
		area: ['660px', 'auto'],
		shade: [0.5, '#fff'],
		skin: 'layui-layer-custom',
		shadeClose: false,
		scrollbar: true,
		move:'.bt',
		moveType: 1,
		shift:1,
		content: $('#tc-address'),
		zIndex:9999
	});
	$('.tc-closebtn').on('click',function(){
		layer.close(address);
	})
}

/*输入数值上限限制函数*/
function MaxScore(e){
	var max_score = parseInt(e.attr('maxscore'));
	var cur_score = e.val();
	if(!isNaN(cur_score)){
		if(cur_score > max_score){
			e.val(max_score);
		} else {}
	} else {
		e.val('');
		}
}




/*
默认执行
*/
$(function(){
	/* 懒加载 */
	$("img.lazy").lazyload({
		effect:'fadeIn'
	})

	/* 自定义的触发下拉 */
	$('.dropdown').hover(function(){
		$(this).addClass('hover');
		$(this).find('.dropdown-layer').stop(true,true).slideDown(100);
	},function(){
		$(this).removeClass('hover');
		$(this).find('.dropdown-layer').stop(true,true).slideUp(00);
	})
	
	//关闭广告js
	$('.ad .closead').click(function(){
		$(this).parent().slideUp();
	});
	
	//鼠标悬停出现hints
	$('.icohint').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});

	/*调用输入数值上限限制函数*/
	$('textarea[maxscore]').on('keyup',function(){
		MaxScore($(this));
	});
	$('textarea[maxscore]').on('blur',function(){
		MaxScore($(this));
	});
	$('input[maxscore]').on('keyup',function(){
		MaxScore($(this));
	});
	$('input[maxscore]').on('blur',function(){
		MaxScore($(this));
	});
	$.each($('textarea[maxscore]'),function(i,n){
		MaxScore($(this));
	});
	$.each($('input[maxscore]'),function(i,n){
		MaxScore($(this));
	});

})





// 浮动搜索
$(function(){

    // 滚动监测
    if (window.screen.width > 700) {
        window.onscroll = function() {
            var scroll_top_now = $(window).scrollTop(); //当前滚动条距离
            var scroll_top_start = 120; //滚动条触发事件的距离
            //顶部浮动
            if (scroll_top_now > scroll_top_start) {
                //$(".submenu").addClass("fixed");
				$(".item_top").slideDown();
            } else {
                //$(".submenu").removeClass("fixed");
				$(".item_top").slideUp();
            };
			
        };
    }
	// 平滑滚动到锚链接
    $("a.maolink").click(function() {
        var scroll = $($(this).attr("href")).offset().top - 90;
        $("html,body").animate({scrollTop: scroll}, 700);
        //return false;
    });
	
	// 回到顶部
    $(".item_top").click(function(){
        $("html,body").animate({scrollTop: 0}, 600);
    });
	//右侧漂浮触发
	$('.item_open').hover(function(){
		$(this).toggleClass('on');
	},function(){
		$(this).toggleClass('on');
	})
	
	/*icheck js*/	
	/*$('input.icheck').iCheck({
		checkboxClass: 'icheckbox_flat-red',
		radioClass: 'iradio_flat-red'
	});
	$('input.icheck2').iCheck({
		checkboxClass: 'icheckbox_flat-red2',
		radioClass: 'iradio_flat-red2'
	});*/


})



/*单选js*/
$(function(){
	$('.radio_box input').each(function(){
		if($(this).attr('checked')){
			$(this).next().addClass('current');
		}
	})
	$('.radio_box .radio_item').click(function(){
		if($(this).hasClass('open')){
			$('#'+$(this).attr('open1')).show();
			$('#'+$(this).attr('open2')).show();
		}else{
			$('#'+$(this).attr('open1')).hide();
			$('#'+$(this).attr('open2')).hide();
		}
		$(this).prev().attr('checked',true);
		$(this).parent().parent().find('.radio_item').removeClass('current');
		$(this).addClass('current');
		return false;
	});		
});



//下拉菜单美化js
/*$(function(){
	$('.select').select2({
		minimumResultsForSearch: Infinity,
	});
})*/















