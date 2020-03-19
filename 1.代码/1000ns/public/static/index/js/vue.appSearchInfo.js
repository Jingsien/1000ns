var appSearchInfo = new Vue({
	el: '#appSearchInfo',
	data: { //数据
		isInfoMsgOn: 'none', //设置弹窗是否可见
		numberBooks: '0', //搜索结果条数
		wwwIndexUrl: '', //index模块目录
		booksNameIp: '', //与搜索框输入值数据绑定
		postDataIp: [], //pot传输变量
		bookInfos:[], //查询结果响应式数据
		bookInfos_r:[], //查询结果响应式数据
		isDis_on: true,
		isDis_no: false,
		noSearchOn: 'none',
	},
	created: function () { //data已注入

	},
	methods: {
		searchButton: function(){ //搜索点击按钮。console.log();
			var msToSelf = this;
			msToSelf.postDataIp[0] = msToSelf.booksNameIp; //参数数据
			var searUrl = msToSelf.wwwIndexUrl + 'SearchInfo/searchBooks'; //拼接查询地址
			axios_post_data(searUrl, msToSelf.postDataIp).then(result => { //书籍搜索
	    		msToSelf.bookInfos = result; //响应式数据展示搜索结果
	    		// 查询推荐.查询结果不满足6条时，查询推荐内容，补齐6条
	    		var sResultLength = msToSelf.bookInfos.length; //获取查询结果数量
	    		msToSelf.numberBooks = sResultLength;//响应式更新查询结果数量
	    		msToSelf.noSearchOn = 'none';//隐藏无查询结果的图标
				if ( sResultLength > 5 ) {//判断
					msToSelf.isDis_on = true;
					msToSelf.isDis_no = false;
					msToSelf.bookInfos_r = [];//设置推荐项为空
					return
				}
				if (sResultLength == 0) { //查询结果为0显示 nosearch
					msToSelf.noSearchOn = 'block';
				}
				msToSelf.isDis_on = false;
				msToSelf.isDis_no = true;
				sResultLength = 6 - sResultLength;
				msToSelf.getRecommend(sResultLength);//传入参数为需要查询的推荐数量
			});
		},
		getRecommend: function(nu){ //查询推荐内容
			var grToSelf = this;
			var sLimit = [];
			sLimit[0] = nu;
			var searrUrl = grToSelf.wwwIndexUrl + 'SearchInfo/searchRecommend'; //拼接查询地址
			axios_post_data(searrUrl, sLimit).then(result => { //书籍搜索
	    		grToSelf.bookInfos_r = result; //响应式数据展示搜索结果
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