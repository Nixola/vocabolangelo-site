
import {RDF, SKOS} from "../../rdf/NameSpaces";
import {rdfStore} from "../../rdf/store";
import {Node} from "rdflib"
import {safeCall} from "../safeCall";

export async function getConcepts(): Promise<Node[]> {
    return safeCall<Node[]>(() => {
            return rdfStore.each(undefined, RDF("type"), SKOS("Concept"))
    })
}

