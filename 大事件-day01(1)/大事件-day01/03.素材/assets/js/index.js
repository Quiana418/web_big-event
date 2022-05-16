// 获取用户的基本信息
getUserInfo();

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        /*  //控制用户访问权限  为了方便多次调用直接挂载到全局的baseAPI.js里面
         complete: function (res) {
             //每次发起请求都会调用这个函数
             // console.log('调用了complete函数');
             // console.log(res);
             if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                 //强制跳转到login页面
                 location.href = '/login.html'
                 //清空本地存储中的token
                 localStorage.removeItem('token')
             }
         } */
    })
}

//渲染用户的头像和名称
function renderAvatar(user) {
    //1.获取用户的名称
    let name = user.nickname || user.username
    //2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需渲染用户头像
    if (user.user_pic != null) {
        //渲染用户头像 隐藏文本头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        //渲染文字头像 隐藏图片头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first)
    }

}

//点击退出 弹出框
$('#btnClose').on('click', function () {
    //eg1
    layer.confirm('确定退出登录?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        //清空本地存储中的token
        localStorage.removeItem('token')
        //跳转到登录页面
        location.href = '/login.html'
        //关闭询问框
        layer.close(index);
    });
})