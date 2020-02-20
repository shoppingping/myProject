var express = require('express');
var router = express.Router();

//接收get请求
router.get('/', function(req,res,next){
	let name = req.query.name;
	let sql = 'SELECT * FROM instrument ';
	if (name) {
		let namesql = 'WHERE name REGEXP '+'"'+name+'"';
		sql = 'SELECT * FROM instrument '+ namesql;
	}
	console.log(sql)	
	req.getConnection(function(err, conn){
		if(err) {
			return next(err);
		} else {
			conn.query(sql, [], function(err,result){
				if (err) {
					return next(err);
				} else {
					res.json({
						status:'0',
						msg: '',
						result: result
					});
				}
			});
		}
	});
});

//接收post请求
router.post('/add', function(req,res,next){
	let param = {
		name:          req.body.name,
		specification: req.body.specification,
		quantity:      req.body.quantity,
		price:         req.body.price,
		locationDes:   req.body.locationDes,
		locationId:    req.body.locationId,
		location:      req.body.location,
		secCategory:   req.body.secCategory,
		room:          req.body.room,
		vacant:        req.body.vacant,
		responsible:   req.body.responsible,
		inDate:        req.body.inDate,
		laboratory:    req.body.laboratory
	}

	let sql = "INSERT INTO instrument VALUES (null,'"+param.name+"','"+param.specification+"','"+param.quantity+"','"+param.price+"','"+param.locationDes+"','"+param.locationId+"','"+param.location+"','"+param.secCategory+"','"+param.room+"','"+param.vacant+"','"+param.responsible+"','"+param.inDate+"','"+param.laboratory+"','"+param.inDate+"');"
	let sql2 = "INSERT INTO history VALUES (null,'"+param.name+"','"+param.specification+"','"+param.quantity+"','"+param.inDate+"','玻璃塑料仪器','"+param.price+"','"+param.laboratory+"','"+param.secCategory+"');"
	console.log(sql)	 
	console.log(sql2)	 
  //连接数据库
	req.getConnection(function(err, conn){
		if(err) {
			return next(err);
		} else {
			conn.query(sql, [], function(err,result){
				if (err) {
					return next(err);
				} else {
					conn.query(sql2, [], function(err,result){
						if (err) {
							return next(err);
						} else {		
							res.json({
								status:'0',
								msg: '新建instrument成功',
								result: ''
							});
						}
					});
				}
			});
		}
	});
});

router.post('/delete', function(req,res,next){
	let param = {
		Id: req.body.Id
	}
	let sql = 'DELETE FROM instrument where Id="'+param.Id+'";'
	console.log(sql)
	req.getConnection(function(err, conn){
		if(err) {
			return next(err);
		} else {
			conn.query(sql, [], function(err,result){
				if (err) {
					return next(err);
				} else {
					res.json({
						status:'0',
						msg: '删除instrument成功',
						result: ''
					});
				}
			});
		}
	});
});

//导出路由实例
module.exports = router;