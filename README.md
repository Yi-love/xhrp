# xhr-promise
XMLHttpRequest promise

   var req = {
		jsonp : function(){
			return  XHRP.jsonp({
						url :'https://g.exp.com/testjsonp',
						jsonp:'jsonp'
					}).then(JSON.stringify)
		},
		json : function(){
			return XHRP.ajax({
						url :'/getjson',
						data : {a : 'jin',b:'soul'}
					}).then(JSON.parse)
		}
	};
	function main(){
		return Promise.all([req.jsonp(),req.json()]);
	}
	// 运行示例
	main().then(function (value) {
	    document.getElementById('all').innerHTML = value;
	})['catch'](function(error){
	    console.log(error);
	});
