import {useEffect} from "react";
import {AlphabeticList} from "../components/common/AlphabeticList";
import {getConceptsOrderedByPrefLabel} from "../api/ConceptAPI";
import {checkStore, rdfStore} from "../rdf/store";

export default function Parolangelo(): JSX.Element {

    useEffect((): void => {
        checkStore().then(r => {
            if(r) {
                getConceptsOrderedByPrefLabel(rdfStore, callback)
            } else {
                throw new Error("RDF Store could not be loaded correctly.")
            }
        })
    }, []);

    function callback(){
      console.log("il gioco")
    }
    return <AlphabeticList title={"Parolangelo"} list={[]}/>;
}