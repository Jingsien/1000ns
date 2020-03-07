var appIndex = new Vue({
	el: '#appIndex',
	data: { //数据
		isInfoMsgOn: 'none', //设置弹窗是否可见
		wwwIndexUrl: '', //index模块目录
		inputIfo:'', //搜索框输入值
		fisrPageImg: 'f1.jpg', //首页图片
		cCover: 'comCover.jpg',
		firstWebInfos: [ '0', '0', '0'], //网站库总量
		ifWebOn: ['书籍(本)', '诗歌(首)', '文章(篇)'], //展示条目
		bookHots: [
			{name: '论语', author: '孔子'},
			{name: '道德经', author: '老子'},
			{name: '离骚', author: '屈原'},
			{name: '水浒传', author: '施耐庵'}
		], //书籍推荐
	},
	created: function () { //data已注入 //JSON.stringify(response)
		this.wwwIndexUrl = get_root_url('1'); //获取index模块地址
	},
	methods: { //函数域
		searchBookinf: function () {
			var sbToSelf = this;
			var dtUrl = sbToSelf.wwwIndexUrl+'SearchInfo/index/book_name/'+sbToSelf.inputIfo;
			re_new_url(dtUrl, '2'); //新窗口打开链接
		}
	},
	mounted: function () { //实例被创建后执行
		var createdToSelf = this;
		var gatfwiUrl = createdToSelf.wwwIndexUrl + 'Index/f_get_data_first'; //URL拼接
		axios_post_data(gatfwiUrl,'').then(result => {
	    	var arrayLin = new Array(result[0].book_count,result[0].poetry_count,result[0].article)
	    	createdToSelf.firstWebInfos = arrayLin; //依次为书籍、诗歌、文章的数量
		});
	},
});