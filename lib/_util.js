'use strict';

export function extend(target, source) {
  // Don't do anything if source isn't an object
  if ( source === null || typeof source !== 'object' ) return target;

  let keys = Object.keys(source);
  let i = keys.length;
  while ( i-- ) {
    target[keys[i]] = source[keys[i]];
  }
  return target;
}

/**
 * [mergeSettings 合并默认设置和用户的设置]
 * @param  {[type]} target [description]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
export function merge(target , source){
  if ( source === null || typeof source !== 'object' ){
    return target;
  }
  let keys = Object.keys(source);
  for (let i = 0 ; i < keys.length ; i++ ) {
    if ( target[keys[i]] === undefined ){
      target[keys[i]] = source[keys[i]];
    }
  }
  return target;
}

let class2type = {};

'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name){
  class2type['[object '+name+']'] = name.toLowerCase();
});
export function likeArray(obj) { 
  return typeof obj.length === 'number';
}
export function isWindow(obj) { 
  return obj != null && obj === obj.window;
}
export function isFunction( value ){ 
  return isType(value) === 'function';
}
export function isObject(obj){ 
  return isType(obj) === 'object';
}
export function isString( obj ){ 
  return isType(obj) === 'string';
}
export function isType(obj){ 
  return obj === null ? String(obj) : class2type[toString.call(obj)] || 'object';
}
export function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}