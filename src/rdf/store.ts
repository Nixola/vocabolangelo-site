import {Store} from "rdflib";

const $RDF = require("rdflib");
export const rdfStore: Store = $RDF.graph();
initializeStore()

function initializeStore() {
    $.get('/schema/vocabolangelo.ttl', function (data) {
        $RDF.parse(data, rdfStore, "http://www.vocabolangelo.org/")
    })
}
