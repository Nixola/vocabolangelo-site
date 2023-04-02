import {rdfStore} from "../../rdf/store";
import {SKOS} from "../../rdf/NameSpaces";

export function prefLabel(node: any): string {
    let label = rdfStore.any(node, SKOS("prefLabel"))?.value
    if(label !== undefined) {
        return label
    }
    return ""
}