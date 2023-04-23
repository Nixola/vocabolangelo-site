import {ListItem} from "./ListItem";
import React from "react";
import {ListProps} from "./ListProps";

interface MaybeOrderedListProps<T> extends ListProps<T>{
    isOrdered : boolean
    listStyle?: string
}

export function List<T>(props: MaybeOrderedListProps<T>) {
    const {list, elementKey, elementContent, elementLink, isOrdered, listStyle} = props;

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

    if(isOrdered) {
        return <ol style={{listStyle: listStyle}}>{listItems(list, elementKey, elementContent, elementLink)}</ol>
    } else {
        return <ul style={{listStyle: listStyle}}>{listItems(list, elementKey, elementContent, elementLink)}</ul>
    }
}

