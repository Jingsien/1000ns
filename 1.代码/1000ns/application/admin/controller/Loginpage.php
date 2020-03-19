<?php
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;
use think\Session;
use think\Cookie;

class LoginPage extends Controller
{
    public function index( $comvar = '' ) {//访问地址-> http://localhost:8010/1000ns/public/index.php/admin/LoginPage/index
        $this->assign( "old_url", json_encode( $comvar ) ); //章节信息写入模板的全局变量
        return $this->fetch( 'index' ); // 渲染页面
    }

    public function login_check( Request $requestData ) { //登录 ["dataNum"][0]：依次为用户名、密码
        $rq_data = $requestData->param(); //读取前台传值
        $sql_search = "select user_name,simple_name,user_status from user_list where user_name='".$rq_data["dataNum"][0]."' and password='".$rq_data["dataNum"][1]."'";
        $result_sql_data = user_login_check( $sql_search );
        if ( $result_sql_data["errCode"] =='000' ) { //查询成功，写入session和cookie
            Session::set( 'user_name', $result_sql_data["data"]["user_name"], 'qnsgw' ); //设置session
            cookie( 'user_name_sid', session_id(), 3600*24*7 );//设置cookie，第三个参数为时长
        }
        return json( $result_sql_data );
    }

    public function login_out () { //登录退出
        if ( !empty( $_COOKIE['user_name_sid'] ) ) {
            session_id( $_COOKIE['user_name_sid'] ); //设置sessionID
            session_start(); //启动session
            unset( $_SESSION["qnsgw"]["user_name"] ); //释放session
            Cookie::delete( 'user_name_sid' ); //释放cookie  //setcookie('user_name_sid', '')
            return json( array( 'errCode' => '000', 'errMsg' => '成功退出' ) );
        }
        return json( array( 'errCode' => '001', 'errMsg' => '操作失败' ) );
    }
}