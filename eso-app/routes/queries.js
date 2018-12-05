var express = require('express');
var router = express.Router();
//var bodyParser = require("body-parser");

const QueriesController = require('../controllers/queries-controller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/phenomena',function(req,res){
    QueriesController.getPhenomena()
    .then(data => res.json(data))
  });

router.get('/phenomenon/:iri',function(req,res){
  console.log(req);
    QueriesController.getPhenomenon(req.params.iri)
    .then(data => res.json(data))
});

router.post('/phenomenon/update/',function(req,res){
  console.dir(req.body);
  QueriesController.updatePhenomenon(req.body)
  .then(res.end("END"))
});


router.get('/sensors',function(req,res){
    QueriesController.getSensors()
    .then(data => res.json(data))
});

router.get('/sensor/:iri',function(req,res){
  console.log(req);
    QueriesController.getSensor(req.params.iri)
    .then(data => res.json(data))
});

router.get('/devices',function(req,res){
  QueriesController.getDevices()
  .then(data => res.json(data))
});


module.exports = router;
