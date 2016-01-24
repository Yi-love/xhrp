var xp = XHRP.jsonp({
	url :'https://api.dotdotbuy.com/run/go/rest?prefix=TB&cid=50012906&title=%E6%9C%A8%E6%9E%97%E6%A3%AE%E6%AD%A3%E5%93%81+%E6%96%B0%E6%AC%BE%E7%94%B7%E5%A3%AB%E8%8B%B1%E4%BC%A6%E7%B3%BB%E5%B8%A6%E7%9C%9F%E7%9A%AE%E9%9E%8B+%E5%95%86%E5%8A%A1%E6%AD%A3%E8%A3%85%E7%94%B7%E9%9E%8Bmm41262803&biz_method=verify_goods',
	jsonp:'jsonp'
}).done(function(data){
	document.getElementById('jsonp').innerHTML = JSON.stringify(data[0]);
});
var xp2 = XHRP.ajax({
	url :'/getjson',
	data : {a : 'jin',b:'soul'}
}).done(function(data){
	document.getElementById('json').innerHTML = data;
});

var req = {
	jsonp : function(){
		return  XHRP.jsonp({
					url :'https://api.dotdotbuy.com/run/go/rest?prefix=TB&cid=50012906&title=%E6%9C%A8%E6%9E%97%E6%A3%AE%E6%AD%A3%E5%93%81+%E6%96%B0%E6%AC%BE%E7%94%B7%E5%A3%AB%E8%8B%B1%E4%BC%A6%E7%B3%BB%E5%B8%A6%E7%9C%9F%E7%9A%AE%E9%9E%8B+%E5%95%86%E5%8A%A1%E6%AD%A3%E8%A3%85%E7%94%B7%E9%9E%8Bmm41262803&biz_method=verify_goods',
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

