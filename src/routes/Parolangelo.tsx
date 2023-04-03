import {AlphabeticList} from "../components/common/AlphabeticList";
import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {Concept} from "../rdf/types/Concept";

interface ParolangeloState {
    parolangelo: Concept[];
}

export default class Parolangelo extends React.Component<any, ParolangeloState> {

    constructor(props: any) {
        super(props);
        this.state = {parolangelo: []};
    }

    componentDidMount() {
        Concept.all().then(nodes => {
            this.setState({
                parolangelo: nodes.sort((a, b) => a.prefLabel.localeCompare(b.prefLabel))
            });
        })
    }

    render() {
        return <>
            <Header/>
            <AlphabeticList
                title={"Parolangelo"}
                list={this.state.parolangelo}
                elementName={concept => concept.prefLabel}
                elementLink={concept => "/parolangelo/" + concept.node.toNQ()}
            />
            <Footer/>
        </>
    }
}
