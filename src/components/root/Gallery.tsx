import {GalleryElement} from "../common/GalleryElement";
import {Link} from "react-router-dom";
import {VOCABOLIERI_ROUTE} from "../../routes/Vocabolieri";
import {Person} from "../../rdf/types/Person";
import {useState} from "react";

export default function Gallery() {
    let [peopleWithImages, setPeopleWithImages] = useState<Person[]>([])

    Person.all().then(people => {
        setPeopleWithImages(people.filter(p => p.images.length > 0))
    })

    return (
        <>
            <section className="wrapper style1 align-center">
                <div className="inner">
                    <h2>Autori</h2>
                    <p> Gli autori del Vocabolangelo sono... persone ordinarie!</p>
                    <ul className="actions stacked">
                        <li>
                            <Link className="button" to={`${VOCABOLIERI_ROUTE}`}>Vai alla pagina dei vocabolieri</Link>
                        </li>
                    </ul>
                </div>
                <div className="gallery style2 medium lightbox onscroll-fade-in">
                    {peopleWithImages.map(p =>
                        <GalleryElement
                            imageTitle={p.fullName()}
                            imageHref={p.images[0]}
                            imageSrc={p.images[0]}
                            imageAlt={p.fullName()}
                            buttonText={"Vai alla pagina"}/>
                    )}
                </div>
            </section>
        </>
    );
}
