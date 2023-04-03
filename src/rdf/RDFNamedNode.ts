
import {NamedNode} from "rdflib"
import {Quad_Object} from "rdflib/lib/tf-types";
import {RDF} from "./NameSpaces";
import {RDFStore} from "./RDFStore";

/**
 * A class representing an RDF Node. It can be extended by other classes and be enriched.
 */
export class RDFNamedNode {
    constructor(public node: NamedNode){
    };

    static ofType(namedNode: Quad_Object): Promise<NamedNode[]> {
        return RDFStore.safeCall<NamedNode[]>((store) => {
            return store.each(undefined, RDF("type"), namedNode) as NamedNode[]
        })
    }
}

