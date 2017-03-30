'use strict';

import {isString , extend} from './_util.js';
import {serializeData , appendQuery} from './serialize.js';
import {root , document , originAnchor,head} from './dom.js';

let jsonpID = 0;
const empty = ()=>{};
const jsonpCallbackPrefix = 'xhrp-jsonp-';
/**
 * [trigger 触发事件]
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function trigger(element,event){
  if( !isString(event) ) {
    return;
  }
  if ( element.dispatchEvent ){
    let evt = document.createEvent( 'Events' );// initEvent接受3个参数
    evt.initEvent(event, true, true);
    element.dispatchEvent(evt);
  }else if ( element.fireEvent ){ //IE
    element.fireEvent('on'+event);
  }else{
    element['on'+event]();
  }
}

export function createJsonp(settings , map){
  //没有传人ajax请求url
  if ( !settings.url ) {
    settings.url = originAnchor.href;//使用当前url
  }
  let params;
  if ( settings.params ) { //设置script属性
    params = extend({} , settings.params);
    delete settings.params;
  }

  //序列化数据
  if ( settings.processData ) {
    serializeData(settings);
  }

  let jsonp = settings.jsonp;
  let callbackName = jsonpCallbackPrefix+(++jsonpID);
  let script = document.createElement('script');
  let abort = ()=>{ return trigger(script , 'error');};
  let req = {jsonp:jsonp ,abort : abort};
  let response;
  let abortTimeout;
  settings.url = appendQuery(appendQuery(settings.url, jsonp+'='+callbackName), '_='+Date.now());
  //添加src并添加到head
  script.src = settings.url;
  for ( let attr in params ){
    script.setAttribute(attr,params[attr]);
  }
  let end = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    clearTimeout(abortTimeout);
    map.remove(settings.url);
  };
  function loadCallback(resolve){
    return (e)=>{
      end(e);
      delete root[callbackName];
      script.remove();
      return resolve(response);
    };
  }
  function errorCallback(reject){
    return (e)=>{
      end(e);
      root[callbackName] = empty;
      script.parentNode.removeChild(script);
      return reject('jsonp error. reason: '+e , req , settings);
    };
  }
  let promise = new Promise((resolve , reject)=>{
    script.onload = loadCallback(resolve);
    script.onerror = errorCallback(reject);

    //callback函数注册到window
    root[callbackName] = ()=>{
      response = arguments;
    };   
    //是否存在超时
    if ( settings.timeout > 0 ){
      abortTimeout = setTimeout(function(){
        req.abort();
      }, settings.timeout);
    }
    head.appendChild(script);
  });

  map.add(settings.url ,{
    promise : promise,
    request : req
  });

  return promise;
}