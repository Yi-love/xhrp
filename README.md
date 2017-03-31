# xhr-promise
XMLHttpRequest promise


```js
xhrp.get('http://127.0.0.1:8888/test'})
.then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});


let promise = xhrp.ajax({
    url:'http://127.0.0.1:8888/test' ,
    headers :{Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*'}
});
promise.then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});
xhrp.abort(promise);


let promise = xhrp.jsonp({url:'http://127.0.0.1:8888/test' ,timeout:4000});
promise.then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});
xhrp.abort(promise);
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