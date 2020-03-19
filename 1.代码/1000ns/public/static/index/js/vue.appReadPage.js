var appReadPage = new Vue({
	el: '#appReadPage',
	data: { //数据
		isInfoMsgOn: 'none', //设置弹窗是否可见
		cpInformation: [],
		psUrl: '',
		wwwIndexUrl: '',
		chapterInfo: [[{}],[{'book_name':''}]],
	},
	created: function () { //data已注入

	},
	methods: { // 函数域
		getBookInfo: function () {
			var giToSelf = this;
			var csUrl = giToSelf.wwwIndexUrl+'ReadPage/get_book_info'; //拼接章节信息查询URL
			axios_post_data(csUrl, giToSelf.cpInformation).then(result => {
				giToSelf.chapterInfo = result;//console.log(giToSelf.chapterInfo[0][0].chapter_title);
			});
		},
	},
	//实例被创建后执行
	mounted: function(){
		this.psUrl = get_root_url('2'); //获取static目录地址
		this.wwwIndexUrl = get_root_url('1'); //获取static目录地址
		this.cpInformation = chapterInformation; //读取章节信息的全局变量
		talk_place('#arpmTopPlace','#arpmmrTalk'); //固定导航条
		var chapterUrl = this.psUrl+'bookList/'+this.cpInformation[0]+'/txt/'+this.cpInformation[1]+'/'+this.cpInformation[2]+'.txt'; //拼接章节URL 地址格式-> http://localhost:8010/1000ns/public/static/bookList/sj00000001/txt/1/1.txt
		txt_read('#arpmmlTxt', chapterUrl); //读取并显示章节内容
		this.getBookInfo();
	},
});