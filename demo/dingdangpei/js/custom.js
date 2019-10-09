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

//计算器弹窗函数
function tanchujisuan(){
	var jisuan = layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		area: ['550px', 'auto'],
		shade: [0.5, '#000'],
		skin: 'layui-layer-custom',
		shadeClose: true,
		scrollbar: false,
		shift:0,
		content: $('#tc-jisuan'),
		zIndex:9999
	});
	$('.tc-closebtn').on('click',function(){
		layer.close(jisuan);
	})
}

//计算价格函数
function jisuan(){
	var yusu = 3.5;
	var rank = $('#jisuan-rank').val();
	var type = $('#jisuan-type').val();
	var num = $('#jisuan-num').val();
	var time_m = parseInt(num/(yusu*60));
	if(!isNaN(num)){ /*判断填写为数字*/
		if(num/(yusu*60)>=1){  /*判断大于等于1分钟*/
			var time_s = parseInt((num/(yusu*60) - time_m)*60);
			if(time_s!=0){  /*判断秒位为0*/
				$('#result-time').html(time_m+'分'+time_s+'秒'); /*输出时长*/
			}else{  /*判断秒位不为0*/
				$('#result-time').html(time_m+'分'); /*输出时长*/
			}
			$('#result-price').html(((rank*num/(yusu*60))*type).toFixed(2)+'元');
			$('#result-point').html(parseInt((rank*num/(yusu*60))*type));
		}else if(num/(yusu*60)>0){  /*判断少于1分钟*/
			var time_s = num/yusu;
			$('#result-time').html(time_s.toFixed(2)+'秒'); /*输出时长*/
			if(time_s>=30){  /*判断大于等于30秒*/
				$('#result-price').html(200*type+'元');
				$('#result-point').html(parseInt(200*type));
			}else{  /*判断少于30秒*/
				$('#result-price').html(100*type+'元');
				$('#result-point').html(parseInt(100*type));
			}
		}else{
			var time_s = num/yusu;
			$('#result-time').html(time_s.toFixed(2)+'秒'); /*输出时长*/
			$('#result-price').html(0*type+'元');
			$('#result-point').html(parseInt(0*type));
		}
	}
}


//新增了联系信息弹窗函数
function tanchuadd(){
	var add = layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		area: ['850px', 'auto'],
		shade: [0.5, '#000'],
		skin: 'layui-layer-custom',
		shadeClose: true,
		scrollbar: false,
		shift:0,
		content: $('#tc-add'),
		zIndex:9999
	});
	$('.tc-closebtn').on('click',function(){
		layer.close(add);
	})
}

//使用积分函数
function usepoint(t){
	var rate = parseInt(t.attr('rate'));
	var money = t.val()/rate;
	if(!isNaN(t.val())){
		if(t.val()>0){
			t.parent().find(".val").html(money);
		}else{
			t.parent().find(".val").html('0.00');
		}
	}else{
		t.parent().find(".val").html('0.00');
	}
}

//输入框最大数值函数
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
/* 鼠标悬停箭头按钮显示 */
$(".side_slide").hover(function(){
	$(this).find(".arrow").addClass('arrow_show');
},function(){
	$(this).find(".arrow").removeClass('arrow_show');
});
$(".side_slide").slide({
	titCell: ".hd ul",
	autoPage: true,  //是否使用自动显示分页
	mainCell:".bd ul",
	targetCell:"", //table选项卡的 更多 时用
	autoPlay:true,
	effect:"leftLoop",   //特效left,leftLoop,topLoop,top,fold,fade（支持响应窗口大小）,
	easing:"easeOutCirc",  //缓动效果 easeInQuint,easeInBack,easeOutBounce,easeOutElastic
	trigger:"mouseover",   //触发方式  mouseover,click
	delayTime:1000,  //延迟时间
	interTime:5000,  //间隔时间
	pnLoop:true,   //前后按钮循环，默认true
	mouseOverStop:true   //鼠标经过停止播放，默认true
});


//关闭广告js
$(function(){
	$('.ad .closead').click(function(){
		$(this).parent().slideUp();
	});
})


// 浮动搜索
$(function(){

    // 滚动监测
    if (window.innerWidth > 700) {
        window.onscroll = function() {
            var scroll_top_now = $(window).scrollTop(); //当前滚动条距离
            var scroll_top_start = 200;                 //滚动条触发事件的距离
            //二级菜单浮动
            if (scroll_top_now > scroll_top_start) {
                $(".search_fixed").addClass("show");
				$(".item_top").slideDown();
            } else {
                $(".search_fixed").removeClass("show");
				$(".item_top").slideUp();
            };			
			
        };
    }

	// 回到顶部
    $(".item_top").click(function() {
        $("html,body").animate({scrollTop: 0}, 600);
    });

})

//音频播放器js
$( function(){
	$( '.audio-big' ).audioPlayer({
		classPrefix: 'audioplayer-big',
		strPlay: '播放',
		strPause: '暂停',
		strVolume: '音量'
	});
	$( '.audio-middle' ).audioPlayer({
		classPrefix: 'audioplayer-middle',
		strPlay: '播放',
		strPause: '暂停',
		strVolume: '音量'
	});
	$( '.audio-small' ).audioPlayer({
		classPrefix: 'audioplayer-small',
		strPlay: '播放',
		strPause: '暂停',
		strVolume: '音量'
	});
});



//下拉菜单美化js
$(function(){
	$('.select').select2({
		minimumResultsForSearch: Infinity,
	});
})















