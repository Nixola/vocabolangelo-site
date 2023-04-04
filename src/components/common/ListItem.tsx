import React from "react";
import {Link} from "react-router-dom";

export interface ListItemProps {
    key: string;
    text: string;
    link?: string;
}

export function ListItem(props: ListItemProps): JSX.Element {
    const {key, text, link} = props
    return <li key={key}>
        {link===undefined ? text : <Link to={link as string}>{text}</Link>}
    </li>;
}
