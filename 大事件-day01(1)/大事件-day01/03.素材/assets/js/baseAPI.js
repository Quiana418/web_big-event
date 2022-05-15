$.ajaxPrefilter(function (options) {
    //每次调用请求时会先调用下面这个函数
    //函数封装好了 在html页面导入
    //调用这个函数 可以拿到提供给Ajax提供的配置对象
    //再发起请求前 先统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);
})