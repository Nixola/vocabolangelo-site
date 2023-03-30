import React from "react";

interface LinkedLiProps {
    text: string;
}

export const LinkedLi: React.FC<LinkedLiProps> = ({ text }) => {
    return <li>
            <a href="TODO LINK TO WORD">
                {text}
            </a>
        </li>;
}
