import {Node} from "rdflib";
import {safeCall} from "../safeCall";
import {rdfStore} from "../../rdf/store";
import {RDF} from "../../rdf/NameSpaces";
import {Quad_Object} from "rdflib/lib/tf-types";

export function getNodesOfType(namedNode: Quad_Object): Promise<Node[]> {
    return safeCall<Node[]>(() => {
        return rdfStore.each(undefined, RDF("type"), namedNode)
    })
}