var appIndex = new Vue({
	el: '#appIndex',
	data: { //数据
		isInfoMsgOn: 'none', wwwIndexUrl: '', /*设置弹窗是否可见*/ /*index模块目录*/
		inputIfo: '', fisrPageImg: 'f1.jpg', /*搜索框输入值*/ /*首页图片*/
		cCover: 'comCover.jpg', firstWebInfos: [ '0', '0', '0'], //网站库总量
		ifWebOn: [ '书籍(本)', '诗歌(首)', '文章(篇)' ], //展示条目
		bookHots: [
			{ name:'西游记', author:'吴承恩' }, { name:'三国演义', author:'罗贯中' }, { name:'红楼梦', author:'曹雪芹' } ,{ name:'水浒传', author:'施耐庵' }
		], //书籍推荐->后期优化为从后台获取，并实现换一换功能
		userIfos: { simple_name:'未登录', user_img:'qnsgw.jpg' }, /*用户信息*/ 
		ueronYes: false, /*用户是否登录*/
	},
	created: function () { //data已注入 //JSON.stringify(response)
		this.wwwIndexUrl = get_root_url( '1' ); //获取index模块地址
		if ( userIfo != null ) { this.userIfos = userIfo; } //当前为登录状态
	},
	methods: { //函数域
		searchBookinf: function () {//单击查询按钮
			re_new_url( sbToSelf.wwwIndexUrl + 'SearchInfo/index/book_name/' + sbToSelf.inputIfo, '2'); //新窗口打开链接
		},
		loginCommitIndex: function () {//未登录按钮单击
			if ( this.userIfos.simple_name == '未登录' ) {//未登录时跳转新页面，已登录则不作处理
				var myurl = ( this.wwwIndexUrl + 'Index/index' ).replace( /\//g, '&&' );//传入旧网址，以&&替换/
				re_new_url( get_root_url( '6' ) + 'admin/LoginPage/index/comvar/' + myurl, '1'); //本窗口打开链接
			}
		},
		ueronYesList: function () { //mouseover:不论鼠标指针穿过被选元素或其子元素,都会触发 mouseover;只有在鼠标指针离开被选元素时，才会触发 mouseleave 事件。
			if ( this.userIfos.simple_name != '未登录' ) {
				this.ueronYes = true; //已登录状态，鼠标经过显示下拉列表
			}
		},
		ueronYesListNo:function () {//鼠标离开控件
			this.ueronYes = false; //鼠标离开时，收起下拉列表
		},
		loginOut: function () { //退出登录->单击触发事件
			var lioToSelf = this; //指向自身
			axios_post_data( get_root_url( '6' ) + 'admin/LoginPage/login_out', '' ).then( result => {
				console.log( result.errMsg ); //打印信息
				if ( result.errCode == '000' ) {//退出成功
					lioToSelf.userIfos = { simple_name:'未登录', user_img:'qnsgw.jpg' };//设置未登录显示信息
					lioToSelf.ueronYes = false; //设置下拉框隐藏
				}
			});
		},
		userCenter: function () { //用户中心->单击触发事件
			re_new_url( get_root_url( '6' ) + 'admin/AdminPage/index', '2' ); //新窗口打开页面
		},
	},
	mounted: function () { //实例被创建后执行
		var createdToSelf = this; //指向自身
		axios_post_data( createdToSelf.wwwIndexUrl + 'Index/f_get_data_first', '' ).then( result => {//查询首页展示信息
	    	createdToSelf.firstWebInfos = [ result[0].book_count, result[0].poetry_count, result[0].article ]; //依次为书籍、诗歌、文章的数量
		});
	},
});