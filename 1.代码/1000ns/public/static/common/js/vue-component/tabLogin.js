// 定义名为 todo-item 的新组件
Vue.component('tab-logincom', {
props: ['oldurl'],
data: function(){
	return {
		nameIn:'',//用户名
		passIn:'',//密码
		adwwwUrl:'',//地址
    }
},
methods: {
	loginCommit:function(){
		var licToSelf = this;
      	licToSelf.adwwwUrl = get_root_url('1');//获取模块地址
      	var licUrl = licToSelf.adwwwUrl+'LoginPage/login_check'; //拼接URL
      	axios_post_data(licUrl, [licToSelf.nameIn,licToSelf.passIn]).then(result => {
        	if (result.errCode == '000') {
        		console.log(result.errMsg+result.data.simple_name);
        		if (licToSelf.oldurl=='') {
        			url_new = get_root_url(6)+'index/Index/index';//原地址为空跳转首页
        		}else{
        			url_new = licToSelf.oldurl.replace(/&&/g,'/');//原地跳转
        		}
        		re_new_url (url_new, '1');
        		return
        	}
        	alert('errCode:'+result.errCode+',errMsg:'+result.errMsg);
    	});
	},
},
template:`
<div>
	<div class="nameInput centerDiplay">
		<input v-model="nameIn" placeholder="请输入用户名..." class="inputWords centerDiplay-sc">
	</div>
	<div class="nameInput centerDiplay">
		<input type="password" v-model="passIn" placeholder="请输入密码..." class="inputWords centerDiplay-sc">
	</div>
	<div class="selectInput">
		<div class="selectLeft centerDiplay-sc"><span class="fontSizeMyselfd slmouseOn">重置密码</span></div>
		<div class="selectRight centerDiplay-ec"><span class="fontSizeMyselfd slmouseOn">注册</span></div>
	</div>
	<div class="nameInput centerDiplay" v-on:click="loginCommit">
		<div class="inputWords loginCommit centerDiplay"><span class="fontSizeMyselfb">登&nbsp;&nbsp;&nbsp;录</span></div>
	</div>
</div>`
});