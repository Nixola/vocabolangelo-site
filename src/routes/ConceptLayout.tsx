import React, {useEffect, useState} from "react";
import {NamedSection} from "../components/common/NamedSection";
import {useParams} from "react-router-dom";
import {Concept} from "../rdf/types/Concept";
import {RDFStore} from "../rdf/RDFStore";
import {vocang} from "../rdf/prefixes";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import DefaultLayout from "../components/common/DefaultLayout";


export function ConceptLayout() {

    const [concept, setConcept] = useState({});
    const params = useParams()

    useEffect(() => {
        RDFStore.safeCall(store => {
            return new Concept(store.sym(vocang.uri + params.conceptId))
        }).then(concept =>
            setConcept(concept)
        )
    }, [params.conceptId])

    if(concept !== undefined && concept !== null) {
        let c = concept as Concept
        return (
            <>
                <DefaultLayout title={c.prefLabel} content = {
                    <NamedSection
                        title={"Definizione"}
                        content={<DefinitionList definitions={c.definitions}/>}
                    />
                }/>
            </>
        );
    } else {
        return <></>
    }
}

interface DefinitionListProps {
    definitions: string[]
}
function DefinitionList(props: DefinitionListProps) {
    const {definitions} = props

    return (
        <>
            <ol>
                {definitions?.map(def => {return <li>{ def }</li>})}
            </ol>
        </>
    );
}
