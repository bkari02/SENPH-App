const SparqlClient = require('sparql-client-2');
const SPARQL = SparqlClient.SPARQL;
const endpoint = 'http://localhost:3030/senph/sparql';
const updatepoint = 'http://localhost:3030/senph/update';
const unitpoint = 'http://localhost:3030/uo/sparql';



const unitsClient = new SparqlClient(unitpoint)
    .register({   owl: 'http://www.w3.org/2002/07/owl#',
                rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
                uo: 'http://purl.obolibrary.org/obo/',
                rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    })  


const client = new SparqlClient(endpoint, {
    updateEndpoint: updatepoint
    })
    .register({   owl: 'http://www.w3.org/2002/07/owl#',
                rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
                s: 'http://www.opensensemap.org/SENPH#',
                uo: 'http://purl.obolibrary.org/obo/',
                rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'

    })  

module.exports.getPhenomenon = function (iri) {
    //Fehlt noch in Query: ?units rdfs:label ?unitsLabel.
    return client
    .query(SPARQL`
    Select Distinct ?sensors ?domains ?units 
    (concat('[{',group_concat (distinct concat('"type": "literal","xml:lang": "',lang(?label),'","value":"',?label,'"');separator="},{"),'}]') as ?labels) 
    (concat('[{',group_concat (distinct concat('"type": "literal","xml:lang": "',lang(?description),'","value":"',?description,'"');separator="},{"),'}]') as ?descriptions) 
    (concat('[{',group_concat (distinct concat('"type": "literal","xml:lang": "',lang(?sensorsLabel),'","value":"',?sensorsLabel,'"');separator="},{"),'}]') as ?sensorLabels) 
    (concat('[{',group_concat (distinct concat('"type": "literal","xml:lang": "',lang(?domainsLabel),'","value":"',?domainsLabel,'"');separator="},{"),'}]') as ?domainLabels) 
    (concat('[{',group_concat (distinct concat('"type": "literal","xml:lang": "',lang(?unitsLabel),'","value":"',?unitsLabel,'"');separator="},{"),'}]') as ?unitsLabel)
                     WHERE {   
                        ${{s: iri}}  rdfs:label ?label.
                        OPTIONAL
                        {${{s: iri}} rdfs:comment ?description.
                        }
                        OPTIONAL
                        {${{s: iri}} s:describedBy ?units.
                        }
                        OPTIONAL
                        {${{s: iri}} s:hasDomain ?domains.
                        ?domains rdfs:label ?domainsLabel.
                        } 
                        OPTIONAL
                        {${{s: iri}} s:measurableBy ?selement.
                        ?selement   s:hasSensor ?sensors.
                        ?sensors rdfs:label ?sensorsLabel.}            
                     }
                     group by ?sensors ?domains ?units`)
    .execute()
    .then(res => res.results.bindings)
    .catch(function (error) {
        console.log("Oh no, error!")
      });
}

module.exports.getPhenomena = function () {
    return client
    .query(SPARQL`
                     SELECT ?label ?phenomenon
                     WHERE {
                       ?phenomenon rdf:type s:phenomenon.
                       ?phenomenon rdfs:label ?label 
                     }`)
    .execute({format: {resource: 'phenomenon'}})
    .then(res => res.results.bindings)
    .catch(function (error) {
        console.log("Oh no, error!")
      });
}

module.exports.getSensors = function () {
    return client
    .query(SPARQL`
                     SELECT ?label ?sensor
                     WHERE {
                       ?sensor rdf:type s:sensor.
                       ?sensor rdfs:label ?label 
                     }`)
    .execute({format: {resource: 'sensor'}})
    .then(res => res)
    .catch(function (error) {
        console.log("Oh no, error!")
      });
}

module.exports.getDevices = function () {
    return client
    .query(SPARQL`
                     SELECT ?label ?device
                     WHERE {
                       ?device rdf:type s:device.
                       OPTIONAL{
                       ?device rdfs:label ?label}
                    }`)
    .execute({format: {resource: 'device'}})
    .then(res => res.results.bindings)
    .catch(function (error) {
        console.log("Oh no, error!")
      });
}



module.exports.updatePhenomenon = function (iri, phenomenon) {
    console.log(phenomenon);
    return client
    .query(SPARQL`INSERT DATA {
        ${{s: iri}} rdf:type s:phenomenon;
                    rdfs:label  ${{value: name.label, lang: name.lang}};
                    rdfs:comment  ${{value: description.comment, lang: description.lang}};
                    s:describedBy ${{uo: unit}};
                    `+ (domain ?`s:hasDomain ${{s: domain}}.`:``) + `
            }`)
    .execute()
    .then(Promise.resolve(console.log("everthing ok")))
    .catch(function (error) {
        console.log(error);
      });
}
