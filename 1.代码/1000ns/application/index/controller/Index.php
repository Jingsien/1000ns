<?php
namespace app\index\controller;
use think\Controller;
use think\Db;

class Index extends Controller
{
    public function index () {//访问地址-> http://localhost:8010/1000ns/public/index.php/index/Index/index
        if ( !empty( $_COOKIE['user_name_sid'] ) ) {//cookie不为空
            session_id( $_COOKIE['user_name_sid'] );//设置sessionID
            session_start();//启动session
            if ( !empty( $_SESSION["qnsgw"]["user_name"] ) ) {//session的用户名不为空
                $nowUser = $_SESSION["qnsgw"]["user_name"];//取得当前用户名
                $sql_search = "select user_name,simple_name,user_status,user_img from user_list where user_name='".$nowUser."'";
                $returndatauser = user_login_check( $sql_search );//判断用户是否存在-->可添加查询sid是否存在
                $this->assign( "userIfo", json_encode( $returndatauser["data"] ) ); //用户信息写入模板的全局变量
                return $this->fetch( 'index' );// 渲染页面
            }  
        }
        $this->assign( "userIfo", "null" ); //用户信息写入模板的全局变量
        return $this->fetch( 'index' );// 渲染页面
    }

    public function f_get_data_first () { // 获取首页初始查询信息
       $result1 = Db::query( 'select * from books_count where id=1' );
       return json( $result1 );
    }
    // test页面
    public function test () {
    	return $this->fetch( 'test' );
    }
}
