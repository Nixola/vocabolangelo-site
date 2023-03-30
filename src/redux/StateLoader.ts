import {useDispatch} from "react-redux";
import {useEffect} from "react";
import $ from "jquery";
import {setRdfStore} from "./RdfStore";

export default function StateLoader() {
    const dispatch = useDispatch()

    useEffect(() => {
        $.get('/schema/vocabolangelo.ttl', function (data) {
            const $RDF = require("rdflib")
            const rdfStore = $RDF.graph()
            $RDF.parse(data, rdfStore, "http://www.vocabolangelo.org/")
            dispatch(setRdfStore(rdfStore));
        })
    }, []);

}
