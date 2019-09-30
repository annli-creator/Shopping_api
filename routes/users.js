var express = require('express');
var router = express.Router();
let db = require('../model/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//插入测试
router.put('/dbtest',function(req, res){
  // let reqs = {name: 'test', create_time: '2017-03-28 14:09:29'};
  let keyString = ''
  let valueString = ''
  for (let r in req.query) {
    if (!keyString) {
      keyString += r
    } else {
      keyString += ',' + r
    }
    if (!valueString) {
      valueString += "'" + req.query[r] + "'"
    } else {
      valueString += ',' + "'" + req.query[r] + "'"
    }
  }
  let sqlString = 'INSERT INTO PRODUCTS (' + keyString + ') value (' + valueString + ')';
  let connection = db.connection();
  console.log(sqlString)
  db.connectionQuery(connection, sqlString, {}, function(data){
      console.log('inserted over');
      res.send(data);
  });
  return;
});

//插入测试
router.get('/dbtest',function(req, res){
  // let reqs = {name: 'test', create_time: '2017-03-28 14:09:29'};
  let sqlString = 'SELECT * FROM PRODUCTS'
  let valueString = ''
  let keyString = ''
  for (let r in req.query) {
    keyString = r
    let valueArr = req.query[r].split(',')
    for (let i of valueArr) {
      if (!valueString) {
        valueString += "'" + i + "'"
      } else {
        valueString += ',' + "'" + i + "'"
      }
    }
  }
  if (keyString) {
    sqlString += ' WHERE ' + keyString + ' IN (' + valueString + ')';
  }
  let connection = db.connection();
  console.log(sqlString)
  db.connectionQuery(connection, sqlString, {}, function(data){
      console.log('inserted over');
      res.send(data);
  });
  return;
});

module.exports = router;
