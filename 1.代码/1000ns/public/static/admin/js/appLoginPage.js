var LoginPage = new Vue({
	el: '#LoginPage',
	data: { //数据
		LoginPageData:'',
		olderUlr:'',
	},
	created: function () { //data已注入 //JSON.stringify(response)
		this.olderUlr = old_url; //获取index模块地址
	},
})