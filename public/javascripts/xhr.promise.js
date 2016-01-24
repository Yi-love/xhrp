/**
 *  XMLHttpRequest Promise
 * Jin 
 * ie 8+
 * 2016/01/24
 * v0.0.1
 * dep : fix.js  --- ie8
 * dep : npo.src.js --- base
 * @param {Object} name
 * @param {Object} context
 * @param {Object} definition
 */

(function UMD(name,context,definition){
	// special form of UMD for polyfilling across evironments
	context[name] = context[name] || definition();
	if (typeof module != "undefined" && module.exports) { module.exports = context[name]; }
	else if (typeof define == "function" && define.amd) { define(function $AMD$(){ return context[name]; }); }
})("XHRP",typeof global != "undefined" ? global : this,function(){
	
	"use strict";
	
	var jsonpID = 0,
      	document = window.document,
      	escape = encodeURIComponent,
      	originAnchor = document.createElement('a'),
		requestMap = {},
		class2type = {} ,
		head = document.head || document.getElementsByTagName('head')[0] ,
		toString = class2type.toString,
		isArray = Array.isArray || function(object){ return object instanceof Array };
	
	originAnchor.href = window.location.href;

	if (typeof Promise.prototype.done === "undefined") {
	    Promise.prototype.done = function (onFulfilled, onRejected) {
	        this.then(onFulfilled, onRejected)['catch'](function (error) {
	            setTimeout(function () {
	                throw error;
	            }, 0);
	        });
	    };
	};
	if ( typeof Object.getPrototypeOf !== "function" ) {
	  	if ( typeof "test".__proto__ === "object" ) {
	    	Object.getPrototypeOf = function(object){
	      		return object.__proto__;
	    	};
	  	} else {
	    	Object.getPrototypeOf = function(object){
	      		return object.constructor.prototype;// May break if the constructor has been tampered with
	    	};
        };
	};
	/**
	 * [类型判断]
	 */
	;"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(name){
		class2type["[object "+name+"]"] = name.toLowerCase();
	});
	function likeArray(obj) { return typeof obj.length == 'number' };
	function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE };
	function isWindow(obj) { return obj != null && obj == obj.window };
	function isFunction( value ){	return isType(value) == 'function'};
	function isObject(obj){ return isType(obj) == "object" };
	function isString( obj ){ return isType(obj) == 'string'};
	function isType(obj){	return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object'};
	function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
	};
	function empty() {};
	function extend(target , source){
		for( var key in source ){
			if ( source[key] != undefined )
				target[key] = source[key];
		}
		return target;
	};
	function appendQuery(url, query) {
	  	if (query == '') return url;
	  	return (url + '&' + query).replace(/[&?]{1,2}/, '?');
	};
	/**
	* 参数化
	* @param {Object} obj   需要参数化的对象
	* @param {Object} traditional 表示是否以传统的方式拼接数据，
	*/
	function param(obj, traditional){
	    var params = [];
	    params.add = function(key, value) { //定义添加函数
	     	if (isFunction(value)) value = value() //value是函数，执行函数
	      	if (value == null) value = ""  //为空
	      	this.push(escape(key) + '=' + escape(value)) //以 '='链接key和value ，用encodeURIComponent()转义
	    }
	    serialize(params, obj, traditional) //序列化
	    return params.join('&').replace(/%20/g, '+') //以'&'链接 ,把空格转化成 '+'
	};
	// serialize payload and append it to the URL for GET requests
	// 序列化负载并将它附加到GET请求的URL
	function serializeData(options) {
		//序列化options.data
		//1.需要序列化数据
		//2.数据不为空
		//3.数据类型不为 string
		//traditional (默认： false): 激活传统的方式通过param来得到序列化的 data。
	  	if (options.processData && options.data && typeof (options.data) != "string" )
	    	options.data = param(options.data, options.traditional);
	   
	  	//是get , 或者没有传人type
	  	if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
	    	options.url = appendQuery(options.url, options.data), options.data = undefined;
	};
	/**
	 * forEach
	 * @param {Object} elements
	 * @param {Object} callback
	 */
	function forEach(elements, callback){
	    var i, key;
	    if (likeArray(elements)) {
	        for (i = 0; i < elements.length; i++)
	        	if (callback.call(elements[i], i, elements[i]) === false) return elements;
	    } else {
	      	for (key in elements)
	        	if (callback.call(elements[key], key, elements[key]) === false) return elements;
	    }
	    return elements;
	};
	/**
	* 序列化
	* @param {Object} params [] 最后生成的参数数组
	* @param {Object} obj       需要序列化的对象
	* @param {Object} traditional  表示是否以传统的方式拼接数据
	* @param {Object} scope   表示范围
	*/
	function serialize(params, obj, traditional, scope){
	    var type, 
	    	array = isArray(obj), //数组 
	    	hash = isPlainObject(obj); //对象
	    forEach(obj, function(key, value) {
	    	//判断值的类型
	      	type = isType(value);
	      	//scope用作处理value也是object或者array的情况
	      	//传统的意思就是比如现有一个数据{a:[1,2,3]},转成查询字符串后结果为'a=1&a=2&a=3'
	      	//非传统的的结果则是a[]=1&a[]=2&a[]=3
	      	if (scope) {  //
	      		key = traditional ? //
	      		scope :
	        	scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
	        }
	      	// handle data in serializeArray() format
	      	if (!scope && array) params.add(value.name, value.value);
	      	// recurse into nested objects
	      	//当value值是数组或者是对象且不是按传统的方式序列化的时候，需要再次遍历value
	      	else if (type == "array" || (!traditional && type == "object"))
	        	serialize(params, value, traditional, key);
	      	else params.add(key, value); //正常添加
	    });
	};
	/**
	 * [trigger 触发事件]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	function trigger(element,event){
		if( !isString(event) ) return;
		if ( element.dispatchEvent ){
			var evt = document.createEvent( 'Events' );// initEvent接受3个参数
			evt.initEvent(event, true, true);
			element.dispatchEvent(evt);
		}else if ( element.fireEvent ){ //IE
			element.fireEvent('on'+event);
		}
	};
	function jsonp(options){
		var settings = extend({}, options || {});
		//合并默认设置和用户的设置
    	for (var key in ajaxSettings) if (settings[key] === undefined) settings[key] = ajaxSettings[key];
		//没有传人ajax请求url
	    if (!settings.url) settings.url = window.location.toString();//使用当前url

	    serializeData(settings);

	    var callbackName = settings.jsonp ? settings.jsonp : 'callback',
	    	_callbackName = 'jsonp'+(++jsonpID),
	    	script = document.createElement('script'),
	    	abort = function(){trigger(script , 'error');},
	    	req = {jsonp:true ,abort : abort},
	    	responseData,abortTimeout;
	  
	    settings.url = appendQuery(appendQuery(settings.url, callbackName+'='+_callbackName), '_=' + (+new Date()));
		//添加src并添加到head
	    script.src = settings.url;

	    var promise = new Promise(function(resolve , reject){
	    	script.onload = function(){
	    		clearTimeout(abortTimeout);
	    		resolve(responseData);
	    		window[_callbackName] = undefined;
	    		delete requestMap[settings.url];
	    		script.remove();
	    	};
	    	script.onreadystatechange = function(){ //兼容 ie8
	    		if (script.readyState === 'loaded' || script.readyState === 'complete' ){
	    			clearTimeout(abortTimeout);
	    			resolve(responseData);
	    			window[_callbackName] = undefined;
	    			delete requestMap[settings.url];
	    			script.parentNode.removeChild(script);
	    		}
	    	};
	    	script.onerror = function(){
	    		clearTimeout(abortTimeout);
	    		reject('jsonp:error');
	    		delete requestMap[settings.url];
	    	    script.parentNode.removeChild(script);
	    	};
	    	window[_callbackName] = function(){//callback函数注册到window
		      responseData = arguments;
		    };
		    head.appendChild(script);
			  //是否存在超时
		    if ( settings.timeout > 0 ){
		    	abortTimeout = setTimeout(function(){
		    		req.abort();
		    	}, settings.timeout);
		    };
	    });
	    requestMap[settings.url] = {
			promise : promise,
			request : req
		}
	    return promise;
	};

	var ajaxSettings = {
		//请求类型
		type :'GET',
		//xhr
		xhr : function(){
			return new window.XMLHttpRequest()
		},
	    //是否跨域
    	crossDomain: false,
	    //超时设置  默认不超时
        timeout: 0,
        //数据需要被序列化
        processData: true,
        //对get请求数据进行缓存
        cache: true
	};

	function ajax(options){
		//数据类型
	    var dataType = options.dataType;
	    if( dataType === 'jsonp' ) return jsonp(settings);

		var settings = extend({}, options || {}) , urlAnchor;
		//合并默认设置和用户的设置
    	for (var key in ajaxSettings) if (settings[key] === undefined) settings[key] = ajaxSettings[key];
		//没有传人ajax请求url
	    if (!settings.url) settings.url = window.location.toString();//使用当前url

	    //判断是否跨域
	    if (!settings.crossDomain) { //没有跨域
	    	urlAnchor = document.createElement('a');
	      	urlAnchor.href = settings.url;
	      	// cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
	      	urlAnchor.href = urlAnchor.href; //获取ajax请求的url
	      	//判断ajax请求是否跨域
	      	settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host);
	    }
	    //序列化数据
	    serializeData(settings);

	    if (settings.cache === false)
        	settings.url = appendQuery(settings.url, '_=' + Date.now());//添加时间戳

        //请求头对象
	    var headers = {},
	        //请求头设置函数
	        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },   
	        //new window.XMLHttpRequest()
	        xhr = settings.xhr(),
	        //复制请求头
	        nativeSetHeader = xhr.setRequestHeader;
	    //没有跨域
	    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest');
	    //设置请求头
    	setHeader('Accept', '*/*');
	    //内容类型  
	    if ( settings.data && settings.type.toUpperCase() != 'GET' ) //不是get请求则添加请求头
	        setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');//post必须添加

	    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]) //合并请求头
	        xhr.setRequestHeader = setHeader; //设置到http请求头

	    return createXHRPromise(xhr , headers ,settings, nativeSetHeader);
	};
	/**
	 *  ajax Promise对象
	 * @param {Object} req
	 * @param {Object} headers
	 * @param {Object} settings
	 * @param {Object} nativeSetHeader
	 */
	function createXHRPromise(req , headers ,settings , nativeSetHeader){
		var abortTimeout;
		var promise = new Promise(function(resolve , reject){
			req.onreadystatechange = function(){
				if (req.readyState === 4 ){
					req.onreadystatechange = empty;
					clearTimeout(abortTimeout);
					if ( req.status === 200 && req.status < 300 || req.status === 304 ){
						resolve(req.responseText);
					} else{
						reject('ajax:error');
					}
					delete requestMap[settings.url];
				}
			}
			req.onabort = function(){reject('ajax:abort');}
			req.open(settings.type, settings.url, true, settings.username, settings.password); //打开请求
			for (var  name in headers ) nativeSetHeader.apply(req, headers[name]); //req请求参数
			if ( settings.timeout > 0) {
				abortTimeout = setTimeout(function(){  //设置请求超时
					req.onreadystatechange = empty;
					req.abort();
					reject('ajax:timeout');
		        }, settings.timeout);
			};
	    	req.send(settings.data ? settings.data : null); //发送数据
		});
		requestMap[settings.url] = {
			promise : promise,
			request : req
		}
		return promise;
	};
	/**
	 * abort  Promise 模拟abort
	 * @param {Object} promise
	 */
	function abortPromise(promise){
		if (typeof promise === 'undefined') return;
		var request;
		for ( var req in requestMap ){
			if ( requestMap[req].promise === promise ){
				request = requestMap[req].request;
				break;
			}
		}
		if ( request != null && (request.readyState !== XMLHttpRequest.UNSENT || request.jsonp) ){
			request.abort();
		};
	};
	
	/**
	 * 提供的外部接口
	 */
	return {
		ajax : function(options){ //普通的ajax
			return isObject(options) ? ajax(options) : null;
		},
		jsonp : function(options){//jsonp
			return isObject(options) ? jsonp(options) : null;
		},
		abort : function(promise){// abort
			return typeof promise != 'undefined' ? abortPromise(promise) : '';
		} 
	};
});

