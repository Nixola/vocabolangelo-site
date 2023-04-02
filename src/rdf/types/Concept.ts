import {RDFNode} from "../RDFNode";
import {Node} from "rdflib"
import {mapFromRDF, StringCheckStrategy} from "../../util/stringChecks";
import {rdfStore} from "../store";
import {Quad_Subject} from "rdflib/lib/tf-types";
import {SKOS} from "../NameSpaces";
import {getNodesOfType} from "../../api/util/getNodeOfType";

/**
 * Class representing a http://www.w3.org/2004/02/skos/core#Concept.
 */
export class Concept extends RDFNode {
    /**
     * Mapping of http://www.w3.org/2004/02/skos/core#prefLabel.
     */
    private readonly _prefLabel: string ;
    /**
     * Mapping of http://www.w3.org/2004/02/skos/core#definition.
     */
    private readonly _definition: string ;
    constructor(node: Node){
        super(node)
        this._prefLabel = this.getSKOSProperty("prefLabel")
        this._definition = this.getSKOSProperty("definition")
    };

    private getSKOSProperty(property: string): string {
        return mapFromRDF(rdfStore.any(this.node as Quad_Subject, SKOS(property))?.value, StringCheckStrategy.Blank)
    }

    public get prefLabel(): string {
        return this._prefLabel
    }

    public get definition(): string {
        return this._definition
    }

    public static async all(): Promise<Concept[]>{
        let nodes = await getNodesOfType(SKOS("Concept"))
        return nodes.map((node) => new Concept(node))
    }
}

