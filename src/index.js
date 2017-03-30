'use strict';
import {extend , merge} from './../lib/_util.js';
import {createJsonp} from './../lib/jsonp.js';
import {createAjax} from './../lib/ajax.js';
import {abortXhr} from './../lib/abort.js';
import {XMLHttpRequest} from './../lib/dom.js';

const requestMap = {};
requestMap.add = (url , req)=>{
  requestMap[url] = req;
};
requestMap.remove = (url)=>{
  if ( requestMap[url] ) {
    delete requestMap[url];
  }
};

let baseSettings = {
  //请求类型
  type :'GET',
  //是否跨域
  crossDomain: false, //ineffect of jsonp ,please set params
  //超时设置  默认不超时
  timeout: 0,
  //数据需要被序列化
  processData: true,
  //对get请求数据进行缓存
  cache: false
};

let jsonpSettings = extend({jsonp:'callback'} , baseSettings);
let ajaxSettings = extend({} , baseSettings);
ajaxSettings.xhr = ()=>{
  return new XMLHttpRequest();
};

export function jsonp(options) {
  let settings = extend({} , options || {});
  return createJsonp(merge(settings, jsonpSettings) , requestMap);
}

export function ajax( options ){
  let settings = extend({} , options || {});
  return createAjax(merge(settings, ajaxSettings) , requestMap);
}
export function get( options ) {
  return ajax(extend(options , {type:'GET'}));
}

export function post( options ) {
  return ajax(extend(options , {type:'POST'}));
}

function createAbort(map){
  return (promise)=>{
    return abortXhr(promise , map);
  };
}
export let abort = createAbort(requestMap);
