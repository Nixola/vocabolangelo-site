import React, {useEffect, useState} from "react";
import {NamedSection} from "../components/common/NamedSection";
import {useParams} from "react-router-dom";
import {Concept} from "../rdf/types/Concept";
import {RDFStore} from "../rdf/RDFStore";
import {vocang} from "../rdf/prefixes";
import DefaultLayout from "../components/common/DefaultLayout";
import {List, ListType} from "../components/common/List";

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
        let definitionKeyCount = 0
        let exampleKeyCount = 0
        return (
            <>
                <DefaultLayout title={c.prefLabel} subtitle={c.pronunciation} content = {
                    <>
                    <NamedSection
                        title={"Definizione"}
                        content={<List
                            type={ListType.Ordered}
                            list={c.definitions}
                            elementKey={def =>  (definitionKeyCount + 1).toString()}
                            elementText={def => def}
                        />}
                    />
                    <NamedSection
                        title={"Esempi"}
                        content={<List
                            type={ListType.Unordered}
                            list={c.examples}
                            elementKey={ex =>  (exampleKeyCount + 1).toString()}
                            elementText={ex => ex}
                        />}
                    />
                    </>
                }/>
            </>
        );
    } else {
        return <></>
    }
}
