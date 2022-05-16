$.ajaxPrefilter(function (options) {
    //每次调用请求时会先调用下面这个函数
    //函数封装好了 在html页面导入
    //调用这个函数 可以拿到提供给Ajax提供的配置对象
    //再发起请求前 先统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // console.log(options.url);
    //统一为有权限的接口配置请求头  里面没有my这个字符才是有权限的接口
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
    }

    //全局统一挂载complete回调函数 控制用户访问权限
    options.complete = function (res) {
        //每次发起请求都会调用这个函数
        // console.log('调用了complete函数');
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制跳转到login页面
            location.href = '/login.html'
            //清空本地存储中的token
            localStorage.removeItem('token')
        }
    }
})