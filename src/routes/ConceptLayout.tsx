import React from "react";
import {NamedSection} from "../components/common/NamedSection";

export function ConceptLayout(props: any) {
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
