import React from "react";
import {NamedSection} from "../components/common/NamedSection";

import { useLoaderData } from "react-router-dom";
import {Concept} from "../rdf/types/Concept";

//export async function loader({ params }): Promise<Concept> {
    //const concept: Concept = await getContact(params.conceptId);
    //return { concept };
//}

export function ConceptLayout(props: any) {
    //const { concept: Concept } = useLoaderData();
    return (
        <>
            <h2>a</h2>
            <NamedSection title={"Definizione"} content={<DefinitionList definitions={[]}/>}/>
        </>
    );
}

interface DefinitionListProps {
    definitions: string[]
}
function DefinitionList(props: DefinitionListProps) {
    const {definitions} = props

    return (
        <>
            <ol>
                {definitions.map(def => {return <li>{ def }</li>})}
            </ol>
        </>
    );
}
