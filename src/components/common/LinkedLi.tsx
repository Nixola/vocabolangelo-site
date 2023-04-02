import React from "react";
import {Link} from "react-router-dom";

export interface LinkedLiProps {
    text: string;
    link: string;
}

export const LinkedLi: React.FC<LinkedLiProps> = ({ text, link }) => {
    return <li><Link to={link}>{text}</Link></li>;
}
