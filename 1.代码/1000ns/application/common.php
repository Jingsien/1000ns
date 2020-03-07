<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
use think\Db;

function search_details( $book_id ){ //查询书籍信息, 传入变量book_id
    $sql_search = "select * from books_list where book_id = '".$book_id."'";
    $result_search_all = Db::query($sql_search); //原生数据库查询
    return $result_search_all; // 返回查询结果
}