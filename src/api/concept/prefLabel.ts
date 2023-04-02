import {rdfStore} from "../../rdf/store";
import {SKOS} from "../../rdf/NameSpaces";
import {Node} from "rdflib"
import {Quad_Subject} from "rdflib/lib/tf-types";

declare module 'rdflib' {
    export interface Node {
        PrefLabel(): string;
    }
}

Node.prototype.PrefLabel = function(): string {
    let label = rdfStore.any(this as Quad_Subject, SKOS("prefLabel"))?.value
    if(label !== undefined) {
        return label
    }
    return ""
}