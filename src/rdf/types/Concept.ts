import {RDFNamedNode} from "../RDFNamedNode";
import {NamedNode} from "rdflib"
import {mapFromRDF, StringCheckStrategy} from "../../util/stringChecks";
import {Quad_Subject} from "rdflib/lib/tf-types";
import {SKOS} from "../NameSpaces";
import {RDFStore} from "../RDFStore";

/**
 * Class representing a http://www.w3.org/2004/02/skos/core#Concept.
 */
export class Concept extends RDFNamedNode {
    /**
     * Mapping of http://www.w3.org/2004/02/skos/core#prefLabel.
     */
    private readonly _prefLabel: string ;
    /**
     * Mapping of http://www.w3.org/2004/02/skos/core#definition.
     */
    private readonly _definitions: string[] ;
    constructor(node: NamedNode){
        super(node)
        this._prefLabel = this.getSKOSProperty("prefLabel")
        this._definitions = RDFStore.store.each(
            this.node as Quad_Subject, SKOS("definition"
        ), undefined).map(node=> node.value)
    };

    private getSKOSProperty(property: string): string {
        return mapFromRDF(
            RDFStore.store.any(this.node as Quad_Subject, SKOS(property))?.value, StringCheckStrategy.Blank
        )
    }

    public get prefLabel(): string {
        return this._prefLabel
    }

    public get definitions(): string[] {
        return this._definitions
    }

    public static async all(): Promise<Concept[]>{
        let nodes = await RDFNamedNode.ofType(SKOS("Concept"))
        return nodes.map((node) => new Concept(node))
    }
}

