import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useEffect} from "react";
import {AlphabeticList} from "../components/common/AlphabeticList";
import {getConceptsOrderedByPrefLabel} from "../api/ConceptAPI";
import {Bindings} from "rdflib/lib/types";

export default function Parolangelo(): JSX.Element {

    const store = useSelector((state: RootState) => state.rdfStore)

    useEffect(() => {
        getConceptsOrderedByPrefLabel(store, assignState)
    }, [store]);


    function assignState(bindings: Bindings) {
        console.log(bindings)
    }

    return <AlphabeticList title={"Parolangelo"} list={[]}/>;
}