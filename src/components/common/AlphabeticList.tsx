import React from "react";
import {LinkedLi} from "./LinkedLi";

interface AlphabeticListProps {
    title: string;
    list: Node[]
}
export const AlphabeticList: React.FC<AlphabeticListProps> = ({title}) => {
    return (
        <>
            <section>
                <header><h2> {title} </h2></header>
                <div className="content">
                    <ul>
                        <LinkedLi link={"TODO"} text={"TODO"}/>
                    </ul>
                </div>
            </section>
        </>
    );
}
