
import {FOAF} from "../../rdf/NameSpaces";
import {Node} from "rdflib"
import {getNodesOfType} from "../util/getNodeOfType";

export async function getPersons(): Promise<Node[]> {
    return getNodesOfType(FOAF("Person"))
}

