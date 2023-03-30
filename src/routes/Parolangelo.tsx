import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import $ from "jquery";
import {setRdfStore} from "../redux/RdfStore";
import {useEffect} from "react";

export default function Parolangelo() {

    const dispatch = useDispatch()

    useEffect(() => {
        $.get('/schema/vocabolangelo.ttl', function (data) {
            const $RDF = require("rdflib")
            const rdfStore = $RDF.graph()
            $RDF.parse(data, rdfStore, "http://www.vocabolangelo.org/")
            dispatch(setRdfStore(rdfStore));
        })
    }, []);

    const store = useSelector((state: RootState) => state.rdfStore)
    console.log(store.statements)
    return (
        <>
            <section>
                <header><h2> </h2></header>
                <div className="content">
                    <ul>
                            <>
                                <li>
                                    <a href="TODO LINK TO WORD">
                                        {store.statements.toString()}
                                    </a>
                                </li>
                            </>
                        )
                    </ul>
                </div>
            </section>
        </>
    );
}