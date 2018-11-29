var express = require('express');
var router = express.Router();
//var bodyParser = require("body-parser");
const SparqlClient = require('sparql-client-2');
const SPARQL = SparqlClient.SPARQL;
const endpoint = 'http://localhost:3030/senph/sparql';
const updatepoint = 'http://localhost:3030/senph/update';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/update', function(req, res, next) {


// Get the leaderName(s) of the given city
var query =
  SPARQL`PREFIX owl: <http://www.w3.org/2002/07/owl#>
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         PREFIX s: <http://www.opensensemap.org/SENPH#>
         SELECT ?label
         WHERE {
         ?class a ?phe.
         ?class rdfs:label ?label
         FILTER ( lang(?label) = "en")
         }
         LIMIT 10`;
 
const client = new SparqlClient(endpoint, {
    updateEndpoint: updatepoint
})
    .register({   owl: 'http://www.w3.org/2002/07/owl#',
                rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
                s: 'http://www.opensensemap.org/SENPH#'
            })  

 
client.query(query)
.bind('phe', 'http://www.opensensemap.org/SENPH#phenomenon', {type:'uri'})
  .execute()
  .then(function (results) {
    console.log(query)
    console.dir(results, {depth: null})
        res.send(results);
  })
  .catch(function (error) {
    // Oh noes! 🙀
  });

});

const client = new SparqlClient(endpoint, {
    updateEndpoint: updatepoint
    })
    .register({   owl: 'http://www.w3.org/2002/07/owl#',
                rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
                s: 'http://www.opensensemap.org/SENPH#',
                rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'

            })  


// Get the leaderName(s) of the given city
function updateSenph(val, la , iri) {
    return client
    .query('INSERT DATA {'+
    '?iri rdf:type s:phenomenon.'+
    '?iri rdfs:label ?label.}')
    .execute()
    .bind('iri',  iri, {type:'uri'})
    .bind({label: {value: val, lang: la}})
    .then(Promise.resolve(console.log("everthing ok")))
    .catch(function (error) {
        console.log("Oh no, error!")
      });
}

function updatePhenomenon(val, la , iri) {
    return client
    .query(SPARQL`INSERT DATA {
        ${{s: iri}} rdf:type s:phenomenon ;
                    rdfs:label  ${{value: val, lang: la}}.
                }`)
    .execute()
    .then(Promise.resolve(console.log("everthing ok")))
    .catch(function (error) {
        console.log("Oh no, error!")
      });
}
    
function updateSensor(val, la , iri) {
    return client
    .query(SPARQL`INSERT DATA {
        ${{s: iri}} rdf:type s:sensor ;
                    rdfs:label  ${{value: val, lang: la}}.
                }`)
    .execute()
    .then(Promise.resolve(console.log("everthing ok")))
    .catch(function (error) {
        console.log("Oh no, error!")
      });
}

router.post('/sensor',function(req,res){
    console.dir(req.body.update.iri);
    console.dir(req.body.update.iri);
    console.dir(req.body.update.label);
    var iri = req.body.update.iri;
    var val = req.body.update.label.value;
    var la = req.body.update.label.lang;
    updateSensor(val, la, iri)
    .then( res.end("END"))
  });

router.post('/phenomenon',function(req,res){
    console.dir(req.body.update.iri);
    console.dir(req.body.update.iri);
    console.dir(req.body.update.label);
    var iri = req.body.update.iri;
    var val = req.body.update.label.value;
    var la = req.body.update.label.lang;
    updatePhenomenon(val, la, iri)
    .then( res.end("END"))
  });

module.exports = router;
