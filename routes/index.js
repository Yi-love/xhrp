var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Promise test' });
});
router.get('/getu' , function(req , res , next){
	 var data = req.query.errdata
	 console.log('errdata : ' , data)
	 res.send()
});
router.get('/getjson' , function(req , res , next){
	res.send({a:'Jin',b:'soul'})
});
module.exports = router;
