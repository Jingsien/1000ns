<?php
namespace app\index\controller;
use think\Controller;
use think\Db;
use think\Request;

class DetailsInfo extends Controller
{
    public function index( $book_id, $chapter_roll_all )
    {//访问地址-> http://localhost:8010/1000ns/public/index.php/index/DetailsInfo/index
        $bookall = array(0=>$book_id, 1=>$chapter_roll_all); //章节信息写入数组
        $this->assign("bookidall", json_encode($bookall)); //章节信息写入模板的全局变量
        return $this->fetch('index'); // 渲染页面
    }
    public function search_chapter(Request $requestData){ //查询章节信息 book_id + 卷数
    	$rq_data = $requestData->param(); //读取前台传值
    	$result_search = array(); //定义结果数组，用于存储章节查询结果
    	$sql_search = "select * from books_chapter where book_id = '".$rq_data["dataNum"][0]."'"; //全量查询
    	for($i=0; $i < $rq_data["dataNum"][1]; $i++){ //按卷总数循环查询
    		$sql_search_mi = $sql_search." and chapter_roll = ".($i + 1); //查询的卷数
    		$result_search_m = Db::query($sql_search_mi); //原生数据库查询
    		$result_search[$i] = $result_search_m; //查询结果写入结果集数组
    	}
        $re_final = array(); //定义返回值数组
        $re_final[0] = $result_search; //章节信息查询结果写入返回值数组
        $re_final[1] = search_details($rq_data["dataNum"][0]); //书籍信息查询结果写入返回值数组
        return json($re_final); //返回JSON数据
    }
}