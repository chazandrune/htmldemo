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

//视频弹窗函数
function tanchuvideo(){
	var video = layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		area: ['720px', 'auto'],
		shade: [0.8, '#000'],
		skin: 'layui-layer-custom',
		shadeClose: true,
		scrollbar: true,
		shift:5,
		content: $('#tc-video'),
		zIndex:9999
	});
	$('.tc-closebtn').on('click',function(){
		layer.close(video);
	})
}


/*
默认执行
*/


// 浮动搜索
$(function(){

    // 滚动监测
    if (window.innerWidth > 700) {
        window.onscroll = function() {
            var scroll_top_now = $(window).scrollTop(); //当前滚动条距离
            var scroll_top_start = 100;                 //滚动条触发事件的距离
            //二级菜单浮动
            if (scroll_top_now > scroll_top_start) {
                $(".head").addClass("scroll");
				$(".item_top").slideDown();
            } else {
                $(".head").removeClass("scroll");
				$(".item_top").slideUp();
            };			
			
        };
    }

	// 回到顶部
    $(".item_top").click(function() {
        $("html,body").animate({scrollTop: 0}, 600);
    });
	
	
	//右侧漂浮触发
	$('.fixed_box1 .item_a').hover(function(){
		$(this).addClass('on');
	},function(){
		$(this).removeClass('on');
	})
	
	//左侧固定
	$(".pinned").pin({
		containerSelector: ".leftandright", 
		minWidth: 980,
		offset:100
	});

})
















