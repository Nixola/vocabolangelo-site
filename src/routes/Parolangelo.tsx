import {AlphabeticList} from "../components/common/AlphabeticList";
import {getConcepts} from "../api/concept/getConcepts";
import React from "react";
import {Node} from "rdflib"
import "../api/concept/prefLabel";
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
            this.setState({
                parolangelo: nodes.sort((a, b) => a.PrefLabel().localeCompare(b.PrefLabel()))
            });
        })
    }

    render() {
        return <>
            <Header/>
            <AlphabeticList
                title={"Parolangelo"}
                list={this.state.parolangelo}
                elementName={node => node.PrefLabel()}
                elementLink={node => "/parolangelo/" + node.PrefLabel()}
            />
            <Footer/>
        </>
    }
}
