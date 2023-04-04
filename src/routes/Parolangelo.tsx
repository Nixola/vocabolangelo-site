import React from "react";
import {Concept} from "../rdf/types/Concept";
import {vocang} from "../rdf/prefixes";
import "../rdf/extensions/namedNodeExtensions"
import DefaultLayout from "../components/common/DefaultLayout";
import {List, ListType} from "../components/common/List";
import {RDFNamedNode} from "../rdf/RDFNamedNode";

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

        function alphabeticStrategy(concept: Concept, letter: string){
            return concept.prefLabel.charAt(0).toLowerCase() === letter
        }

        return <>
            <DefaultLayout title={"Parolangelo"} content={
                    <List
                        type={ListType.Alphabetic}
                        list={this.state.parolangelo}
                        elementKey={concept => concept.relativeUri(vocang)}
                        elementContent={concept => <p>{concept.prefLabel}</p>}
                        elementLink={concept => "/parolangelo/" + concept.relativeUri(vocang)}
                        alphabeticStrategy={alphabeticStrategy}
                    />
            }/>
        </>
    }
}
