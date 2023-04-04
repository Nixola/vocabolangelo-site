import {ListItem} from "./ListItem";
import React from "react";

export enum ListType {
    Alphabetic = "ALPHABETIC",
    Ordered = "ORDERED",
    Unordered = "UNORDERED"
}

interface LinkedListProps<T>{
    type: ListType,
    list: T[]
    elementKey: (node: T) => string
    elementText: (node: T) => string
    elementLink?: (node: T) => string
}

export function List<T>(props: LinkedListProps<T>) {
    const {type, list, elementKey, elementText, elementLink} = props;

    function listItems<T>(
        list: T[],
        elementKey: (node: T) => string,
        elementText: (node: T) => string,
        elementLink?: (node: T) => string
    ): JSX.Element[] {
        return list?.map(node => {
            return <ListItem
                key={elementKey(node)}
                text={elementText(node)}
                link={elementLink!== undefined ? elementLink(node) : undefined}
            />
        })
    }

    if(type === ListType.Unordered) {
        return <ul>{listItems(list, elementKey, elementText, elementLink)}</ul>
    } else if(type === ListType.Ordered) {
        return <ol>{listItems(list, elementKey, elementText, elementLink)}</ol>
    } else if(type === ListType.Alphabetic) {
        return <ul>{listItems(list, elementKey, elementText, elementLink)}</ul>
    } else{
        throw Error("ListType not supported.")
    }

}

