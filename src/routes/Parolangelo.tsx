import {AlphabeticList} from "../components/common/AlphabeticList";
import {getConcepts} from "../api/concept/getConcepts";
import React from "react";
import {Node} from "rdflib"
import {prefLabel} from "../api/concept/prefLabel";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

interface ParolangeloState {
    parolangelo: Node[];
}

export default class Parolangelo extends React.Component<any, ParolangeloState> {

    constructor(props: any) {
        super(props);
        this.state = {parolangelo: []};
    }

    componentDidMount() {
        getConcepts().then(nodes => {
            console.log("entered")
            console.log(nodes.length)
            this.setState({
                parolangelo: nodes
            });
        })
    }

    render() {
        return <>
            <Header/>
            <AlphabeticList
                title={"Parolangelo"}
                list={this.state.parolangelo}
                elementName={node => prefLabel(node)}
                elementLink={node => "/" + prefLabel(node)}
            />
            <Footer/>
        </>
    }
}
