window.onerror = function(message , url , line ){
	console.log('getu:',message,url,line ,new Date());
	var data = JSON.stringify({msg : message , url : url , line : line});
	(new Image()).src = '/getu?errdata='+data;
}
