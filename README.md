# MilkT 前端调用接口进行渲染的简单例子

本文`github`下载地址：

```shell
# git@github.com:Milk-T/milkt-simple-web-example.git
```

本文使用的是`mac`下的`shell`环境，`windows`环境下建议使用`git bash`或者`cygwin`

## 项目的初始化安装

### 安装`nodejs`环境

不要直接去安装`nodejs`环境，`node`的版本现在非常复杂，推荐安装[nvm](https://github.com/creationix/nvm)来控制`node`的版本号

具体文章参考这里：[nvm](https://github.com/creationix/nvm)

```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

安装完成之后输入`nvm`会有帮助信息

```shell
➜  milkt-web-example git:(master) nvm

Node Version Manager

Usage:
  nvm help                              Show this message
  nvm --version                         Print out the latest released version of nvm
  nvm install [-s] <version>            Download and install a <version>, [-s] from source. Uses .nvmrc if available
  nvm uninstall <version>               Uninstall a version
  nvm use <version>                     Modify PATH to use <version>. Uses .nvmrc if available
  nvm run <version> [<args>]            Run <version> with <args> as arguments. Uses .nvmrc if available for <version>
  nvm current                           Display currently activated version
  nvm ls                                List installed versions
  nvm ls <version>                      List versions matching a given description
  nvm ls-remote                         List remote versions available for install
  nvm deactivate                        Undo effects of `nvm` on current shell
  nvm alias [<pattern>]                 Show all aliases beginning with <pattern>
  nvm alias <name> <version>            Set an alias named <name> pointing to <version>
  nvm unalias <name>                    Deletes the alias named <name>
  nvm reinstall-packages <version>      Reinstall global `npm` packages contained in <version> to current version
  nvm unload                            Unload `nvm` from shell

Example:
  nvm install v0.10.32                  Install a specific version number
  nvm use 0.10                          Use the latest available 0.10.x release
  nvm run 0.10.32 app.js                Run app.js using node v0.10.32
  nvm exec 0.10.32 node app.js          Run `node app.js` with the PATH pointing to node v0.10.32
  nvm alias default 0.10.32             Set default node version on a shell

Note:
  to remove, delete, or uninstall nvm - just remove ~/.nvm, ~/.npm, and ~/.bower folders
```

推荐安装`v7.1.0`

```shell
nvm install v7.1.0
```

安装完成之后使用`nvm ls`查看信息

```shell
➜  milkt-web-example git:(master) ✗ nvm ls
->    v7.1.0
      system
unstable -> 7.1 (-> v7.1.0) (default)
```

告诉系统确认使用`v7.1.0`

```shell
➜  milkt-web-example git:(master) ✗ nvm use v7.1.0
Now using node v7.1.0
```

### 安装`gulp`环境

我们使用了`gulp`作为了前端的构建工具，具体文档参考这里：[gulp](http://gulpjs.com/)。所以我们需要首先安装`gulp`的开发环境

```shell
sudo npm install -g gulp-cli
```

### 安装`bower`环境

我们使用了`bower`作为前端资源包管理器，具体文档参考这里：[bower](https://bower.io/)。我们需要安装一下`bower`的环境

```shell
sudo npm install -g bower
```

### 安装项目依赖

进入项目目录先后执行两个包安装的命令

```shell
npm install
```

```shell
bower install
```

## 项目调试

等依赖安装完成之后，在项目开发阶段，我们可以使用`gulp`启动本地服务器进行调试

在根目录下执行：`gulp serve`

```
➜  milkt-web-example git:(master) ✗ gulp serve
[08:29:58] Using gulpfile ~/Projects/milkt/milkt-web-example/gulpfile.js
[08:29:58] Starting 'serve'...
[HPM] Proxy created: /m.api  ->  http://www.fengqu.com
[HPM] Subscribed to http-proxy events:  [ 'error', 'close' ]
[08:29:58] Starting 'clean'...
[08:29:58] Starting 'wiredep'...
[08:29:58] Finished 'wiredep' after 16 ms
[08:29:58] Finished 'serve' after 36 ms
[08:29:59] Finished 'clean' after 104 ms
[08:29:59] Starting 'styles'...
[08:29:59] Starting 'scripts'...
[08:30:00] Starting 'fonts'...
[08:30:00] Finished 'styles' after 1.46 s
[08:30:00] Finished 'scripts' after 1.09 s
[08:30:00] Finished 'fonts' after 473 ms
[BS] Access URLs:
 ------------------------------------
       Local: http://localhost:9000
    External: http://192.168.1.8:9000
 ------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.8:3001
 ------------------------------------
[BS] Serving files from: .tmp
[BS] Serving files from: app
[HPM] POST /m.api -> http://www.fengqu.com
```

会在本地打开一个页面，这时候可以看到，已经把丰趣的接口数据渲染上去了。

在这个开发环境下，如果修改任何`js`、`css`和`html`文件都会引起页面的自动重新加载，查看结果

### `proxy`设置

在`gulpfile.js`文件中93-97行

```js
var mapiproxy = proxy('/m.api', {
  target: 'http://www.fengqu.com',
  changeOrigin: true,
  logLevel: 'debug'
});
```

这里我设置了一个代理，所有访问本地`localhost:9000/m.api`会被指向线上`http://www.fengqu.com/m.api`。这样不用跨域就直接可以获取线上丰趣的数据。如果需要开发的话，将这里`http://www.fengqu.com`的地址修改成自己的服务器的`ip`或者域就可以了。

## 代码开发

根目录的`app`目录是开发目录

`index.html`是入口文件，可以在这里添加新的`html`文件，所有的`js`和`css`引用都在这个文件里，`scripts`目录用来放`js`代码，`styles`用来放`css`代码

然后有一个非常需要注意的，是和`app`平行的`bower_components`目录，这个是包管理器安装目录，所有通过`bower`安装的依赖包都放在这个目录。前端`html`可以直接引用这个目录里文件，例如：

```html
<!-- build:js scripts/vendor.js -->
<script src="/bower_components/jquery/dist/jquery.js"></script>
<script src="/bower_components/modernizr/modernizr.js"></script>
<script src="/bower_components/lodash/lodash.js"></script>
<script src="/bower_components/blueimp-md5/js/md5.min.js"></script>
<script src="/bower_components/store/dist/store.everything.min.js"></script>
<!-- endbuild -->
```

`/bower_components`就能直接指向`bower_components`目录

我们主要看两部分的代码:

+ `js`代码中调用接口获取数据
+ `html`代码中模版编写，并且`js` 是如何调用数据合成模版生成出`html`文件的

### 前端调用数据接口

+ `app/scripts/utils.js`这个文件是框架级的封装，不在本文中涉及到，我们具体讲怎么调用它。
+ `app/scripts/api/fq.getItemInfo.js`这个文件是接口`product.getItemInfo`的描述封装，记住以后所有的接口都需要有这个的描述文件，这里的文件可以自动化生产，后续我补上
+ `app/scripts/main.js`中是我们主要需要学习的，这里有具体的代码调用

我们来看`main.js`的代码

```js
var stance = new MilkT(getItemInfo, 3);
stance.send({itemId:27783})
      .done(function(data){
        //...
      })
```

`MilkT`对象是我们在`app/scripts/utils.js`文件中编写的框架代码，是一个构造函数。它在`new`的时候需要传两个值:

+ 接口的描述对象`getItemInfo`，这个对象就是我们在`app/scripts/api/fq.getItemInfo.js`文件中获取的
+ AppID，这里的AppID，我们都暂时定义成1

接着说请求，`send`方法就是我们发送的请求（我们建议所有接口都用`post`），`send`方法里传的就是具体提交到服务器的参数

```js
// 这里的params就是具体请求的参数
stance.send(params)
```

注意这里的代码，`send`之后链式接一个`done`就是使用了`jquery`的`defferred`对象，具体的内容，参考我上次的讲义。那么在`done`里面，我们在回调函数里拿到的`data`就是服务器返回的数据，可以在`console`里面看

```js
stance.send({itemId:27783})
      .done(function(data){
        //...
      })
```

### 渲染

在`app/index.html`中有这段代码：

```html
<!-- example template -->
<script type="milkt/template" id="example-template">
  <h1><%= skuInfo.title %></h1>
  <pre>
    <%= skuInfo.subtitle %>
  </pre>
  <div>
    <%= skuInfo.description %>
  </div>
</script>
```

这里就是我们的模版，怎么获取呢，在`app/scripts/main.js`中，我们通过`jquery`选择器获取

```js
var template = $('#example-template').text();
```

在项目代码中我引用了[lodash](https://lodash.com/docs/4.17.4)，具体参考这里：[lodash](https://lodash.com/docs/4.17.4)。这里的模版就使用了`lodash`中提供的模版方法，具体文档参考这里：[lodash template](https://lodash.com/docs/4.17.4#template)

根据文档的提示，我们将模版的`text`塞入获取一个渲染函数

```js
var templateFn = _.template(template);
```

现在我们开始渲染`dom`，在`app/scripts/main.js`第10行

```js
var dom = templateFn(data)
```

我们把获取的数据塞给渲染函数，就获得了新的`html`片段`dom`，然后将这个片段贴在页面上

```js
$('#milkt-wrap').append(dom)
```

