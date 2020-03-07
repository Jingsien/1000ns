function location_top (argument) { // 固定导航条
	var x="-"+ $(document).scrollLeft() +"px"; // 获取滚动条与左侧偏移px距离
	$(argument).css({"left":x}); // 设置上方固定导航条向左侧偏移
	$(window).scroll(function(){ // 监听滚动条滚动事件
		// 获取浏览器显示区域的高度 $(window).height();// 获取浏览器显示区域的宽度 $(window).width();
		// 获取页面的文档高度 $(document).height();// 获取页面文档宽度 $(document).width();
		// 获取滚动条到顶部的垂直高度 $(document).scrollTop();// 获取滚动条到左边的长度 $(document).scrollLeft();
		var x="-"+ $(document).scrollLeft() +"px"; // 获取滚动条与左侧偏移px距离
		$(argument).css({"left":x}); // 设置上方固定导航条向左侧偏移
	});
}

function talk_place (div_id_one, div_id_two) { //被appReadPage中mounted调用。固定导航条和中间评论区位置
	var x="-"+ $(document).scrollLeft() +"px";// 获取滚动条与左侧偏移px距离
	var y= $(document).scrollTop();// 获取滚动条向下滚动距离
	var div_two = $(div_id_two).height();// 记录评论区原始高度
	$(div_id_one).css({"left":x});// 设置上方固定导航条向左侧偏移
	$(window).scroll(function(){ // 监听滚动条滚动事件
		var x="-"+ $(document).scrollLeft() +"px";// 获取滚动条与左侧偏移px距离
		var y= $(document).scrollTop();// 获取滚动条向下滚动距离
		var w_height = $(window).height();// 获取显示区域窗口高度
		if ( y > 25 ) { //向下滚动距离小于25时，不做处理
			y = (y-25) + "px";
			w_height = (w_height-60) + "px";
			$(div_id_two).css({"top":y});
			$(div_id_two).css({"height":w_height});
		}else{
			$(div_id_two).css({"top":"0px"});
			$(div_id_two).css({"height":div_two});
		}
		$(div_id_one).css({"left":x});// 设置上方固定导航条向左侧偏移
	});
}

function txt_read (div_id, url_id) { // 文本文件读取 div_id显示文本的标签，url_id文本文件Url
	$.ajax({
		type: "POST",
		url: url_id,
		success: function(msg){
			$(div_id).html(msg);
		}
	});
}

async function axios_post_data (urlNum,dataNum) { // url+参数，异步查询结果值封装
	var dataReturn = null; // 中间变量用于存储匿名函数的返回值
	await axios.post(urlNum, { // await执行完毕后，执行后续代码
    	dataNum: dataNum, // 参数数组
  	})
  	.then(function (response) { // 取得返回值。console.log(JSON.stringify(response));
    	dataReturn = response.data;
  	})
  	.catch(function (error) {
    	console.log(error);
  	});
  	return dataReturn; //console.log(dataReturn);
}

function re_new_url (url_new, type) { //链接打开方式
	if ( type == "1") {
		window.location.href = url_new; //在本窗体打开一个新的页面
	} else {
		window.open(url_new); //在一个新的窗口打开一个新的页面
	}
}

function get_root_url ( type ) { // 地址返回函数
    var urlPath = window.document.location.href; //获取当前网址，如：http://localhost:8010/1000ns/public/index.php/index/DetailsInfo/index
    var pathName = window.document.location.pathname; //获取主机地址之后的目录，如：/1000ns/public/index.php/index/DetailsInfo/index
    var wwwLate = urlPath.indexOf(pathName); //主机地址后第一位所处位置，如21
    var localhostPaht = urlPath.substring(0, wwwLate); //获取主机地址，如：http://localhost:8010
    var mName = pathName.substring(0, pathName.substr(0).indexOf('index.php')+16); //获取index模块路径
    var pName = pathName.substring(0, pathName.substr(0).indexOf('public/')) + "public/static/"; //获取static目录
    if ( type == "1" ) {
    	return (localhostPaht + mName); //type=1,返回index目录
    }
    return (localhostPaht + pName); //返回static目录
}