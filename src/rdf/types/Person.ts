import {RDFNamedNode} from "../RDFNamedNode";
import {NamedNode} from "rdflib"
import {mapFromRDF, StringCheckStrategy} from "../../util/stringChecks";
import {Quad_Subject} from "rdflib/lib/tf-types";
import {FOAF} from "../NameSpaces";
import {RDFStore} from "../RDFStore";

/**
 * Class representing a http://xmlns.com/foaf/0.1/Person.
 */
export class Person extends RDFNamedNode {
    /**
     * Mapping of http://xmlns.com/foaf/0.1/firstName.
     */
    private readonly _firstName: string ;
    /**
     * Mapping of http://xmlns.com/foaf/0.1/lastName.
     */
    private readonly _lastName: string ;
    /**
     * Mapping of http://xmlns.com/foaf/0.1/nickname.
     */
    private readonly _nick: string ;
    constructor(node: NamedNode){
        super(node)
        this._firstName = this.getFOAFProperty("firstName")
        this._lastName = this.getFOAFProperty("lastName")
        this._nick = this.getFOAFProperty("nick")
    };

    private getFOAFProperty(property: string): string {
        return mapFromRDF(
            RDFStore.store.any(this.node as Quad_Subject, FOAF(property))?.value, StringCheckStrategy.Blank
        )
    }

    public get firstName(): string {
        return this._firstName
    }

    public get lastName(): string {
        return this._lastName
    }

    public get nick(): string {
        return this._nick
    }

    public async all(): Promise<Person[]>{
        let nodes = await RDFNamedNode.ofType(FOAF("Person"))
        return nodes.map((node) => new Person(node))
    }
}

