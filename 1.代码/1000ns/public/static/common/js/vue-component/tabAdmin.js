// tab：tab-newbook
Vue.component('tab-newbook', { //新增书籍
  data: function(){
    return {
      posts: ['testInput'],
      inputInfo: [
        {'name':'名称:','type':'1'},{'name':'作者:','type':'1'},{'name':'总卷数:','type':'1'},{'name':'简介:','type':'2'}
      ],//前台展示输入项
      returnInfo: '',//后台返回结果
      bookInfos:[],//输入值
      adwwwUrl:'',//admin模块目录
      typeSelected:'sj',//新增类型选择
      typeOptions: [
        { text: '书籍', value: 'sj' },
        { text: '诗歌', value: 'sg' },
        { text: '文章', value: 'wz' }
      ]
    }
  },
  methods:{
    addBook: function(){ //提交按钮调用函数
      var abToSelf = this;
      abToSelf.adwwwUrl = get_root_url('1');//获取模块地址
      var abUrl = abToSelf.adwwwUrl+'AdminPage/book_input'; //拼接URL
      //[0]:名称、[1]:作者、[2]:卷数、[3]:简介、[4]:类型sj\wz\sg
      abToSelf.bookInfos[4] = abToSelf.typeSelected;
      var isnum = /^\d+$/.test(abToSelf.bookInfos[2]);
      if (!isnum) {
        alert('卷数需输入数字!');
        return
      }
      if (abToSelf.bookInfos[0]=='' || abToSelf.bookInfos[1]=='' || abToSelf.bookInfos[0]== null || abToSelf.bookInfos[1]== null) {
        alert('名称及作者均不能为空!');
        return
      }
      axios_post_data(abUrl, abToSelf.bookInfos).then(result => {
        abToSelf.returnInfo = result;
        if (abToSelf.returnInfo.error == '001') {
          alert('新增失败，已存在该信息!');
        }
      });
    },
  },
  template:`
    <div>
      <div class="tnbTopLine centerDiplay-sc">
        <div class="tnbtTxt centerDiplay borderBnone"><span class="fontSizeMyself1">请选择内容类型：</span></div>
        <select v-model="typeSelected" class="tnbSelect borderBnone">
          <option v-for="option in typeOptions" v-bind:value="option.value" class="fontSizeMyself1">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="tnbItemBox">
         <div v-for="(item,index) in inputInfo" v-bind:class="['tnbItem',{tnbItem2:item.type==2},{tnbItem3:(index+1)%3==0}]">
          <div class="centerDiplay borderBnone" v-bind:class="['tnbTxtname',{tnbTxtname2:item.type==2}]">
            <span class="fontSizeMyself1">{{item.name}}</span>
          </div>
          <input class="tnbInputtxt borderBnone" v-model="bookInfos[index]" placeholder="" v-if="item.type==1">
          <textarea class="tnbInputtxtLong borderBnone" v-model="bookInfos[index]" placeholder="" v-if="item.type==2"></textarea>
          <div class="clearFloat"></div>
        </div>
        <div class="clearFloat"></div>
      </div>
      <div class="tnbOneline centerDiplay-ec">
        <div v-on:click="addBook" class="tnbBt1 centerDiplay"><span class="fontSizeMyselfe">提交</span></div>
      </div>
    </div>  
  `
});

//tab组件：tab-bookedit
Vue.component('tab-bookedit', {
  data: function(){
    return {
      posts: ['testInput'],
      inputInfo: [
        {'name':'名称:','type':'1', 'tyb':'mc'},{'name':'作者:','type':'1', 'tyb':'zc'},{'name':'总卷数:','type':'1', 'tyb':'zc'},
        {'name':'上传:','type':'1', 'tyb':'zc'},{'name':'校对:','type':'1', 'tyb':'zc'},{'name':'总字数:','type':'1', 'tyb':'zc'},
        {'name':'简介:','type':'2', 'tyb':'zc'}
      ],//前台展示输入项
      tctRequestAnswer: '请输入书籍名称',//输入提示信息
      tctRequestAnswerOn:'none',//结果展示框是否显示
      tctInputRequest: [],//书籍搜索请求数组
      tctReturn:[],//列表展示搜索结果
      tctSelectBook: '',//书籍搜索输入框
      returnInfo: '',//后台返回结果
      bookInfos:[],//输入值
      adwwwUrl:'',//admin模块目录
      typeSelected:'sj',//新增类型选择
      typeOptions: [
        { text: '书籍', value: 'sj' },
        { text: '诗歌', value: 'sg' },
        { text: '文章', value: 'wz' }
      ]
    }
  },
  watch: {// 如果 `tctSelectBook` 发生改变，这个函数就会运行
    tctSelectBook: function (newQuestion, oldQuestion) { //监听书名输入变化
      //this.tctSelectBook = this.tctSelectBook.replace(/(^\s*)|(\s*$)/g, ""); //去两端空格
      if (this.tctSelectBook.length == 0 || this.tctSelectBook.replace(/(^\s*)|(\s*$)/g, "") == '') {
        this.tctRequestAnswer = '输入不能为空！'; return
      }
      this.tctRequestAnswer = '正在输入...';
      this.debouncedGetAnswer();//执行延时函数
    }
  },
  created: function () {//组件创建后data已加载
    this.debouncedGetAnswer = _.debounce(this.getBookName, 800);//延时500ms执行
  },
  methods:{
    getBookName: function () {//获取数据
      var gbnToSelf = this;
      gbnToSelf.adwwwUrl = get_root_url('1');//获取模块地址
      gbnToSelf.tctInputRequest[0] = gbnToSelf.tctSelectBook;//请求值为书籍名称
      var gbnUrl = gbnToSelf.adwwwUrl+'AdminPage/chapter_search_ad'; //拼接URL
      axios_post_data(gbnUrl, gbnToSelf.tctInputRequest).then(result => {
        gbnToSelf.tctReturn = result;
        if(gbnToSelf.tctReturn.length == 0){
          gbnToSelf.tctRequestAnswer = '查询结果为空';
          return
        }
        this.tctRequestAnswer = '请在下面列表中选择：';
      });
    },
    blurTctInput: function(){//输入框失去焦点
      var btiToSelf = this;
      var stmout = setTimeout(function(){
        btiToSelf.tctRequestAnswerOn='none';//输入框失去焦点后，显示提示内容
      }, 150);
    },
    focusonTctInput: function(){//输入框获取焦点
      var ftiToSelf = this;
      ftiToSelf.tctRequestAnswerOn='block';//输入框获取焦点后，显示提示内容
    },
    tctfnSelect: function(item){//书籍选择事件
      var tfsToSelf = this;
      tfsToSelf.txtBookId = item.book_id;//书籍ID
      //查询选中书籍详细信息
      var tfcUrl = tfsToSelf.adwwwUrl+'AdminPage/book_info_details'; //拼接URL
      axios_post_data(tfcUrl, tfsToSelf.txtBookId).then(result => {//获取卷信息
        tfsToSelf.bookInfos = [result[0].book_id,result[0].book_author,result[0].chapter_roll_all,
          result[0].up,result[0].check_man,result[0].words_all,result[0].brief];
      });
    },
    editBook: function(){ //提交按钮调用函数
      var abToSelf = this;
      abToSelf.adwwwUrl = get_root_url('1');//获取模块地址
      var abUrl = abToSelf.adwwwUrl+'AdminPage/book_update'; //拼接URL
      //依次为：bookId、作者、总卷数、上传人、校对人、总字数、简介、名称
      abToSelf.bookInfos[abToSelf.bookInfos.length] = abToSelf.tctSelectBook;
      var isnum = /^\d+$/.test(abToSelf.bookInfos[2]);
      if (!isnum) {
        alert('卷数需输入数字!');
        return
      }
      if (abToSelf.bookInfos[1]=='' || abToSelf.bookInfos[3]=='' || abToSelf.bookInfos[1]== null || abToSelf.bookInfos[3]== null ||
       abToSelf.bookInfos[4]=='' || abToSelf.bookInfos[5]=='' || abToSelf.bookInfos[4]== null || abToSelf.bookInfos[5]== null ||
       abToSelf.bookInfos[6]=='' || abToSelf.bookInfos[7]=='' || abToSelf.bookInfos[6]== null || abToSelf.bookInfos[7]== null 
        ) {
        alert('不能有空值!');
        return
      }
      axios_post_data(abUrl, abToSelf.bookInfos).then(result => {//获取更新结果
        abToSelf.returnInfo = result;
        if (abToSelf.returnInfo.error=='000') {
          console.log(abToSelf.returnInfo.st);
          return
        }
        console.log('更新失败!');
      });
    },
  },
  template:`
    <div>
      <div class="tnbTopLine centerDiplay-sc" style="height:15px;">
      </div>
      <div class="tnbItemBox">
         <div v-for="(item,index) in inputInfo" v-bind:class="['tnbItem',{tnbItem2:item.type==2},{tnbItem3:(index+1)%3==0}]">
          <div class="centerDiplay borderBnone" v-bind:class="['tnbTxtname',{tnbTxtname2:item.type==2}]">
            <span class="fontSizeMyself1">{{item.name}}</span>
          </div>
          <input class="tnbInputtxt borderBnone" v-model="bookInfos[index]" placeholder="" v-if="item.type==1 && item.tyb=='zc'">
          <input class="tnbInputtxt borderBnone" v-model="tctSelectBook" @blur="blurTctInput" @focus="focusonTctInput" v-if="item.tyb=='mc'">
          <div v-bind:style="{display:tctRequestAnswerOn}" class="tbeRequestAnswer borderBnone" v-if="item.tyb=='mc'">
            <div class="tctRaItem centerDiplay-sc" style="padding-left:5px;"><span class="fontSizeMyself1">{{tctRequestAnswer}}</span></div>
            <div class="tctRaItem tctRaItem2" v-for="item in tctReturn" v-on:click="tctfnSelect(item)">
              <div class="tctRaIname centerDiplay-sc"><span class="fontSizeMyself1 overflow-c2">《{{item.book_name}}》</span></div>
              <div class="tctRaIauthor centerDiplay-ec"><span class="fontSizeMyself3 overflow-c2">作者：{{item.book_author}}&nbsp;&nbsp;</span></div>
            </div>
          </div>
          <textarea class="tnbInputtxtLong borderBnone" v-model="bookInfos[index]" placeholder="" v-if="item.type==2"></textarea>
          <div class="clearFloat"></div>
        </div>
        <div class="clearFloat"></div>
      </div>
      <div class="tnbOneline centerDiplay-ec">
        <div v-on:click="editBook" class="tnbBt1 centerDiplay"><span class="fontSizeMyselfe">提交</span></div>
      </div>
    </div>  
  `
});

//tab组件：tab-chapteradd
Vue.component('tab-chapteradd', {
  data: function(){
    return {
      tctSelectBook: '',//书籍搜索输入框
      tctInputRequest: [],//书籍搜索请求数组
      tctReturn:[],//列表展示搜索结果
      tctRequestAnswer: '请输入书籍名称',//输入提示信息
      tctRequestAnswerOn:'none',//结果展示框是否显示
      txtBookName:'',//选中后，设置书籍名称
      txtBookId:'',//选中后，设置书籍ID
      txtBookAuthor:'',//选中后，设置书籍作者
      chapterRollAll:'',
      txtchapterOptions:[],//卷列表
      tctRollSelected:'',//新家章节所属卷数，选择设置
      chapterInputInfo:'',//输入的章节内容
      chapterInputname:'',//新章节名
      chapterInputnameid:'',//新章节id
      chapterInputrollnamein: '',//新增卷名

    }
  },
  watch: {// 如果 `tctSelectBook` 发生改变，这个函数就会运行
    tctSelectBook: function (newQuestion, oldQuestion) { //监听书名输入变化
      //this.tctSelectBook = this.tctSelectBook.replace(/(^\s*)|(\s*$)/g, ""); //去两端空格
      if (this.tctSelectBook.length == 0 || this.tctSelectBook.replace(/(^\s*)|(\s*$)/g, "") == '') {
        this.tctRequestAnswer = '输入不能为空！'; return
      }
      this.tctRequestAnswer = '正在输入...';
      this.debouncedGetAnswer();//执行延时函数
    }
  },
  created: function () {//组件创建后data已加载
    this.debouncedGetAnswer = _.debounce(this.getBookName, 800);//延时500ms执行
  },
  computed: {
    chapterInputrollname:{
      get(){//console.log(JSON.stringify(this.txtchapterOptions[this.tctRollSelected-1]));
        if (this.txtchapterOptions[this.tctRollSelected-1]) {//卷数-1为卷列表下标。首次进入页面加载时，chapter_roll_name无值报错，加判断无值时跳过
          this.chapterInputrollnamein = this.txtchapterOptions[this.tctRollSelected-1].chapter_roll_name;
          return this.chapterInputrollnamein;
        }
        this.chapterInputrollnamein = '';//chapter_roll_name无值时，设置卷名位置为空->应对首次加载
        return this.chapterInputrollnamein;
      },
      set(val){
        this.txtchapterOptions[this.tctRollSelected-1].chapter_roll_name = val;
      }
    },
  },
  methods: {
    getBookName: function () {//获取数据
      var gbnToSelf = this;
      gbnToSelf.adwwwUrl = get_root_url('1');//获取模块地址
      gbnToSelf.tctInputRequest[0] = gbnToSelf.tctSelectBook;//请求值为书籍名称
      var gbnUrl = gbnToSelf.adwwwUrl+'AdminPage/chapter_search_ad'; //拼接URL
      axios_post_data(gbnUrl, gbnToSelf.tctInputRequest).then(result => {
        gbnToSelf.tctReturn = result;
        if(gbnToSelf.tctReturn.length == 0){
          gbnToSelf.tctRequestAnswer = '查询结果为空';
          return
        }
        this.tctRequestAnswer = '请在下面列表中选择：';
      });
    },
    blurTctInput: function(){//输入框失去焦点
      var btiToSelf = this;
      var stmout = setTimeout(function(){
        btiToSelf.tctRequestAnswerOn='none';//输入框失去焦点后，显示提示内容
      }, 150);
    },
    focusonTctInput: function(){//输入框获取焦点
      var ftiToSelf = this;
      ftiToSelf.tctRequestAnswerOn='block';//输入框获取焦点后，显示提示内容
    },
    tctfnSelect: function(item){//书籍选择事件
      var tfsToSelf = this;
      tfsToSelf.tctSelectBook = item.book_name;//书籍名称
      tfsToSelf.txtBookAuthor = item.book_author;//作者名称
      tfsToSelf.txtBookId = item.book_id;//书籍ID
      //查询选中内容的章节信息
      var tfcUrl = tfsToSelf.adwwwUrl+'AdminPage/chapter_all_info'; //拼接URL
      axios_post_data(tfcUrl, item.book_id).then(result => {//获取卷信息
        result[result.length] = {chapter_roll: result.length+1, chapter_roll_name: "新增卷"};//加入一条新增卷的选项
        tfsToSelf.txtchapterOptions = result;

      });
    },
    addBookChapter: function(){//增加章节
      var abcToSelf = this;
      if (abcToSelf.tctRollSelected=='' || abcToSelf.txtBookId=='') {
        alert('请选择书籍及所属卷'); return
      }
      //章节内容、卷、bookid、章节标题、章节标题ID、新卷名
      var inputInfochap = [abcToSelf.chapterInputInfo,abcToSelf.tctRollSelected,abcToSelf.txtBookId,abcToSelf.chapterInputname,abcToSelf.chapterInputnameid,abcToSelf.chapterInputrollname];
      var abcUrl = abcToSelf.adwwwUrl+'AdminPage/chapter_input_info'; //拼接URL
      axios_post_data(abcUrl, inputInfochap).then(result => {
        alert(JSON.stringify(result));//console.log(JSON.stringify(result));
      });
    },
  },
  template: `
    <div>
      <div class="tctSelectBook">
        <div class="tctsbTxt borderBnone centerDiplay"><span class="fontSizeMyself1">选择书籍:</span></div>
        <input class="tctsbInput borderBnone" v-model="tctSelectBook" @blur="blurTctInput" @focus="focusonTctInput">
        <div v-bind:style="{display:tctRequestAnswerOn}" class="tctRequestAnswer borderBnone">
          <div class="tctRaItem centerDiplay-sc" style="padding-left:5px;"><span class="fontSizeMyself1">{{tctRequestAnswer}}</span></div>
          <div class="tctRaItem tctRaItem2" v-for="item in tctReturn" v-on:click="tctfnSelect(item)">
            <div class="tctRaIname centerDiplay-sc"><span class="fontSizeMyself1 overflow-c2">《{{item.book_name}}》</span></div>
            <div class="tctRaIauthor centerDiplay-ec"><span class="fontSizeMyself3 overflow-c2">作者：{{item.book_author}}&nbsp;&nbsp;</span></div>
          </div>
        </div>
      </div>
      <div class="tctINfoDisplay">
        <div class="tctinfodTxt centerDiplay borderBnone"><span class="fontSizeMyself1a">作者</span></div>
        <div class="tctinfodInfo centerDiplay-sc borderBnone">{{txtBookAuthor}}</div>
      </div>
      <div class="tctINfoDisplay">
        <div class="tctinfodTxt centerDiplay borderBnone"><span class="fontSizeMyself1a">选卷</span></div>
        <div class="tctinfodInfo centerDiplay-sc borderBnone" style="border:0;background-color:#ccc;">
          <select v-model="tctRollSelected" style="width:100%;height:100%;border-radius:4px;border: 1px solid #ccc" class="borderBnone">
            <option disabled value="">请选择书籍</option>
            <option v-for="option in txtchapterOptions" v-bind:value="option.chapter_roll">
              {{ option.chapter_roll_name }}
            </option>
          </select>
        </div>
      </div>
      <div class="tctTxtTitle centerDiplay borderBnone"><span class="fontSizeMyself3">章节ID</span></div>
      <input v-model="chapterInputnameid" placeholder="输入新章节ID" class="tctChapterInputname borderBnone">
      <div class="tctTxtTitle centerDiplay borderBnone"><span class="fontSizeMyself3">章节名</span></div>
      <input v-model="chapterInputname" placeholder="输入新章节名" class="tctChapterInputname borderBnone">
      <div class="tctTxtTitle centerDiplay borderBnone"><span class="fontSizeMyself3">卷ID</span></div>
      <input v-model="tctRollSelected" placeholder="输入新卷ID" class="tctChapterInputname borderBnone">
      <div class="tctTxtTitle centerDiplay borderBnone"><span class="fontSizeMyself3">卷名</span></div>
      <input v-model="chapterInputrollname" placeholder="输入新卷名" class="tctChapterInputname borderBnone">
      <textarea v-model="chapterInputInfo" placeholder="输入章节内容" class="tctChapterInput borderBnone"></textarea>
      <div class="tnbOneline centerDiplay-ec">
        <div v-on:click="addBookChapter" style="width:90px;height:35px;background-color:rgba(54,71,95,1);" class="tnbBt1 centerDiplay"><span class="fontSizeMyselfe">提交</span></div>
      </div>
    </div>
  `
});
//tab组件：tab-chapteredit
Vue.component('tab-chapteredit', {
  data: function(){
    return {
      tctSelectBook: '',//书籍搜索输入框
      tctInputRequest: [],//书籍搜索请求数组
      tctReturn:[],//列表展示搜索结果
      tctRequestAnswer: '请输入书籍名称',//输入提示信息
      tctRequestAnswerOn:'none',//结果展示框是否显示
      txtBookName:'',//选中后，设置书籍名称
      txtBookId:'',//选中后，设置书籍ID
      txtBookAuthor:'',//选中后，设置书籍作者
      chapterRollAll:'',
      txtchapterOptions:[],//卷列表
      txtchapterAllOptions:[],//章节列表
      tctRollSelected:'',//章节所属卷数，选择设置
      tctChapterSelected:'',//哪一章，选择设置
      chapterStatus:'',//章节状态
      chapterInputInfo:'',//输入的章节内容
      chapterInputname:'',//章节名
      chapter_roll_name_in:'',//卷名过渡值
      chapter_input_name_in:'',//章节名过渡值
      chapterWords:'',//章节字数
    }
  },
  watch: {// 如果 `tctSelectBook` 发生改变，这个函数就会运行
    tctSelectBook: function (newQuestion, oldQuestion) { //监听书名输入变化
      //this.tctSelectBook = this.tctSelectBook.replace(/(^\s*)|(\s*$)/g, ""); //去两端空格
      if (this.tctSelectBook.length == 0 || this.tctSelectBook.replace(/(^\s*)|(\s*$)/g, "") == '') {
        this.tctRequestAnswer = '输入不能为空！'; return
      }
      this.tctRequestAnswer = '正在输入...';
      this.debouncedGetAnswer();//执行延时函数
    }
  },
  created: function () {//组件创建后data已加载
    this.debouncedGetAnswer = _.debounce(this.getBookName, 800);//延时500ms执行
  },
  computed: {
    chapter_roll_name:{//显示卷名
      get(){//console.log(JSON.stringify(this.txtchapterOptions[this.tctRollSelected-1]));
        var conToSelf= this;
        if (this.txtchapterOptions[this.tctRollSelected-1]) {//卷数减一为卷列表下标。首次进入页面加载时，chapter_roll_name无值报错，加判断无值时跳过
          this.chapter_roll_name_in = this.txtchapterOptions[this.tctRollSelected-1].chapter_roll_name;
          axios_post_data(this.adwwwUrl+'AdminPage/chapter_search_ap',[this.txtBookId,this.tctRollSelected]).then(result=>{
            conToSelf.txtchapterAllOptions = result;//查询该卷下章节列表
          });
          return this.chapter_roll_name_in;
        }
        this.chapter_roll_name_in = '';//chapter_roll_name无值时，设置卷名位置为空->应对首次加载
        return this.chapter_roll_name_in;
      },
      set(val){
        this.txtchapterOptions[this.tctRollSelected-1].chapter_roll_name = val;//输入改变卷名
      }
    },
    chapter_input_name:{//显示章节名
      get(){
        var cinToSelf= this;
        if (this.txtchapterAllOptions[this.tctChapterSelected-1]) {//章节数减一为章列表下标。首次进入页面加载时，chapter_title无值报错，加判断无值时跳过
          this.chapter_input_name_in = this.txtchapterAllOptions[this.tctChapterSelected-1].chapter_title;
          axios_post_data(this.adwwwUrl+'AdminPage/chapter_search_aw',[this.txtBookId,this.tctRollSelected,this.tctChapterSelected]).then(result=>{
            if (result.length>0) {
              cinToSelf.chapterWords = result[0].words;//查询该章字数
              txt_read_str(get_root_url(2)+'bookList/'+cinToSelf.txtBookId+'/txt/'+cinToSelf.tctRollSelected+'/'+cinToSelf.tctChapterSelected+'.txt')
              .then(result=>{
                cinToSelf.chapterInputInfo = result;
              })
              //cinToSelf.chapterInputInfo = '1';
              return
            }
            cinToSelf.chapterWords = '';//查询该章字数
          });
          return this.chapter_input_name_in;
        }
        this.chapter_input_name_in = '';//chapter_title无值时，设置卷名位置为空->应对首次加载
        return this.chapter_input_name_in;
      },
      set(val){
        this.txtchapterAllOptions[this.tctChapterSelected-1].chapter_title = val;//输入改变章节名
      }
    }
  },
  methods: {
    getBookName: function () {//获取数据
      var gbnToSelf = this;
      gbnToSelf.adwwwUrl = get_root_url('1');//获取模块地址
      gbnToSelf.tctInputRequest[0] = gbnToSelf.tctSelectBook;//请求值为书籍名称
      var gbnUrl = gbnToSelf.adwwwUrl+'AdminPage/chapter_search_ad'; //拼接URL
      axios_post_data(gbnUrl, gbnToSelf.tctInputRequest).then(result => {
        gbnToSelf.tctReturn = result;
        if(gbnToSelf.tctReturn.length == 0){
          gbnToSelf.tctRequestAnswer = '查询结果为空';
          return
        }
        this.tctRequestAnswer = '请在下面列表中选择：';
      });
    },
    blurTctInput: function(){//输入框失去焦点
      var btiToSelf = this;
      var stmout = setTimeout(function(){
        btiToSelf.tctRequestAnswerOn='none';//输入框失去焦点后，显示提示内容
      }, 150);
    },
    focusonTctInput: function(){//输入框获取焦点
      var ftiToSelf = this;
      ftiToSelf.tctRequestAnswerOn='block';//输入框获取焦点后，显示提示内容
    },
    tctfnSelect: function(item){//书籍选择事件
      var tfsToSelf = this;
      tfsToSelf.tctSelectBook = item.book_name;//书籍名称
      tfsToSelf.txtBookAuthor = item.book_author;//作者名称
      tfsToSelf.txtBookId = item.book_id;//书籍ID
      //查询选中内容的章节信息
      var tfcUrl = tfsToSelf.adwwwUrl+'AdminPage/chapter_all_info'; //拼接URL
      axios_post_data(tfcUrl, item.book_id).then(result => {//获取卷信息
        tfsToSelf.txtchapterOptions = result;
      });
    },
    editBookChapter: function(){//增加章节
      var abcToSelf = this;
      if (abcToSelf.tctRollSelected=='' || abcToSelf.txtBookId=='') {
        alert('请选择书籍及所属卷'); return
      }
      //章节内容、卷、bookid、章节标题、章节标题ID、新卷名
      var inputInfochap = [abcToSelf.txtBookId,abcToSelf.tctRollSelected,abcToSelf.tctChapterSelected,
        abcToSelf.chapter_roll_name,abcToSelf.chapter_input_name,abcToSelf.chapterWords,
        abcToSelf.chapterStatus,abcToSelf.chapterInputInfo];
      var abcUrl = abcToSelf.adwwwUrl+'AdminPage/chapter_edit_info'; //拼接URL
      axios_post_data(abcUrl, inputInfochap).then(result => {
        //alert(JSON.stringify(result));
        console.log(JSON.stringify(result));
      });
    },
  },
  template: `
    <div>
      <div class="tctSelectBook">
        <div class="tctsbTxt borderBnone centerDiplay"><span class="fontSizeMyself1">选择书籍:</span></div>
        <input class="tctsbInput borderBnone" v-model="tctSelectBook" @blur="blurTctInput" @focus="focusonTctInput">
        <div v-bind:style="{display:tctRequestAnswerOn}" class="tctRequestAnswer borderBnone">
          <div class="tctRaItem centerDiplay-sc" style="padding-left:5px;"><span class="fontSizeMyself1">{{tctRequestAnswer}}</span></div>
          <div class="tctRaItem tctRaItem2" v-for="item in tctReturn" v-on:click="tctfnSelect(item)">
            <div class="tctRaIname centerDiplay-sc"><span class="fontSizeMyself1 overflow-c2">《{{item.book_name}}》</span></div>
            <div class="tctRaIauthor centerDiplay-ec"><span class="fontSizeMyself3 overflow-c2">作者：{{item.book_author}}&nbsp;&nbsp;</span></div>
          </div>
        </div>
      </div>
      <div class="tctINfoDisplay">
        <div class="tctinfodTxt centerDiplay borderBnone"><span class="fontSizeMyself1a">选卷</span></div>
        <div class="tctinfodInfo centerDiplay-sc borderBnone" style="border:0;background-color:#ccc;">
          <select v-model="tctRollSelected" style="width:100%;height:100%;border-radius:4px;border: 1px solid #ccc" class="borderBnone">
            <option disabled value="">请选择卷数</option>
            <option v-for="option in txtchapterOptions" v-bind:value="option.chapter_roll">
              {{ option.chapter_roll }}.{{ option.chapter_roll_name }}
            </option>
          </select>
        </div>
      </div>
      <div class="tctINfoDisplay">
        <div class="tctinfodTxt centerDiplay borderBnone"><span class="fontSizeMyself1a">选章</span></div>
        <div class="tctinfodInfo centerDiplay-sc borderBnone" style="border:0;background-color:#ccc;">
          <select v-model="tctChapterSelected" style="width:100%;height:100%;border-radius:4px;border: 1px solid #ccc" class="borderBnone">
            <option disabled value="">请选择章节</option>
            <option v-for="option in txtchapterAllOptions" v-bind:value="option.chapter_id" class="fontSizeMyself3" style="width:100%;">
              {{ option.chapter_id }}.{{ option.chapter_title }}
            </option>
          </select>
        </div>
      </div>
      <div class="tctTxtTitle centerDiplay borderBnone"><span class="fontSizeMyself3">卷名</span></div>
      <input v-model="chapter_roll_name" placeholder="请输入卷名..." class="tctChapterInputname borderBnone">
      <div class="tctTxtTitle centerDiplay borderBnone"><span class="fontSizeMyself3">章节名</span></div>
      <input v-model="chapter_input_name" placeholder="请输入章节名..." class="tctChapterInputname borderBnone">
      <div class="tctTxtTitle centerDiplay borderBnone"><span class="fontSizeMyself3">字数</span></div>
      <input v-model="chapterWords" placeholder="输入章节字数..." class="tctChapterInputname borderBnone">
      <div class="tctTxtTitle centerDiplay borderBnone"><span class="fontSizeMyself3">状态</span></div>
      <input v-model="chapterStatus" placeholder="选择所属状态..." class="tctChapterInputname borderBnone">
      <textarea v-model="chapterInputInfo" placeholder="输入章节内容" class="tctChapterInput borderBnone"></textarea>
      <div class="tnbOneline centerDiplay-ec">
        <div v-on:click="editBookChapter" style="width:90px;height:35px;background-color:rgba(54,71,95,1);" class="tnbBt1 centerDiplay"><span class="fontSizeMyselfe">提交</span></div>
      </div>
    </div>
  `
});