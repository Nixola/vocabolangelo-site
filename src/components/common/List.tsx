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
}

export function List<T>(props: LinkedListProps<T>) {
    const {type, list, elementKey, elementContent, elementLink} = props;

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
        return <ul>{listItems(list, elementKey, elementContent, elementLink)}</ul>
    } else{
        throw Error("ListType not supported.")
    }

}

