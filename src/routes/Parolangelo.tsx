import {AlphabeticList} from "../components/common/AlphabeticList";
import React from "react";
import {Concept} from "../rdf/types/Concept";
import {vocang} from "../rdf/prefixes";
import "../rdf/extensions/namedNodeExtensions"
import DefaultLayout from "../components/common/DefaultLayout";

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
            <DefaultLayout title={"Parolangelo"} content={
                <AlphabeticList
                    list={this.state.parolangelo}
                    elementName={concept => concept.prefLabel}
                    elementLink={concept => "/parolangelo/" + concept.node.RelativeUri(vocang)}
                />
            }/>
        </>
    }
}
