var AdminPage = new Vue({
	el: '#AdminPage',
	data: { //数据
		currentTab: 'chapterEdit', //当前显示组件
        tabs: [ //菜单组件->后续优化为，根据后台角色权限返回值
        	{'id':'newBook','name':'书籍新增'},
        	{'id':'bookEdit','name':'书籍修改'},
        	{'id':'chapterAdd','name':'章节新增'}, 
        	{'id':'chapterEdit','name':'章节修改'}
        ],
        userIfos: { simple_name:'未登录', user_img:'qnsgw.jpg' }, //用户信息
	},
	beforeCreate: function () { //beforeCreate, 实例被创建之前执行
	},
	watch: { //监听某个属性，这里是question01，为输入项
	},
	created: function () { //created 钩子可以用来在一个实例被创建之后执行代码，实例被创建后执行！此时data已加载
		if ( userIfo != null ) { this.userIfos = userIfo; } //当前为登录状态
	},
	mounted: function () { //console.log('页面加载完成后执行');
	},
	methods:{ //函数调用
	},
	computed: { //计算属性
	    reversedMessage: {
		    get: function () { //获取变更
		    },
		    set: function (newValue) { //发起变更
		    }
	    },
	    currentTabComponent: function () {
            return 'tab-' + this.currentTab.toLowerCase(); //toLowerCase() 方法用于将大写字符转换为小写
        },
	},
});