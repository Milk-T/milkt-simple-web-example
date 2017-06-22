$(function(){

  // userLogin是用户登录的接口定义文件抛出的对象
  // 这里的password要做md5编码，不要明文传递
  var loginRequest = new MilkT(userLogin, {username: 'Michael', password: '123456'})
  loginRequest.send({name: 'michael'})
      .done(function(data){
        // 有了csrfToken之后将csrfToken存到store中
        store.set('csrfToken', data.csrfToken)

        // 做其他事情...

        // 跳转到其他页面，或者刷新当前页面
        window.location.reload(true);
      })

})


