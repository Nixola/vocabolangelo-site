import React, {useEffect, useState} from "react";
import {NamedSection} from "../components/common/NamedSection";
import {useParams} from "react-router-dom";
import {Concept} from "../rdf/types/Concept";
import {RDFStore} from "../rdf/RDFStore";
import {vocang} from "../rdf/prefixes";
import DefaultLayout from "../components/common/DefaultLayout";
import {List, ListType} from "../components/common/List";
import {Person} from "../rdf/types/Person";
import ConditionalComponent from "../components/common/conditional/ConditionalComponent";

interface ConceptLayoutProps{
    concept: Concept
}

export function ConceptLayout() {

    const [concept, setConcept] = useState({});
    const params = useParams()

    useEffect(() => {
        RDFStore.safeCall(store => {
            return new Concept(store.sym(vocang.uri + params.conceptId))
        }).then(concept =>
            setConcept(concept)
        )
    }, [params.conceptId])

    if(concept !== undefined && concept !== null) {
        let c = concept as Concept
        return (
            <>
                <DefaultLayout title={c.prefLabel} subtitle={c.pronunciation} content = {
                    <>
                        <Definitions concept={c}/>
                        <Examples concept={c}/>
                        <Images concept={c}/>
                        <Videos concept={c}/>
                        <Synonyms concept={c}/>
                        <Related concept={c}/>
                        <Note concept={c}/>
                        <Created concept={c}/>
                        <Creators concept={c}/>
                    </>
                }/>
            </>
        );
    } else {
        return <></>
    }
}

function Definitions(props: ConceptLayoutProps){
    let definitionKeyCount = 0
    return <NamedSection
            title={"Definizione"}
            content={<List
                type={ListType.Ordered}
                list={props.concept.definitions}
                elementKey={_ =>  (definitionKeyCount += 1).toString()}
                elementContent={def => <p>{def}</p>}
            />}
        />
}

function Examples(props: ConceptLayoutProps){
    let exampleKeyCount = 0
    return <ConditionalComponent
        condition={() => props.concept.examples?.length > 0} component={
        <NamedSection
            title={"Esempi"}
            content={<List
                type={ListType.Unordered}
                list={props.concept.examples}
                elementKey={ex =>  (exampleKeyCount += 1).toString()}
                elementContent={ex => <p>{ex}</p>}
            />}
        />
    }/>
}
function Creators(props: ConceptLayoutProps){
    let creatorId = (creator: Person) => creator.node.RelativeUri(vocang)
    return <NamedSection
                title={"Vocabolieri"}
                content={<List
                    type={ListType.Unordered}
                    list={props.concept.creators}
                    elementKey={creator =>  creatorId(creator)}
                    elementLink={creator => `/vocabolieri/${creatorId(creator)}`}
                    elementContent={creator => <p>{creator.firstName} {creator.lastName}</p>}
                />}
            />
}

function Images(props: ConceptLayoutProps){
    let imageKetCount = 0
    return <ConditionalComponent
        condition={() => props.concept.images?.length > 0}
        component={
            <NamedSection
                title={"Immagini"}
                content={<List
                    type={ListType.Unordered}
                    list={props.concept.images}
                    elementKey={image =>  (imageKetCount += 1).toString()}
                    elementContent={image =>
                        <span className="image left">
                        <img src={image} alt={props.concept.prefLabel}/>
                    </span>
                    }
                />}
            />
        }
    />
}

function Videos(props: ConceptLayoutProps){
    let videosKeyCount = 0
    return <ConditionalComponent
        condition={() => props.concept.videos?.length > 0}
        component={
            <NamedSection
                title={"Video"}
                content={
                <List type={ListType.Unordered}
                    list={props.concept.videos}
                    elementKey={_ =>  (videosKeyCount += 1).toString()}
                    elementContent={video =>
                        <span className="image left">
                            <video width="50%" height="auto" autoPlay muted loop>
                                <source src={video} type="video/mp4"/>
                                Riproduzione del video non supportata dal tuo browser.
                            </video>
                        </span>
                    }
                />}
            />
        }
    />
}

function Created(props: ConceptLayoutProps){
    return <ConditionalComponent
        condition={() => props.concept.created !== undefined}
        component={
            <NamedSection
                title={"Data di creazione"}
                content={<p>{props.concept.created}</p>}
            />
        }
    />
}

interface OtherConceptProps {
    title: string
    condition: () => boolean
    list: Concept[]
}
function OtherConcept(props: OtherConceptProps){
    let conceptId = (concept: Concept) => concept.node.RelativeUri(vocang)
    return <ConditionalComponent
        condition={props.condition}
        component={
            <NamedSection
                title={props.title}
                content={<List
                    type={ListType.Unordered}
                    list={props.list}
                    elementKey={concept => conceptId(concept)}
                    elementLink={concept => `/parolangelo/${conceptId(concept)}`}
                    elementContent={concept => <p>{concept.prefLabel}</p>}
                />}
            />
        }
    />
}

function Synonyms(props: ConceptLayoutProps){
    return <OtherConcept
        title={"Sinonimi"}
        condition={() => props.concept.synonyms?.length > 0}
        list={props.concept.synonyms}
    />
}

function Related(props: ConceptLayoutProps){
    return <OtherConcept
        title={"Correllate"}
        condition={() => props.concept.related?.length > 0}
        list={props.concept.related}
    />
}

function Note(props: ConceptLayoutProps){
    let notesKey = 0
    return <ConditionalComponent
        condition={() => props.concept.notes?.length > 0}
        component={
            <NamedSection
                title={"Note"}
                content={<List
                    type={ListType.Unordered}
                    list={props.concept.notes}
                    elementKey={_ => (notesKey += 1).toString()}
                    elementContent={note => <p>{note}</p>}
                />}
            />
        }
    />
}