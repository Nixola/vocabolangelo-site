import {RDFNamedNode} from "../RDFNamedNode";
import {NamedNode} from "rdflib"
import {Quad_Subject} from "rdflib/lib/tf-types";
import {RDFStore} from "../RDFStore";
import {dct, lexinfo, schema, skos} from "../prefixes";
import "../extensions/storeExtensions"
import {Person} from "./Person";

/**
 * Class representing a http://www.w3.org/2004/02/skos/core#Concept.
 */
export class Concept extends RDFNamedNode {
    /**
     * Mapping of http://www.w3.org/2004/02/skos/core#prefLabel.
     */
    private readonly _prefLabel: string ;
    /**
     * Mapping of http://www.lexinfo.net/ontology/2.0/lexinfo#pronunciation
     */
    private readonly _pronunciation: string | undefined ;
    /**
     * Mapping of http://www.w3.org/2004/02/skos/core#definition.
     */
    private readonly _definitions: string[] ;
    /**
     * Mapping of http://www.w3.org/2004/02/skos/core#example.
     */
    private readonly _examples: string[] ;
    /**
     * Mapping of http://purl.org/dc/terms/creator.
     */
    private readonly _creators: Person[] ;

    /**
     * Mapping of https://schema.org/image.
     */
    private readonly _images: string[] ;

    /**
     * Mapping of https://schema.org/video.
     */
    private readonly _videos: string[] ;

    /**
     * Mapping of http://rdfs.org/scot/ns#synonym.
     */
    private readonly _synonyms: Concept[] ;

    /**
     * Mapping of http://www.w3.org/2004/02/skos/core#related.
     */
    private readonly _related: Concept[] ;

    /**
     * Mapping of http://purl.org/dc/terms/created.
     */
    private readonly _created: string | undefined ;

    /**
     * Mapping of http://www.w3.org/2004/02/skos/core##related.
     */
    private readonly _notes: string[] ;

    constructor(node: NamedNode){
        super(node)
        let quadSubj = this.node as Quad_Subject
        this._prefLabel = RDFStore.store.ValueOrFail(quadSubj, skos.namespace("prefLabel"))
        this._pronunciation = RDFStore.store.PartialValue(quadSubj, lexinfo.namespace("pronunciation"))
        this._definitions = RDFStore.store.EachValue(quadSubj, skos.namespace("definition"))
        this._examples = RDFStore.store.EachValue(quadSubj, skos.namespace("example"))
        this._creators = RDFStore.store.MapEachValue(
            quadSubj,
            dct.namespace("creator"),
            (node) => new Person(node)
        )
        this._images = RDFStore.store.EachValue(quadSubj, schema.namespace("image"))
        this._videos = RDFStore.store.EachValue(quadSubj, schema.namespace("video"))
        this._synonyms = RDFStore.store.MapEachValue(
            quadSubj,
            schema.namespace("synonym"),
            (node) => new Concept(node)
        )
        this._related = RDFStore.store.MapEachValue(
            quadSubj,
            schema.namespace("synonym"),
            (node) => new Concept(node)
        )
        this._created = RDFStore.store.PartialValue(quadSubj, dct.namespace("created"))
        this._notes = RDFStore.store.EachValue(quadSubj, skos.namespace("note"))
    };

    public get prefLabel(): string {
        return this._prefLabel
    }

    public get pronunciation(): string | undefined {
        return this._pronunciation
    }

    public get definitions(): string[] {
        return this._definitions
    }

    public get examples(): string[] {
        return this._examples
    }

    public get creators(): Person[] {
        return this._creators
    }

    public get images(): string[] {
        return this._images
    }

    public get videos(): string[] {
        return this._videos
    }

    public get synonyms(): Concept[] {
        return this._synonyms
    }

    public get related(): Concept[] {
        return this._related
    }

    public get created(): string | undefined {
        return this._created
    }

    public get notes(): string[] {
        return this._notes
    }

    public static async all(): Promise<Concept[]>{
        let nodes = await RDFNamedNode.ofType(skos.namespace("Concept"))
        return nodes.map((node) => new Concept(node))
    }

}

