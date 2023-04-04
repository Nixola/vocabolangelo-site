import {ListItem} from "./ListItem";
import React from "react";

export enum ListType {
    Alphabetic = "ALPHABETIC",
    Ordered = "ORDERED",
    Unordered = "UNORDERED"
}

interface LinkedListProps<T>{
    type: ListType
    list: T[]
    elementKey: (node: T) => string
    elementContent: (node: T) => JSX.Element
    elementLink?: (node: T) => string
    alphabeticStrategy?: (node: T, letter: string) => boolean
}

export function List<T>(props: LinkedListProps<T>) {
    const {type, list, elementKey, elementContent, elementLink, alphabeticStrategy} = props;

    function listItems<T>(
        list: T[],
        elementKey: (node: T) => string,
        elementContent: (node: T) => JSX.Element,
        elementLink?: (node: T) => string
    ): JSX.Element[] {
        return list?.map(node => {
            return <ListItem
                key={elementKey(node)}
                content={<>{elementContent(node)}</>}
                link={elementLink!== undefined ? elementLink(node) : undefined}
            />
        })
    }

    if(type === ListType.Unordered) {
        return <ul>{listItems(list, elementKey, elementContent, elementLink)}</ul>
    } else if(type === ListType.Ordered) {
        return <ol>{listItems(list, elementKey, elementContent, elementLink)}</ol>
    } else if(type === ListType.Alphabetic) {
        const alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
        return <>
            {alphabet.map(letter => {
                if (alphabeticStrategy) {
                    let sublist = list.filter(obj => alphabeticStrategy(obj, letter))
                    return <section>
                            <header><h2>{letter.toUpperCase()}</h2></header>
                            <ul>
                                {listItems(sublist, elementKey, elementContent, elementLink)}
                            </ul>
                        </section>
                } else {
                    throw Error("AlphabeticStrategy required for List component when using ListType.Alphabetic")
                }
            })}
        </>
    } else {
        throw Error("ListType not supported.")
    }

}

