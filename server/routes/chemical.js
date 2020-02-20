var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	let name = req.query.name;
	let sql = 'SELECT * FROM chemical ';
	// if (name) {
	// 	let namesql = 'WHERE name REGEXP '+'"'+name+'"';
	// 	sql = 'SELECT * FROM chemical '+ namesql;
	// }
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
						status:'1',
						result:result
					});
				}
			});
		}
	});
});

router.post('/add', function(req,res,next){
	let param = {
		name:            req.body.name,
    specification:   req.body.specification,
    quantity:        req.body.quantity,
    locationDes:     req.body.locationDes,
    locationId:      req.body.locationId,
    location:        req.body.location,
    responsible:     req.body.responsible,
    inDate:          req.body.inDate,
    dangerous:       req.body.dangerous,
    secCategory:     req.body.secCategory,
    vacant:          req.body.vacant,
    price:           req.body.price,
    formula:         req.body.formula,
    molecularWeight: req.body.molecularWeight,
    laboratory:      req.body.laboratory,
    number:          req.body.number,
    traits:          req.body.traits,
    store:           req.body.store,
    use:             req.body.use
	}

	let sql = "INSERT INTO chemical VALUES (null,'"+param.name+"','"+param.specification+"','"+param.quantity+"','"+param.locationDes+"','"+param.locationId+"','"+param.location+"','"+param.responsible+"','"+param.inDate+"','"+param.dangerous+"','"+param.secCategory+"','"+param.vacant+"','"+param.price+"','"+param.formula+"','"+param.molecularWeight+"','"+param.number+"','"+param.laboratory+"','"+param.traits+"','"+param.store+"','"+param.use+"','"+param.inDate+"')";
	let sql2 = "INSERT INTO history VALUES (null,'"+param.name+"','"+param.specification+"','"+param.quantity+"','"+param.inDate+"','药品试剂原料','"+param.price+"','"+param.laboratory+"','"+param.secCategory+"');"
	console.log(sql)	 

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
								msg: '新建chemical成功',
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

	let sql = 'DELETE FROM chemical where Id="'+param.Id+'";'
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
						msg: '删除chemical成功',
						result: ''
					});
				}
			});
		}
	});
});

module.exports = router;