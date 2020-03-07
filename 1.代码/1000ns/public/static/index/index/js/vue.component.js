// 定义名为 todo-item 的新组件
Vue.component('todo-item-n1', {
	template: '<li>列表一</li>'
});

Vue.component('todo-item-n2', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义特性。
  // 这个 prop 名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  methods:{
  	butOne: function(){
  		alert("1");
  	},
  },

  template: '<div><button v-on:click="count++">You clicked me {{ count }} times.</button><button v-on:click="butOne"></button></div>'
})

Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})

// 简单的表格组件
Vue.component('tab-posts', {
    data: function () {
        return {
            posts: [
                {
                    id: 1,
                    title: '赶在618前夕，微信更新了两个支付与电商功能',
                    content: '本周末，中国消费者即将迎来上半年最大的消费网购峰值，6月17日父亲节，6月18日端午节，也是京东、天猫等电商的618购物节。略微出人意料但又在情理之中的是，中国最大的社交平台微信，近日密集上线了两个与支付和电商相关的功能。'
                },
                {
                    id: 2,
                    title: '腾讯要花32亿收购《绝地求生》开发商10%股份',
                    content: '目前腾讯和蓝洞已经接近达成协议，如果交易成功，腾讯将成为蓝洞的第二大股东。'
                },
                {
                    id: 3,
                    title: '这两个地球之眼是真的吗？形成原因至今仍是谜团',
                    content: '一名俄罗斯男子乘坐直升机游览时，经过俄罗斯萨哈林岛（库页岛）时，看到一个巨大的坑洞。地球上坑坑洞洞很多，本该不用大惊小怪。但当飞机离得更近，换了个角度看这个坑时，他震惊了，这分明就是“地球的眼睛”。'
                }
            ],
            selectedPost: null
        }
    },
    template: `
        <div class="posts-tab">
            <ul class="posts-sidebar">
                <li
                    v-for="post in posts"
                    v-bind:key="post.id"
                    v-bind:class="{selected:post === selectedPost}"
                    v-on:click="selectedPost = post">
                    {{ post.title }}
                </li>
            </ul>
            <div class="selected-post-container">
                <div
                    v-if="selectedPost"
                    class="selected-post">
                    <h3>{{ selectedPost.title }}</h3>
                    <div v-html="selectedPost.content"></div>
                </div>
                <strong v-else>
                    请点击某个标签页
                </strong>
            </div>
        </div>
    `
});

Vue.component('tab-archive', {
    template: `
    	<div>archive 页面1''</div>
    `
});