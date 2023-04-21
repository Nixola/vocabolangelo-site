import {RDFNamedNode} from "../RDFNamedNode";
import {NamedNode} from "rdflib"
import {dct, foaf, rel, schema} from "../prefixes";
import {RDFStore} from "../RDFStore";
import {Concept} from "./Concept";

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
    private readonly _nick?: string ;
    /**
     * Mapping of https://schema.org/image.
     */
    private readonly _image?: string;

    constructor(node: NamedNode){
        super(node)
        this._firstName = RDFStore.store.ValueOrEmptyString(node, foaf.namespace("firstName"))
        this._lastName = RDFStore.store.ValueOrEmptyString(node, foaf.namespace("lastName"))
        this._nick = RDFStore.store.PartialValue(node, foaf.namespace("nick"))
        this._image = RDFStore.store.PartialValue(node, schema.namespace("image"))
    };

    public get firstName(): string {
        return this._firstName
    }

    public get lastName(): string {
        return this._lastName
    }

    public get nick(): string | undefined {
        return this._nick
    }

    public get image(): string | undefined {
        return this._image
    }

    public get friends(): () => Person[] {
        let subj = this.node
        return function (): Person[]{
            return RDFStore.store.MapEachValue(
                subj,
                rel.namespace("friendOf"),
                (node) => new Person(node)
            )
        }
    }

    public get partners(): () => Person[] {
        let subj = this.node
        return function (): Person[] {
            return RDFStore.store.MapEachValue(
                subj,
                rel.namespace("spouseOf"),
                (node) => new Person(node)
            )
        }
    }

    public static async all(): Promise<Person[]>{
        let nodes = await RDFNamedNode.ofType(foaf.namespace("Person"))
        return nodes.map((node) => new Person(node))
    }
}

