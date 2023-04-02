import {GalleryElement} from "../common/GalleryElement";
import {Link} from "react-router-dom";

export default function Gallery() {
    return (
        <>
            <section className="wrapper style1 align-center">
                <div className="inner">
                    <h2>Autori</h2>
                    <p> Gli autori del Vocabolangelo sono... persone ordinarie!</p>
                    <ul className="actions stacked">
                        <li>
                            <Link className="button" to={"/autori"}>Vai alla pagina degli autori</Link>
                        </li>
                    </ul>
                </div>
                <div className="gallery style2 medium lightbox onscroll-fade-in">
                    <GalleryElement imageTitle={"TODO"} imageHref={"TODO"} imageSrc={"TODO"} imageAlt={"TODO"} buttonText={"TODO"}/>
                </div>
            </section>
        </>
    );
}
