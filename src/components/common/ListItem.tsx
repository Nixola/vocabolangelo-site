import React from "react";
import {Link} from "react-router-dom";

export interface ListItemProps {
    key: string;
    content: JSX.Element;
    link?: string;
}

export function ListItem(props: ListItemProps): JSX.Element {
    const {key, content, link} = props
    return <li key={key}>
        {link===undefined ? content : <Link to={link as string}>{content}</Link>}
    </li>;
}
