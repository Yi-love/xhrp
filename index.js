(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["xhrp"] = factory();
	else
		root["xhrp"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var root = exports.root = window;
var document = exports.document = window.document;
var originAnchor = exports.originAnchor = document.createElement('a');
var location = exports.location = window.location;
originAnchor.href = location.href;
var escape = exports.escape = window.encodeURIComponent;
var head = exports.head = document.head || document.getElementsByTagName('head')[0];
var XMLHttpRequest = exports.XMLHttpRequest = window.XMLHttpRequest;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.extend = extend;
exports.merge = merge;
exports.likeArray = likeArray;
exports.isWindow = isWindow;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isString = isString;
exports.isType = isType;
exports.isPlainObject = isPlainObject;
function extend(target, source) {
  // Don't do anything if source isn't an object
  if (source === null || (typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') return target;

  var keys = Object.keys(source);
  var i = keys.length;
  while (i--) {
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
function merge(target, source) {
  if (source === null || (typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
    return target;
  }
  var keys = Object.keys(source);
  for (var i = 0; i < keys.length; i++) {
    if (target[keys[i]] === undefined) {
      target[keys[i]] = source[keys[i]];
    }
  }
  return target;
}

var class2type = {};

'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (name) {
  class2type['[object ' + name + ']'] = name.toLowerCase();
});
function likeArray(obj) {
  return typeof obj.length === 'number';
}
function isWindow(obj) {
  return obj != null && obj === obj.window;
}
function isFunction(value) {
  return isType(value) === 'function';
}
function isObject(obj) {
  return isType(obj) === 'object';
}
function isString(obj) {
  return isType(obj) === 'string';
}
function isType(obj) {
  return obj === null ? String(obj) : class2type[toString.call(obj)] || 'object';
}
function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.appendQuery = appendQuery;
exports.serializeData = serializeData;

var _util = __webpack_require__(1);

var _dom = __webpack_require__(0);

function appendQuery(url, query) {
  if (query === '') return url;
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
function param(obj, traditional) {
  var params = [];
  //定义添加函数
  params.add = function (key, value) {
    if ((0, _util.isFunction)(value)) {
      value = value(); //value是函数，执行函数
    }
    if (value === null) {
      value = ''; //为空
    }
    //以 '='链接key和value ，用encodeURIComponent()转义
    this.push((0, _dom.escape)(key) + '=' + (0, _dom.escape)(value));
  };
  //序列化
  serialize(params, obj, traditional);
  //以'&'链接 ,把空格转化成 '+'
  return params.join('&').replace(/%20/g, '+');
}

// 序列化负载并将它附加到GET请求的URL
function serializeData(options) {
  //序列化options.data
  //1.需要序列化数据
  //2.数据不为空
  //3.数据类型不为 string
  //traditional (默认： false): 激活传统的方式通过param来得到序列化的 data。
  if (options.processData && options.data && typeof options.data !== 'string') {
    options.data = param(options.data, options.traditional);
  }

  //是get , 或者没有传人type
  if (options.data && (!options.type || options.type.toUpperCase() === 'GET')) {
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
function forEach(elements, callback) {
  if ((0, _util.likeArray)(elements)) {
    for (var i = 0; i < elements.length; i++) {
      if (callback.call(elements[i], i, elements[i]) === false) {
        return elements;
      }
    }
  } else {
    for (var key in elements) {
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
function serialize(params, obj, traditional, scope) {
  var type = void 0;
  var array = Array.isArray(obj); //数组 
  var hash = (0, _util.isPlainObject)(obj); //对象

  forEach(obj, function (key, value) {
    //判断值的类型
    type = (0, _util.isType)(value);
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
    else if (type === 'array' || !traditional && type === 'object') {
        serialize(params, value, traditional, key);
      } else {
        params.add(key, value); //正常添加
      }
  });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.abortXhr = abortXhr;

var _dom = __webpack_require__(0);

function abortXhr(promise, map) {
  if (typeof promise === 'undefined') {
    return false;
  }
  var request = void 0;
  for (var req in map) {
    if (map[req].promise === promise) {
      request = map[req].request;
      break;
    }
  }
  if (request && (request.readyState !== _dom.XMLHttpRequest.UNSENT || request.jsonp)) {
    request.abort();
    return true;
  }
  return false;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createAjax = createAjax;

var _serialize = __webpack_require__(2);

var _dom = __webpack_require__(0);

var empty = function empty() {};

function createAjax(settings, map) {
  //没有传人ajax请求url
  if (!settings.url) {
    settings.url = _dom.originAnchor.href; //使用当前url
  }

  //判断是否跨域
  if (!settings.crossDomain) {
    //没有跨域
    var urlAnchor = _dom.document.createElement('a');
    urlAnchor.href = settings.url;
    // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
    urlAnchor.href = urlAnchor.href; //获取ajax请求的url
    //判断ajax请求是否跨域
    settings.crossDomain = _dom.originAnchor.protocol + '//' + _dom.originAnchor.host !== urlAnchor.protocol + '//' + urlAnchor.host;
  }

  //序列化数据 , formData格式以外的才序列化
  if (settings.processData && !(settings.data instanceof FormData)) {
    (0, _serialize.serializeData)(settings);
  }

  if (!settings.cache) {
    settings.url = (0, _serialize.appendQuery)(settings.url, '_=' + Date.now()); //添加时间戳
  }

  //请求头对象
  var headers = {};
  //请求头设置函数
  var setHeader = function setHeader(name, value) {
    headers[name.toLowerCase()] = [name, value];
  };
  //new window.XMLHttpRequest()
  var xhr = settings.xhr();
  //复制请求头
  var nativeSetHeader = xhr.setRequestHeader;

  //没有跨域
  if (!settings.crossDomain) {
    setHeader('X-Requested-With', 'XMLHttpRequest');
  }

  //异步
  settings.async = 'async' in settings ? settings.async : true;

  //内容类型
  setHeader('Accept', '*/*');

  //不是get请求则添加请求头 , 文件上传不使用Content-type
  if (settings.data && settings.type.toUpperCase() != 'GET' && !(settings.data instanceof FormData)) {
    setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded'); //post必须添加
  }

  //设置请求头
  if (settings.headers) {
    for (var name in settings.headers) {
      setHeader(name, settings.headers[name]);
    }
  }

  //设置到http请求头
  xhr.setRequestHeader = setHeader;

  //合并请求头
  return createXHRPromise(xhr, headers, settings, nativeSetHeader, map);
}

/**
 * [createXHRPromise 创建Promise xhr 请求]
 * @param  {[obj]} req             [xhr]
 * @param  {[obj]} headers         [请求头设置]
 * @param  {[obj]} settings        [参数设置对象]
 * @param  {[obj]} nativeSetHeader [原生请求头]
 * @return {[promise]}             [promise对象]
 */
function createXHRPromise(req, headers, settings, nativeSetHeader, map) {
  var abortTimeout = void 0;
  var end = function end() {
    req.onreadystatechange = empty;
    clearTimeout(abortTimeout);
    map.remove(settings.url);
  };

  var promise = new Promise(function (resolve, reject) {
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        end();
        if (req.status >= 200 && req.status < 300 || req.status == 304) {
          var response = 'response' in req ? req.response : req.responseText;
          return resolve(response);
        }
        return reject([new Error('request error. abort or timeout could be make this.'), req, settings]);
      }
    };
    //打开请求
    req.open(settings.type, settings.url, settings.async, settings.user, settings.password);

    for (var name in headers) {
      nativeSetHeader.apply(req, headers[name]); //req请求参数
    }

    //设置请求超时
    if (settings.timeout > 0) {
      abortTimeout = setTimeout(function () {
        req.abort();
      }, settings.timeout);
    }

    //发送数据
    req.send(settings.data ? settings.data : null);
  });

  map.add(settings.url, {
    promise: promise,
    request: req
  });
  return promise;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createJsonp = createJsonp;

var _util = __webpack_require__(1);

var _serialize = __webpack_require__(2);

var _dom = __webpack_require__(0);

var jsonpID = 0;
var empty = function empty(callbackName) {
  return function () {
    delete _dom.root[callbackName];
  };
};
var jsonpCallbackPrefix = 'xhrp_jsonp_';
/**
 * [trigger 触发事件]
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function trigger(element, event) {
  if (!(0, _util.isString)(event)) {
    return;
  }
  if (element.dispatchEvent) {
    var evt = _dom.document.createEvent('Events'); // initEvent接受3个参数
    evt.initEvent(event, true, true);
    element.dispatchEvent(evt);
  } else if (element.fireEvent) {
    //IE
    element.fireEvent('on' + event);
  } else {
    element['on' + event]();
  }
}

function createJsonp(settings, map) {
  //没有传人ajax请求url
  if (!settings.url) {
    settings.url = _dom.originAnchor.href; //使用当前url
  }
  var params = void 0;
  if (settings.params) {
    //设置script属性
    params = (0, _util.extend)({}, settings.params);
    delete settings.params;
  }

  //序列化数据
  if (settings.processData) {
    (0, _serialize.serializeData)(settings);
  }

  var jsonp = settings.jsonp;
  if (++jsonpID === Infinity) {
    jsonpID = 0;
  }
  var callbackName = jsonpCallbackPrefix + ++jsonpID;
  var script = _dom.document.createElement('script');
  var response = void 0;
  var abortTimeout = void 0;
  var isAbort = false;
  var abort = function abort() {
    isAbort = true;
    return trigger(script, 'error');
  };
  var req = { jsonp: jsonp, abort: abort };
  settings.url = (0, _serialize.appendQuery)((0, _serialize.appendQuery)(settings.url, jsonp + '=' + callbackName), '_=' + Date.now());
  //添加src并添加到head
  script.src = settings.url;
  for (var attr in params) {
    script.setAttribute(attr, params[attr]);
  }
  var end = function end(e) {
    e.preventDefault();
    e.stopPropagation();
    clearTimeout(abortTimeout);
    map.remove(settings.url);
    if (_dom.root[callbackName]) {
      if (!isAbort) {
        delete _dom.root[callbackName];
      } else {
        _dom.root[callbackName] = empty(callbackName);
      }
    }
    if (script) {
      script.remove();
    }
  };
  function loadCallback(resolve) {
    return function (e) {
      end(e);
      return resolve(response);
    };
  }
  function errorCallback(reject) {
    return function (e) {
      end(e);
      return reject([e instanceof Error ? e : new Error('jsonp error. abort or timeout could be make this.'), req, settings]);
    };
  }
  var promise = new Promise(function (resolve, reject) {
    script.onload = loadCallback(resolve);
    script.onerror = errorCallback(reject);
    //callback函数注册到window
    _dom.root[callbackName] = function () {
      response = Array.prototype.slice.call(arguments);
    };
    //是否存在超时
    if (settings.timeout > 0) {
      abortTimeout = setTimeout(function () {
        req.abort();
      }, settings.timeout);
    }
    if (script) {
      _dom.head.appendChild(script);
    }
  });

  map.add(settings.url, {
    promise: promise,
    request: req
  });

  return promise;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.abort = undefined;
exports.jsonp = jsonp;
exports.ajax = ajax;
exports.get = get;
exports.post = post;

var _util = __webpack_require__(1);

var _jsonp = __webpack_require__(5);

var _ajax = __webpack_require__(4);

var _abort = __webpack_require__(3);

var _dom = __webpack_require__(0);

var requestMap = {};
requestMap.add = function (url, req) {
  requestMap[url] = req;
};
requestMap.remove = function (url) {
  if (requestMap[url]) {
    delete requestMap[url];
  }
};

var baseSettings = {
  //请求类型
  type: 'GET',
  //是否跨域
  crossDomain: false, //ineffect of jsonp ,please set params
  //超时设置  默认不超时
  timeout: 0,
  //数据需要被序列化
  processData: true,
  //对get请求数据进行缓存
  cache: true
};

var jsonpSettings = (0, _util.extend)({ jsonp: 'callback' }, baseSettings);
var ajaxSettings = (0, _util.extend)({}, baseSettings);
ajaxSettings.xhr = function () {
  return new _dom.XMLHttpRequest();
};

function normalizeArgs(url, options) {
  options = options && (0, _util.isObject)(options) ? options : {};
  if ((0, _util.isString)(url)) {
    options.url = url;
  } else if ((0, _util.isObject)(url)) {
    options = url;
  }
  return options;
}

function jsonp(url, options) {
  var settings = (0, _util.extend)({}, normalizeArgs(url, options));
  return (0, _jsonp.createJsonp)((0, _util.merge)(settings, jsonpSettings), requestMap);
}

function ajax(options) {
  var settings = (0, _util.extend)({}, options || {});
  return (0, _ajax.createAjax)((0, _util.merge)(settings, ajaxSettings), requestMap);
}
function get(url, options) {
  options = normalizeArgs(url, options);
  return ajax((0, _util.extend)(options, { type: 'GET' }));
}

function post(url, options) {
  options = normalizeArgs(url, options);
  return ajax((0, _util.extend)(options, { type: 'POST' }));
}

function createAbort(map) {
  return function (promise) {
    return (0, _abort.abortXhr)(promise, map);
  };
}
var abort = exports.abort = createAbort(requestMap);

/***/ })
/******/ ]);
});