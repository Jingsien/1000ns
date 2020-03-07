<?php
namespace app\index\controller;
use think\Controller;
use think\Db;

class Index extends Controller
{
	//访问地址-> http://localhost:8010/1000ns/public/index.php/index/Index/index
    public function index()
    {
    	// 渲染页面
        return $this->fetch('index');
    }

    public function f_get_data_first()
    {
        // 获取首页初始查询信息
       $result1 = Db::query('select * from books_count where id=1');
       return json($result1);

    }
    // test页面
    public function test()
    {
    	return $this->fetch('test');
    }

    // 文件上传
    public function fileUp()
    {
    	dump($_FILES); //数据打印
    	// 判断文件上传是否出错
        if($_FILES["file"]["error"])
        {
            echo $_FILES["file"]["erroe"];
        }
        else
        {
            //控制上传的文件类型，大小
            if($_FILES["file"]["type"]=="image/jpeg"||$_FILES["file"]["type"]=="image/jpg" && $_FILES["file"]["type"]=="image/png"&&$_FILES["file"]["size"]<1024000)
            {
                //找到文件存放位置，注意tp5框架的相对路径前面不用/
                //这里的filename进行了拼接，前面是路径，后面从date开始是文件名
                //我在static文件下新建了一个file文件用来存放文件，要注意自己建一个文件才能存放传过来的文件
                $filename = "static/file/".date("YmdHis").$_FILES["file"]["name"];
                //判断文件是否存在
                if (file_exists($filename))
                {
                    echo "该文件已存在！";
                }
                else
                {
                    //保存文件
                    //move_uploaded_file是php自带的函数，前面是旧的路径，后面是新的路径
                    move_uploaded_file($_FILES["file"]["tmp_name"],$filename);
                }
            }
            else
            {
                echo "文件类型不正确！";
            }
        }
    }
}
