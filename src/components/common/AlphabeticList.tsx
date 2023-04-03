import React from "react";
import {LinkedLi} from "./LinkedLi";

interface AlphabeticListProps<T>{
    list: T[]
    elementName: (node: T) => string
    elementLink: (node: T) => string
}

export function AlphabeticList<T>(props: AlphabeticListProps<T>) {
    const {list, elementName, elementLink} = props;

    return (
        <>
            <section>
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

