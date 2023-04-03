import {Store} from "rdflib";
import {Quad_Predicate, Quad_Subject} from "rdflib/lib/tf-types";
import {NamedNode} from "rdflib"
import {mapStringFromRDF, StringCheckStrategy} from "../../util/stringChecks";
import {RDFStore} from "../RDFStore";

declare module 'rdflib' {
    interface Store {
        MapEachValue<T>(s: Quad_Subject, p: Quad_Predicate, mappingFunction: (node: NamedNode)=> T): T[];
        EachValue(s: Quad_Subject, p: Quad_Predicate): string[];
        ValueOrEmptyString(s:Quad_Subject, p:Quad_Predicate): string
        ValueOrFail(s:Quad_Subject, p:Quad_Predicate): string
        PartialValue(s: Quad_Subject, p: Quad_Predicate): string | undefined
    }
}

Store.prototype.MapEachValue = function<T>(
    s: Quad_Subject, p: Quad_Predicate, mappingFunction: (node: NamedNode)=> T
): T[] {
    return this.each(s, p, undefined).map(node=> mappingFunction(node as NamedNode))
}

Store.prototype.EachValue = function (s: Quad_Subject, p: Quad_Predicate): string[] {
    return this.MapEachValue(s, p, (node) => node.value)
}

Store.prototype.ValueOrEmptyString = function (s: Quad_Subject, p: Quad_Predicate): string {
    return valueOrStrategy(s, p, StringCheckStrategy.Blank) as string
}

Store.prototype.ValueOrFail = function (s: Quad_Subject, p: Quad_Predicate): string {
    return valueOrStrategy(s, p, StringCheckStrategy.Fail) as string
}

Store.prototype.PartialValue = function (s: Quad_Subject, p: Quad_Predicate): string | undefined {
    return valueOrStrategy(s, p, StringCheckStrategy.Undefined)
}

function valueOrStrategy(s: Quad_Subject, p: Quad_Predicate, strategy: StringCheckStrategy): string | undefined{
    return mapStringFromRDF(RDFStore.store.any(s, p)?.value, strategy)
}


