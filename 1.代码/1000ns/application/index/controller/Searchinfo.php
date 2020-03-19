<?php
namespace app\index\controller;
use think\Controller;
use think\Db;
use think\Request;

class SearchInfo extends Controller
{
    public function index($book_name = "")
    { //渲染页面，访问地址-> http://localhost:8010/1000ns/public/index.php/index/SearchInfo/index
        $this->assign("searchInfo", $book_name); //章节信息写入模板的全局变量
        return $this->fetch('index'); //渲染模板
    }

    public function searchBooks(Request $requestData)
    {//查找信息 打印函数：var_dump($result);
    	$rq_data = $requestData->param(); //读取前台传值
    	$sql_search = "select * from books_list"; //全量查询
    	if ( $rq_data["dataNum"][0] != "" ) { //判断书名是否为空
    		$sql_search = $sql_search." where book_name like '%".$rq_data["dataNum"][0]."%'"; //书名不为空时，拼接SQL
    	}
    	$result_search = Db::query($sql_search); //原生数据库查询
    	return json($result_search); //结果以json数组返回
    }

    public function searchRecommend(Request $requestData)
    {//查询推荐书籍信息
        $rq_data = $requestData->param(); //读取前台传值
        $sql_search = "select * from books_list_recommend"; //全量查询
        if ( $rq_data["dataNum"][0] != "" ) { //判断书名是否为空
            $sql_search = $sql_search." order by recommend_num desc limit ".$rq_data["dataNum"][0]; //书名不为空时，拼接SQL
            //var_dump($sql_search);
        }
        $result_search = Db::query($sql_search); //原生数据库查询
        return json($result_search); //结果以json数组返回
    }
}