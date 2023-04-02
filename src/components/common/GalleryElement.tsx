import React from "react";

interface GalleryElementProps {
    imageTitle: string;
    imageHref: string;
    imageSrc: string;
    imageAlt: string;
    buttonText: string;
}
export const GalleryElement: React.FC<GalleryElementProps> = ({ imageTitle, imageHref, imageSrc, imageAlt, buttonText }) => {
    return (
        <>
            <article>
                <a href={imageHref} className="image">
                    <img src={imageSrc} alt={imageAlt}/>
                </a>
                <div className="caption">
                    <h2>{imageTitle}</h2>
                    <ul className="actions fixed">
                        <li>
                            <span className="button small">
                                {buttonText}
                            </span>
                        </li>
                    </ul>
                </div>
            </article>
        </>
    );
}
