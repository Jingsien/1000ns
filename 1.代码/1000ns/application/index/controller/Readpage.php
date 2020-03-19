<?php
namespace app\index\controller;
use think\Controller;
use think\Db;
use think\Request;


class ReadPage extends Controller
{   
    public function index($bookid,$chapterroll,$chapter_id)
    { //访问地址-> http://localhost:8010/1000ns/public/index.php/index/ReadPage/index
    	$chapterInformation = array(0=>$bookid, 1=>$chapterroll, 2=>$chapter_id); //章节信息写入数组
    	$this->assign("chapter", json_encode($chapterInformation)); //章节信息写入模板的全局变量
        return $this->fetch('index');// 渲染页面 var_dump($bookid);
    }

    public function get_book_info (Request $requestData){ //查询章节信息 book_id + 卷数 + 章节
    	$rq_data = $requestData->param(); //读取前台传值
    	$re_final = array(); //定义返回值数组
    	$sql_search = "select * from books_chapter where book_id = '".$rq_data["dataNum"][0]."' and chapter_roll = ".$rq_data["dataNum"][1]." and chapter_id = ".$rq_data["dataNum"][2]; //全量查询
    	$re_final[0] = Db::query($sql_search); //原生数据库查询
        $re_final[1] = search_details($rq_data["dataNum"][0]); //书籍信息查询结果写入返回值数组
        return json($re_final); //返回JSON数据
    }
}