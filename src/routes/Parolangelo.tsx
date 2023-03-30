import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

export default function Parolangelo() {

    const store = useSelector((state: RootState) => state.rdfStore)
    console.log(store.statements)
    return (
        <>
            <section>
                <header><h2> </h2></header>
                <div className="content">
                    <ul>
                            <>
                                <li>
                                    <a href="TODO LINK TO WORD">
                                        {store.statements.toString()}
                                    </a>
                                </li>
                            </>
                        )
                    </ul>
                </div>
            </section>
        </>
    );
}