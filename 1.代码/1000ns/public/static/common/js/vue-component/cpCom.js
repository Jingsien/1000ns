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
