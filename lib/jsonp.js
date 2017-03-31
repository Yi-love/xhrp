'use strict';

import {isString , extend} from './_util.js';
import {serializeData , appendQuery} from './serialize.js';
import {root , document , originAnchor,head} from './dom.js';

let jsonpID = 0;
const empty = (callbackName)=>{
  return ()=>{
      if ( root[callbackName] ) {
        delete root[callbackName];
      }
  };
};
const jsonpCallbackPrefix = 'xhrp_jsonp_';
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
    let evt = document.createEvent('Events');// initEvent接受3个参数
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
  if ( ++jsonpID === Infinity ) {
    jsonpID = 0;
  }
  let callbackName = jsonpCallbackPrefix+(++jsonpID);
  let script = document.createElement('script');
  let response;
  let abortTimeout;
  let isAbort = false;
  let abort = ()=>{ 
    isAbort = true; 
    return trigger(script , 'error');
  };
  let req = {jsonp:jsonp ,abort : abort};
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
    if ( root[callbackName] ){
      if ( !isAbort ) {
        delete root[callbackName];
      }else{
        root[callbackName] = empty(callbackName);
      }
    }
    if ( script ) {
      script.remove();
    }
  };
  function loadCallback(resolve){
    return (e)=>{
      end(e);
      return resolve(response);
    };
  }
  function errorCallback(reject){
    return (e)=>{
      end(e);
      return reject([e instanceof Error ? e : new Error('jsonp error. abort or timeout could be make this.') , req , settings]);
    };
  }
  let promise = new Promise((resolve , reject)=>{
    script.onload = loadCallback(resolve);
    script.onerror = errorCallback(reject);
    //callback函数注册到window
    root[callbackName] = function(){
      response = Array.prototype.slice.call(arguments);
    };   
    //是否存在超时
    if ( settings.timeout > 0 ){
      abortTimeout = setTimeout(function(){
        req.abort();
      }, settings.timeout);
    }
    if ( script ) {
      head.appendChild(script);
    }
  });

  map.add(settings.url ,{
    promise : promise,
    request : req
  });

  return promise;
}