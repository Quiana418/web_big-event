$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //自定义校验规则 先得到layUI对象
    var form = layui.form
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //校验完成之后 监听注册表单的提交事件 向服务器发送post请求
    //获取到layer用于表单提示信息
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            //  模拟人的点击行为 注册成功之后 自动点击登录链接跳转到登录页面
             $('#link_login').click()

        })
    })

    //注册完成之后 监听登录页面的提交事件 发起post请求
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                //登陆成功之后 将token的值存到本地存储里面 方便后续使用
                //有权限的地址请求时需要在请求头里加token才能请求成功
                localStorage.setItem('token',res.token)
                //否则登录成功 跳转到首页
                location.href='/index.html'
            }
        })
    })

})