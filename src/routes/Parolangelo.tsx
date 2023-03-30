
import {Component} from "react";
import {$RDF} from "../rdf/$RDF";
import $ from 'jquery';
import {DCT, VOCANG} from "../rdf/NameSpaces";

export default class Parolangelo extends Component{

    store = $RDF.graph()

    componentDidMount(): void {
        this.getOntology()
    }

    async getOntology() {
        $.get(
            '/schema/vocabolangelo.ttl',
            function(data: string) {
            try {
                console.log(data.trim())
                var store = $RDF.graph()
                $RDF.parse(data, store, "http://www.vocabolangelo.org/")
                let creators = store.each(VOCANG("omnicio"), DCT("creator"), undefined)
                for (var i=0; i< creators.length;i++) {
                    let el = creators[i]
                    console.log(el.value) // the WebID of a friend
                }
            } catch (err) {
            console.log(err)
            }
        }).catch(err => console.log(err));


    }

    render(): JSX.Element {
        return (
            <>
                <div>

                </div>
            </>
        );
    }
};
