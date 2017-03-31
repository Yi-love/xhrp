'use strict';

const http = require('http');

function request(req , res){
    res.writeHead(200 , {'Content-type':'text/plain'});
    console.log('------------------request--------------------');
    var d = '';
    req.on('data',function(chunk){
        d += chunk;
    });
    req.on('end',function(){
        console.log('data: ' , d.toString());
    });
    console.log('request url : ' , req.url);
    if ( req.url.indexOf('xhrp_jsonp_') >= 0 ) {
        res.write(req.url.match(/xhrp_jsonp_[0-9]+/)[0]+'({code:0,msg:"success",url:"'+req.url+'"})');
    }else{
        res.write('{code:0,msg:"success" , url:'+req.url+'}');
    }
    setTimeout(()=>{
        res.end();
    },5000);
}
http.createServer(request).listen(8888 , '127.0.0.1');

console.log('http proxy server run.');
