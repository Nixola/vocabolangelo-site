import {Store} from "rdflib";
import {Bindings} from "rdflib/lib/types";
const $RDF = require("rdflib")

export function getConceptsOrderedByPrefLabel(store: Store, callback: (bindings: Bindings) => void) {
    let sparqlQuery: string = `
    SELECT ?word ?label' WHERE {
        ?word rdf:type skos:Concept.
        ?word skos:prefLabel ?label.
    }
    ORDER BY ?label
    `;
    let query = $RDF.SPARQLToQuery(sparqlQuery, false, store);
    store.query(query, callback);
}

export function getConcepts(store: Store) {

}