<?php
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;

class AdminPage extends Controller
{
    public function index () {//访问地址-> http://localhost:8010/1000ns/public/index.php/admin/AdminPage/index
        $loginIfo = login_check_now();
        if ( $loginIfo["errCode"] == '001' ) { //用户未登录
            //return 渲染登录页面
        }
        if ( $loginIfo["errCode"] == '000' ) {
            $this->assign( "userIfo", json_encode( $loginIfo["data"] ) ); //用户信息写入模板的全局变量
            return $this->fetch( 'index' );// 渲染页面
        }
    }

    public function book_input(Request $requestData)
    { //书籍插入 ["dataNum"][0]:名称、[1]:作者、[2]:卷数、[3]:简介、[4]:类型sj/wz/sg
        $rq_data = $requestData->param(); //读取前台传值
        $now_times = date('Y-m-d H:i:s', time());
        $re_st=array("error"=>"001","st"=>"fail"); //返回状态
        $check_result = check_input_ad($rq_data["dataNum"][0], $rq_data["dataNum"][1]);
        if ($check_result) { //查询结果为空数据库中不存在该条记录
            $re_st["error"]="000";$re_st["st"]="success";//设置返回值
            $result_search_m = Db::query("select * from books_list where book_id like '".$rq_data["dataNum"][4]."%' order by id desc limit 1"); //查询该类型
            $book_id_num = $rq_data["dataNum"][4].str_pad((string)($result_search_m[0]["id"]+1),8,"0",STR_PAD_LEFT);//新增内容ID位数补齐
            $sql_insert = "insert into books_list (book_id, book_name, book_author, up, check_man, brief, read_num, like_num, recommend_num, create_time, update_time, up_time, of_class, words_all, chapter_roll_all) values ('".$book_id_num."', '".$rq_data["dataNum"][0]."', '".$rq_data["dataNum"][1]."', '静夜思', '静夜思', '".$rq_data["dataNum"][3]."', '0', '0', '0', '".$now_times."', '".$now_times."', '".$now_times."', '0', '0', '".$rq_data["dataNum"][2]."')";//执行插入
            $result_search_f = Db::query($sql_insert);//书籍增加->数据库插入
            make_new_dir("static/bookList/".$book_id_num);//创建书籍目录（文件存在则跳过）
        }
        return json($re_st);
    }

    public function chapter_search_ad(Request $requestData){ //查询书籍名称
        $rq_data = $requestData->param(); //读取前台传值
        $book_name_ad = $rq_data["dataNum"][0];
        $returnRes = search_details_bookname($book_name_ad);
        return json($returnRes);
    }

    public function chapter_search_ap(Request $requestData){ //查询书籍章节信息
        $rq_data = $requestData->param(); //读取前台传值
        $sql_getChapter = "select DISTINCT chapter_id,chapter_title from books_chapter where book_id='".$rq_data["dataNum"][0]."' and chapter_roll='".$rq_data["dataNum"][1]."'";
        $result_search_m = Db::query($sql_getChapter);
        //待完善
        return json($result_search_m);
    }

    public function chapter_search_aw(Request $requestData){ //查询书籍章节信息
        $rq_data = $requestData->param(); //读取前台传值
        $sql_getChapter = "select words from books_chapter where book_id='".$rq_data["dataNum"][0]."' and chapter_roll='".$rq_data["dataNum"][1]."' and chapter_id='".$rq_data["dataNum"][2]."'";
        $result_search_m = Db::query($sql_getChapter);
        //待完善
        return json($result_search_m);
    }

    public function chapter_all_info(Request $requestData){ //查询书籍卷信息
        $rq_data = $requestData->param(); //读取前台传值
        $sql_getChapter = "select DISTINCT chapter_roll,chapter_roll_name from books_chapter where book_id='".$rq_data["dataNum"]."'";
        $result_search_m = Db::query($sql_getChapter);
        //待完善
        return json($result_search_m);
    }

    public function book_info_details(Request $requestData){//返回是性情信息
        $rq_data = $requestData->param(); //读取前台传值
        return json(search_details($rq_data["dataNum"]));
    }

    public function chapter_input_info(Request $requestData){ //新增章节
        $now_times = date('Y-m-d H:i:s', time());
        $rq_data = $requestData->param(); //读取前台传值$rq_data["dataNum"][0]-章节内容、[1]-卷、[2]-bookid、[3]-章节名、[4]-章ID、[5]卷名
        exist_or_no("select * from books_chapter where book_id='".$rq_data["dataNum"][2]."' and chapter_roll='".$rq_data["dataNum"][1]."' and chapter_id='".$rq_data["dataNum"][4]."'") or die("章节已存在，新增失败");//判断章节是否存在
        $my_dir = "static/bookList/".$rq_data["dataNum"][2]."/txt/".$rq_data["dataNum"][1];//章节所在目录
        make_new_dir($my_dir);//创建文件（文件存在则跳过）
        $my_txt = fopen($my_dir."/".$rq_data["dataNum"][4].".txt", "w") or die("Unable to open file!");//建立章节ID的txt文件
        $sql_insert = "insert into books_chapter (chapter_title,chapter_roll,chapter_roll_name,chapter_id,book_id,words,ctime,mtime) values ('".$rq_data["dataNum"][3]."','".$rq_data["dataNum"][1]."','".$rq_data["dataNum"][5]."','".$rq_data["dataNum"][4]."','".$rq_data["dataNum"][2]."','0','".$now_times."','".$now_times."')";
        mysql_ex_try($sql_insert) or die("数据库记录插入失败！");
        fwrite($my_txt, "<pre>".$rq_data["dataNum"][0]."</pre>");//章节内容写入文件
        fclose($my_txt);//关闭文件
    }

    public function book_update(Request $requestData){//书籍信息更新
        $rq_data = $requestData->param(); //读取前台传值$rq_data["dataNum"][0]::依次为：bookId、作者、总卷数、上传人、校对人、总字数、简介、名称
        $sql_book_update = "update books_list set book_author='".$rq_data["dataNum"][1]."',chapter_roll_all='".$rq_data["dataNum"][2]."',up='".$rq_data["dataNum"][3]."',check_man='".$rq_data["dataNum"][4]."',words_all='".$rq_data["dataNum"][5]."',brief='".$rq_data["dataNum"][6]."',book_name='".$rq_data["dataNum"][7]."' where book_id='".$rq_data["dataNum"][0]."'";
        if(mysql_ex_try($sql_book_update)){
            return json(array("error"=>"000","st"=>"success"));
        };
        return json(array("error"=>"001","st"=>"fail"));
    }

    public function chapter_edit_info(Request $requestData){
        $now_times = date('Y-m-d H:i:s', time());
        $rq_data = $requestData->param(); //读取前台传值$rq_data["dataNum"][0]::依次为book_id|chapter_roll|chapter_id|chapter_roll_name|chapter_title|words|status|txt
        $sql_chapter_update = "update books_chapter set chapter_roll_name='".$rq_data["dataNum"][3]."',chapter_title='".$rq_data["dataNum"][4]."',words='".$rq_data["dataNum"][5]."',mtime='".$now_times."' where book_id='".$rq_data["dataNum"][0]."' and chapter_roll='".$rq_data["dataNum"][1]."' and chapter_id='".$rq_data["dataNum"][2]."'";
        if(mysql_ex_try($sql_chapter_update)){
            $my_dir = "static/bookList/".$rq_data["dataNum"][0]."/txt/".$rq_data["dataNum"][1];//章节所在目录
            make_new_dir($my_dir);//创建文件（文件存在则跳过）
            $my_txt = fopen($my_dir."/".$rq_data["dataNum"][2].".txt", "w") or die("Unable to open file!");//建立章节ID的txt文件
            fwrite($my_txt, $rq_data["dataNum"][7]);//章节内容写入文件
            fclose($my_txt);//关闭文件
            return json(array("error"=>"000","st"=>"success"));
        };
    }
}
