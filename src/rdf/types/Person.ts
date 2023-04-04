import {RDFNamedNode} from "../RDFNamedNode";
import {NamedNode} from "rdflib"
import {foaf} from "../prefixes";
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
        this._firstName = RDFStore.store.ValueOrEmptyString(node, foaf.namespace("firstName"))
        this._lastName = RDFStore.store.ValueOrEmptyString(node, foaf.namespace("lastName"))
        this._nick = RDFStore.store.ValueOrEmptyString(node, foaf.namespace("nick"))
    };

    public get firstName(): string {
        return this._firstName
    }

    public get lastName(): string {
        return this._lastName
    }

    public get nick(): string {
        return this._nick
    }

    public static async all(): Promise<Person[]>{
        let nodes = await RDFNamedNode.ofType(foaf.namespace("Person"))
        return nodes.map((node) => new Person(node))
    }
}

