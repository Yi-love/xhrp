'use strict';

import {isFunction , likeArray , isPlainObject , isType} from './_util.js';
import {escape} from './dom.js';

export function appendQuery(url, query) {
  if ( query === '' ) return url;
  return (url + '&' + query).replace(/[&?]{1,2}/, '?');
}
/**
* 
* @param {Object} obj   
* @param {Object} traditional 
*/
/**
 * [param 参数化]
 * @param  {[obj]} obj         [需要参数化的对象]
 * @param  {[obj]} traditional [表示是否以传统的方式拼接数据，]
 * @return {[string]}             [序列化好的数据]
 */
function param(obj, traditional){
  let params = [];
  //定义添加函数
  params.add = function(key, value){
    if ( isFunction(value) ) {
      value = value(); //value是函数，执行函数
    }
    if ( value === null ){
      value = '';  //为空
    }
    //以 '='链接key和value ，用encodeURIComponent()转义
    this.push(escape(key) + '=' + escape(value));
  };
  //序列化
  serialize(params, obj, traditional);
  //以'&'链接 ,把空格转化成 '+'
  return params.join('&').replace(/%20/g, '+');
}

// 序列化负载并将它附加到GET请求的URL
export function serializeData(options) {
  //序列化options.data
  //1.需要序列化数据
  //2.数据不为空
  //3.数据类型不为 string
  //traditional (默认： false): 激活传统的方式通过param来得到序列化的 data。
  if ( options.processData && options.data && typeof (options.data) !== 'string' ){
    options.data = param(options.data, options.traditional);
  }
 
  //是get , 或者没有传人type
  if ( options.data && (!options.type || options.type.toUpperCase() === 'GET') ){
    options.url = appendQuery(options.url, options.data);
    options.data = undefined;
  }
}

/**
 * [forEach description]
 * @param  {[type]}   elements [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function forEach(elements, callback){
  if ( likeArray(elements) ) {
    for (let i = 0; i < elements.length; i++ ){
      if ( callback.call(elements[i], i, elements[i]) === false ) {
        return elements;
      }
    }
  } else {
    for ( let key in elements ){
      if (callback.call(elements[key], key, elements[key]) === false) {
        return elements;
      }
    }
  }
  return elements;
}

/**
 * [serialize 序列化]
 * @param  {[type]} params      [最后生成的参数数组]
 * @param  {[type]} obj         [需要序列化的对象]
 * @param  {[type]} traditional [表示是否以传统的方式拼接数据]
 * @param  {[type]} scope       [表示范围]
 * @return {[type]}             [description]
 */
function serialize(params, obj, traditional, scope){
  let type;
  let array = Array.isArray(obj); //数组 
  let hash = isPlainObject(obj); //对象

  forEach(obj, (key, value)=>{
    //判断值的类型
    type = isType(value);
    //scope用作处理value也是object或者array的情况
    //传统的意思就是比如现有一个数据{a:[1,2,3]},转成查询字符串后结果为'a=1&a=2&a=3'
    //非传统的的结果则是a[]=1&a[]=2&a[]=3
    if (scope) {
      key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
    }
    // handle data in serializeArray() format
    if (!scope && array) {
      params.add(value.name, value.value);
    }
    //当value值是数组或者是对象且不是按传统的方式序列化的时候，需要再次遍历value
    else if ( type === 'array' || (!traditional && type === 'object') ) {
      serialize(params, value, traditional, key);          
    }else {
      params.add(key, value); //正常添加
    }
  });
}


