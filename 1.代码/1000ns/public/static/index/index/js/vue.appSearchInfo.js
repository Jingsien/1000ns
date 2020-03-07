var appSearchInfo = new Vue({
	el: '#appSearchInfo',
	data: { //数据
		isInfoMsgOn: 'none', //设置弹窗是否可见
		numberBooks: '26087', //搜索结果条数
		wwwIndexUrl: '', //index模块目录
		booksNameIp: '', //与搜索框输入值数据绑定
		postDataIp: [], //pot传输变量
		bookInfos:[], //查询结果响应式数据
	},
	created: function () { //data已注入

	},
	methods: {
		searchButton: function(){ //console.log();
			var msToSelf = this;
			msToSelf.postDataIp[0] = msToSelf.booksNameIp; //参数数据
			var searUrl = msToSelf.wwwIndexUrl + 'SearchInfo/searchBooks'; //拼接查询地址
			axios_post_data(searUrl, msToSelf.postDataIp).then(result => { //书籍搜索
	    		msToSelf.bookInfos = result; //响应式数据展示搜索结果
			});
		},
		detailsButton: function (fu) { //查看详情
			var dbToSelf = this;
			var dtUrl = dbToSelf.wwwIndexUrl+'DetailsInfo/index/book_id/'+fu.book_id+'/chapter_roll_all/'+fu.chapter_roll_all;
			re_new_url(dtUrl, '2'); //新窗口打开链接
		}
	},
	mounted: function(){ //实例被创建后执行
		this.wwwIndexUrl = get_root_url('1'); //获取index模块地址
		location_top('#asimTopPlace'); //固定导航条
		this.booksNameIp = searchInfo;
		this.searchButton();
	},
});