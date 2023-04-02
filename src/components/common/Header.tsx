import {Link} from "react-router-dom";

export default function Header() {
    return <header style={{backgroundColor: "black"}} className="is-preload">
        <div id="wrapper" className="divided">
            <div className="inner">
                <div className="index align-center">
                    <section>
                        <header>
                            <h2 style={{color: "white"}}> Vocabolangelo </h2>
                        </header>
                        <div className="content">
                            <ul className="actions">
                                <li>
                                    <Link to={"/"} className="button primary icon solid fa-home">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/parolangelo"} className="button primary icon solid fa-book">
                                        Parolangelo
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/autori"} className="button primary icon solid fa-feather">
                                        Autori
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </header>
}



