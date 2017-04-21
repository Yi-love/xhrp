# xhrp
XMLHttpRequest of promise and export jsonp. xhrp depend on original Promise.

## npm

```sh
 npm install --save xhrp
```

## require

```sh
  var xhrp = require('xhrp');
  //or
  import * as xhrp from 'xhrp';
  //or browser
  <script src="./index.js"></script>
```

## use
when xhrp request success ,responseText is not parse. error will return array include `[err , req , settings]`.

### ajax(options)

```js
let promise = xhrp.ajax({
 url:'http://127.0.0.1:8888/test'
});
promise.then((result)=>{
 console.log(result);
}).catch((e)=>{
 console.log(e);
});
xhrp.abort(promise);
```
### get(url,[options])
```js
xhrp.get('http://127.0.0.1:8888/test'})
.then((result)=>{
  console.log(result);
}).catch((e)=>{
  console.log(e);
});
```
### post(url,[options])

```js
xhrp.post({
    url:'http://127.0.0.1:8888/test' ,
    timeout:4000,
    headers :{Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*'}
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});
```
### jsonp(url,[options])

```js
let promise = xhrp.jsonp({url:'http://127.0.0.1:8888/test' ,timeout:4000});
promise.then((result)=>{
  console.log(result);
}).catch((e)=>{
  console.log(e);
});
xhrp.abort(promise);
```
### abort(promise)

```js
xhrp.abort(promise);
```

## settings

### ajax

```
//请求类型
type :'GET',
//是否跨域
crossDomain: false, //ineffect of jsonp ,please set params
//超时设置  默认不超时
timeout: 0,
//数据需要被序列化
processData: true,
//对get请求数据进行缓存
cache: true,
//url
url : 'string',
//是否异步
async:'boolean',
//用户名
user:'string',
//密码
password:'string',
//数据
data:'object',
//设置请求头
headers:'object'
```

### jsonp

```js
//请求类型
type :'GET',
//是否跨域
crossDomain: false, //ineffect of jsonp ,please set params
//超时设置  默认不超时
timeout: 0,
//数据需要被序列化
processData: true,
//对get请求数据进行缓存
cache: true,
//设置script属性
params:'object',
//default server get params name is "callback" , you can set it.
//服务器回调函数参数
jsonp:'string',
//url
url : 'string'
```

## demo

```sh
cd test
node server.js
```

open the `test/index.html`

## test
cmd rum:

```sh
webpack
```
