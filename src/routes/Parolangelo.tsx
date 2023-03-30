import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useState} from "react";
import {RDF, SKOS} from "../rdf/NameSpaces";
import {LinkedLi} from "../components/common/LinkedLi";
import {Node} from "rdflib"

export default function Parolangelo(): JSX.Element {

    const store = useSelector((state: RootState) => state.rdfStore)
    const [parolangelo] = useState(store.each(undefined, RDF("type"), SKOS("Concept")))

    return (
        <>
            <section>
                <header><h2> </h2></header>
                <div className="content">
                    <ul>
                        {parolangelo.map((concept: Node) =>
                            <LinkedLi text={store.any(concept, SKOS('prefLabel')).value}/>
                        )}
                    </ul>
                </div>
            </section>
        </>
    );
}