/**
 * IE 6 7 8 数组修复 
 * @return {[type]} [description]
 */
(function() {
	/**
	 * [indexOf  查找数组是否有这一项]
	 * @param  {[type]} item  [搜索项]
	 * @param  {[type]} index [从该下标开始]
	 * @return {[type]}       [description]
	 */
	Array.prototype.indexOf = function(item , index) {
		var n = this.length , i = ~~index;//~~一种利用符号进行的类型转换,转换成数字类型
		i = i < 0 ? Math.max(0 , n+i) : i;
		for ( ; i < n ; i++ ) {
			if (this[i] === item ) {
				return i;
			}
		}
		return -1;
	};

	/**
	 * [lastIndexOf 查找数组是否有这一项]
	 * @param  {[type]} item  [description]
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	Array.prototype.lastIndexOf = function(item , index) {
		var n = this.length , i = index == null ? n-1 : index;
		i < 0 ? Math.max(0 , n+i) : i;
		for ( ; i >= 0 ; i-- ) {
			if ( this[i] === item ) {
				return i;
			}
		}
		return -1;
	};

	/**
	 * [reduce 归纳]
	 * @param  {Function} fn            [操作函数]
	 * @param  {[type]}   previousValue [初始值]
	 * @param  {[type]}   scope      [description]
	 * @return {[type]}              [description]
	 */
	Array.prototype.reduce = function(fn , previousValue , scope) {
		if ( this.length == 0 ) return previousValue;
		var i = previousValue !== undefined ? 0 : 1;
		var result = previousValue !== undefined ? previousValue : this[0];
		for ( var n = this.length ; i < n ; i++ ) {
			result = fn.call(scope , result , this[i] , i , this);
		};
		return result;
	};

	/**
	 * [reduceRight 从右归纳]
	 * @param  {Function} fn            [操作函数]
	 * @param  {[type]}   previousValue [初始值]
	 * @param  {[type]}   scope         [description]
	 * @return {[type]}                 [description]
	 */
	Array.prototype.reduceRight = function(fn , previousValue , scope) {
		var arr = this.concat().reverse();
		return arr.reduce(fn , previousValue , scope);
	};

	/**
	 * [iterator： forEach ,map , filter , some , every方法的结构生成器]
	 * @param  {[type]} vars [声明]
	 * @param  {[type]} body [op]
	 * @param  {[type]} ret  [返回]
	 * @return {[type]}      [description]
	 */
	function iterator(vars , body , ret) {
		var fun = 'for (var '+ vars +'i = 0 , n = this.length ; i < n ; i++ ) {' +
					body.replace('_' , '(( i in this ) && fn.call(scope , this[i] , i , this))') +
					'}' + ret;
		return Function('fn , scope' , fun);
	};

	/**
	 * [forEach 数组遍历]
	 * @type {[type]}
	 */
	Array.prototype.forEach = iterator('' , '_' , '');
	/**
	 * [iterator 数字过滤]
	 * @param  {Array}  'r [description]
	 * @param  {[type]} '  if            (_ [description]
	 * @return {[type]}    [description]
	 */
	Array.prototype.filter = iterator('r = [] , j = 0 ,' , ' if (_) { r[j++] = this[i]; }' , 'return r;');
	/**
	 * [map 对于数组中的每个元素，map 方法都会调用 callbackfn 函数一次（采用升序索引顺序）。
	 *  将不会为数组中缺少的元素调用回调函数。除了数组对象之外，map 方法可由具有 length 属性
	 *  且具有已按数字编制索引的属性名的任何对象使用。]
	 * @type {[type]}
	 */
	Array.prototype.map = iterator('r = [] ,' , 'r[i] = _' , 'return r;');
	/**
	 * [iterator 存在item]
	 * @param  {[type]} ''  [description]
	 * @param  {[type]} 'if (_            [description]
	 * @return {[type]}     [description]
	 */
	Array.prototype.some = iterator('' , 'if (_) { return true ;}' , 'return false;');
	/**
	 * [iterator 全部有]
	 * @param  {[type]} ''  [description]
	 * @param  {[type]} 'if (!_           [description]
	 * @return {[type]}     [description]
	 */
	Array.prototype.every = iterator('' , 'if (!_) {return false ;}' , 'return true;');

	/**
	 * [unshift 修复  ie  6 7]
	 * @param  {[type]} [].unshift(1) !             [description]
	 * @return {[type]}               [description]
	 */
	if ( [].unshift(1) !== 1 ) { //ie 6 7 不返回数组长度问题修复
		var _unshift = Array.prototype.unshift;
		Array.prototype.unshift = function(){
			_unshift.apply(this , arguments);
			return this.length;
		};
	};

	/**
	 * [splice ie 6 7 8 修复]
	 * @param  {[type]} [1                  [description]
	 * @param  {[type]} 2                   [description]
	 * @param  {[type]} 3].splice(1).length [description]
	 * @return {[type]}                     [description]
	 */
	if ( [1 , 2 , 3].splice(1).length == 0 ){ //ie 6 7 8 splice 第二个参数默认为 0  其他浏览器默认为数组长度
		var _splice = Array.prototype.splice;
		Array.prototype.splice = function(a){
			if ( arguments.length == 1 ){
				return _splice.call(this, a , this.length);
			} else {
				return _splice.apply(this , arguments);
			}
		};
	};
})()