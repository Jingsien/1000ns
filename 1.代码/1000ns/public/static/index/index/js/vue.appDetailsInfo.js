var appDetailsInfo = new Vue({
	el: '#appDetailsInfo',
	data: { //数据
		isInfoMsgOn: 'none', //设置弹窗是否可见
		postDataIp: [], //post输入
		bookchrs: [[{}]], //章节信息
		wwwIndexUrl: '', //index模块地址
		bookInfos:[{'book_id':'sj00000001'}],
	},
	created: function () { //data已注入

	},
	methods: { // 函数域
		searchChapter: function () { //查询章节信息
			var msToSelf = this;
			msToSelf.postDataIp = bookidall; //全局变量，存储book_id和卷数
			var csUrl = msToSelf.wwwIndexUrl+'DetailsInfo/search_chapter'; //拼接章节信息查询URL
			axios_post_data(csUrl, msToSelf.postDataIp).then(result => {
	    		msToSelf.bookchrs = result[0];
	    		msToSelf.bookInfos = result[1];
			});
		},
		chapterOnclick: function (fu) { //章节跳转 http://localhost:8010/1000ns/public/index.php/index/ReadPage/index			
			var coToSelf = this;
			var chapterUrl = coToSelf.wwwIndexUrl+'ReadPage/index/bookid/'+fu.book_id+'/chapterroll/'+fu.chapter_roll+'/chapter_id/'+fu.chapter_id; //拼接章节地址
			re_new_url(chapterUrl, '2'); //链接打开
		},
	},
	mounted: function(){ //实例被创建后执行
		this.wwwIndexUrl = get_root_url('1'); //获取index模块地址
		location_top('#adimTopPlace'); //固定导航条
		this.searchChapter(); //查询章节信息
	},
});