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

function exist_or_no ( $sql ) { //判断数据库是否存在记录-->终极
	$result_search = Db::query( $sql );
	return empty( $result_search );
}

function search_details ( $book_id ) { //查询书籍信息, 传入变量book_id
    $sql_search = "select * from books_list where book_id = '".$book_id."'";
    $result_search_all = Db::query( $sql_search ); //原生数据库查询
    return $result_search_all; // 返回查询结果
}

function search_details_bookname ( $book_name ) { //查询书籍信息, 传入变量book_id
    $sql_search = "select * from books_list where book_name like '%".$book_name."%'";
    $result_search_all = Db::query( $sql_search ); //原生数据库查询
    return $result_search_all; //返回查询结果
}

function check_input_ad ( $book_name, $book_author ) {//根据书名和作者查询是否存在该书籍
	$sql_serach = "select * from books_list where book_name='".$book_name."' and book_author='".$book_author."'";
	$result_search_all = Db::query( $sql_serach ); //原生数据库查询
    return empty( $result_search_all ); //返回查询结果
}

function make_new_dir ( $new_dir_in ) { //创建文件夹，传入值为文件路径
	$new_dir = iconv( "UTF-8", "GBK", $new_dir_in );
    if ( !file_exists( $new_dir ) ) {
        mkdir( $new_dir, 0777, true ); //创建文件夹
        $resultArr = array( "errCode"=> '000', "errMsg" => "创建文件夹".$new_dir."成功" );
        echo json_encode( $resultArr );
    } else {
        $resultArr = array( "errCode"=> '000', "errMsg" => "需创建的文件夹".$new_dir."已经存在" );
        echo json_encode( $resultArr );
    }
}

function mysql_ex_try ( $sql ) { //数据库执行，异常抛出
	try{
		DB::query( $sql );
		return true;
	}
	catch( exception $ex ) {
		echo( $ex->getMessage() );
		return false;
	}
}

function user_login_check ( $sql ) { //用户登录校验
	try{
		$result = DB::query( $sql );
		if ( empty( $result ) ) {
			return array( 'errCode'=>'001', 'errMsg'=>'用户名或密码错误，请检查！' );
		}
		if ( $result[0]["user_status"] != '000' ) {
			return array( 'errCode'=>'002', 'errMsg'=>'用户状态异常，请联系管理员处理！' );
		}
		return array( 'data' => $result[0], 'errCode'=>'000', 'errMsg'=>'校验通过！' );
	}
	catch( exception $ex ) {//echo($ex->getMessage());
		return array( 'data'=>$ex,'errCode'=>'003', 'errMsg'=>'系统异常!' );
	}
}

function login_check_now () {
	if ( !empty( $_COOKIE['user_name_sid'] ) ) { //cookie不为空
    	session_id( $_COOKIE['user_name_sid'] ); //设置sessionID
        session_start(); //启动session
        if ( !empty( $_SESSION["qnsgw"]["user_name"] ) ) {//session的用户名不为空
           	$nowUser = $_SESSION["qnsgw"]["user_name"];//取得当前用户名
        	$sql_search = "select user_name,simple_name,user_status,user_img from user_list where user_name='".$nowUser."'";
        	$returndatauser = user_login_check( $sql_search );//判断用户是否存在-->可添加查询sid是否存在
       		return array( 'data' => $returndatauser["data"], 'errCode' => '000', 'errMsg' => '用户已登录' );// 返回信息
    	}  
    }
    return array( 'errCode' => '001', 'errMsg' => '用户未登录' );
}