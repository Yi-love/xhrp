'use strict';

import {serializeData , appendQuery} from './serialize.js';
import {document , originAnchor} from './dom.js';

const empty = ()=>{};

export function createAjax(settings , map){
  //没有传人ajax请求url
  if ( !settings.url ) {
    settings.url = originAnchor.href;//使用当前url
  }

  //判断是否跨域
  if ( !settings.crossDomain ) { //没有跨域
    let urlAnchor = document.createElement('a');
    urlAnchor.href = settings.url;
    // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
    urlAnchor.href = urlAnchor.href; //获取ajax请求的url
    //判断ajax请求是否跨域
    settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host);
  }

  //序列化数据
  if ( settings.processData ) {
    serializeData(settings);
  }

  if ( !settings.cache ){
    settings.url = appendQuery(settings.url, '_=' + Date.now());//添加时间戳
  }

  //请求头对象
  let headers = {};
  //请求头设置函数
  let setHeader = (name, value)=>{ 
    headers[name.toLowerCase()] = [name, value];
  };  
  //new window.XMLHttpRequest()
  let xhr = settings.xhr();
  //复制请求头
  let nativeSetHeader = xhr.setRequestHeader;
  
  //没有跨域
  if ( !settings.crossDomain ) {
    setHeader('X-Requested-With', 'XMLHttpRequest');
  }
  
  //异步
  settings.aync = settings.aync === undefined ? true : settings.aync;

  //内容类型
  setHeader('Accept', '*/*');
  
  //不是get请求则添加请求头
  if ( settings.data && settings.type.toUpperCase() != 'GET' ) {
    setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');//post必须添加
  } 

  //设置请求头
  if ( settings.headers ){
    for (let name in settings.headers){
      setHeader(name, settings.headers[name]);
    }
  } 

  //设置到http请求头
  xhr.setRequestHeader = setHeader;

  //合并请求头
  return createXHRPromise(xhr , headers ,settings, nativeSetHeader ,map);
}

/**
 * [createXHRPromise 创建Promise xhr 请求]
 * @param  {[obj]} req             [xhr]
 * @param  {[obj]} headers         [请求头设置]
 * @param  {[obj]} settings        [参数设置对象]
 * @param  {[obj]} nativeSetHeader [原生请求头]
 * @return {[promise]}             [promise对象]
 */
function createXHRPromise(req , headers ,settings , nativeSetHeader , map){
  let abortTimeout;
  let end = ()=>{
    req.onreadystatechange = empty;
    clearTimeout(abortTimeout);
    map.remove(settings.url);
  };

  let promise = new Promise((resolve , reject)=>{
    req.onreadystatechange = ()=>{
      if ( req.readyState === 4 ){
        end();
        if ( (req.status >= 200 && req.status < 300) || req.status == 304 ){
          return resolve(req.responseText);
        }
        return reject([new Error('request error. abort or timeout could be make this.') , req , settings]);
      }
    };
    //打开请求
    req.open(settings.type, settings.url, settings.aync , settings.user, settings.password);
    
    for (let name in headers ) {
      nativeSetHeader.apply(req, headers[name]); //req请求参数
    }

    //设置请求超时
    if ( settings.timeout > 0 ) {
      abortTimeout = setTimeout(()=>{
        req.abort();
      }, settings.timeout);
    }

    //发送数据
    req.send(settings.data ? settings.data : null);
  });

  map.add(settings.url ,{
    promise : promise,
    request : req
  });
  return promise;
}

