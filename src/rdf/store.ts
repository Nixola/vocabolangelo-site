import {Store} from "rdflib";

const $RDF = require("rdflib");
export const rdfStore: Store = $RDF.graph();
initializeStore()

function initializeStore() {
    $.get('/schema/vocabolangelo.ttl', function (data) {
        $RDF.parse(data, rdfStore, "http://www.vocabolangelo.org/")
    })
}

export async function checkStore(): Promise<boolean> {
    let start_time = new Date().getTime()
    if (rdfStore.statements.length !== 0) {
        console.log('met');
        return true
    } else if (new Date().getTime() > start_time + 3000) {
        console.log('not met, time out');
        return false
    } else {
        await new Promise(resolve => setTimeout(resolve, 100));
        return checkStore();
    }
}
