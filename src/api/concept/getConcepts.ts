import {SKOS} from "../../rdf/NameSpaces";
import {Node} from "rdflib"
import {getNodesOfType} from "../util/getNodeOfType";

export async function getConcepts(): Promise<Node[]> {
    return getNodesOfType(SKOS("Concept"))
}

