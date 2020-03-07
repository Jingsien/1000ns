<?php
namespace app\index\controller;
use think\Controller;

class ReadPage extends Controller
{   
    public function index($bookid,$chapterroll,$chapter_id)
    { //访问地址-> http://localhost:8010/1000ns/public/index.php/index/ReadPage/index
    	$chapterInformation = array(0=>$bookid, 1=>$chapterroll, 2=>$chapter_id); //章节信息写入数组
    	$this->assign("chapter", json_encode($chapterInformation)); //章节信息写入模板的全局变量
        return $this->fetch('index');// 渲染页面 var_dump($bookid);
    }
}