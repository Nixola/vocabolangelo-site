import React from "react";
import {LinkedLi} from "./LinkedLi";
import {Node} from "rdflib"

interface AlphabeticListProps {
    title: string;
    list: Node[]
    elementName: (node: Node) => string
    elementLink: (node: Node) => string
}
export const AlphabeticList: React.FC<AlphabeticListProps> = (
    {title, list, elementName, elementLink}) => {
    return (
        <>
            <section>
                <header><h2> {title} </h2></header>
                <div className="content">
                    <ul>
                        {list.map(node => {
                            return <LinkedLi text={elementName(node)} link={elementLink(node)}/>
                        })}
                    </ul>
                </div>
            </section>
        </>
    );
}
