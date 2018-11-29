var express = require('express');
var router = express.Router();
const SparqlClient = require('sparql-client-2');
const SPARQL = SparqlClient.SPARQL;
const endpoint = 'http://localhost:3030/ds/sparql';
 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/cool', function(req, res, next) {

const city = 'Class';
 
// Get the leaderName(s) of the given city
const query =
  SPARQL`PREFIX owl: <http://www.w3.org/2002/07/owl#>
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         SELECT ?label
         WHERE {
         ?class a ${{owl: city}}.
         ?class rdfs:label ?label
         FILTER ( lang(?label) = "en")
         }
         LIMIT 10`;
 
const client = new SparqlClient(endpoint)
  .register({owl: 'http://www.w3.org/2002/07/owl#'})
  .register({rdfs: 'http://www.w3.org/2000/01/rdf-schema#'});
 
client.query(query)
  .execute()
  .then(function (results) {
    console.dir(results, {depth: null});
  })
  .catch(function (error) {
    // Oh noes! 🙀
  });
});


module.exports = router;
