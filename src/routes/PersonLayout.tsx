import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {RDFStore} from "../rdf/RDFStore";
import {vocang} from "../rdf/prefixes";
import DefaultLayout from "../components/common/DefaultLayout";
import {Person} from "../rdf/types/Person";
import ConditionalComponent from "../components/common/conditional/ConditionalComponent";
import {ImageSection} from "../components/common/ImageSection";
import {NamedSection} from "../components/common/NamedSection";
import {List, ListType} from "../components/common/List";

export function PersonLayout() {

    const [person, setPerson] =
        useState<Person | undefined>(undefined);
    const params = useParams()

    useEffect(() => {
        RDFStore.safeCall(store => {
            return new Person(store.sym(vocang.uri + params.personId))
        }).then(person =>
            setPerson(person)
        )
    }, [params.personId])

    if(person !== undefined) {
        return <ConditionalComponent
            condition={() => person !== undefined}
            component={
                <DefaultLayout title={""} subtitle={""} content = {
                    <>
                        <ImageSection
                            content={
                                <h2>{person.fullName()}</h2>
                            }
                            imageSrc={person.image !== undefined ? person.image : ""}
                            imageAlt={person.fullName()}/>
                        <Friends person={person}/>
                        <Partners person={person}/>
                    </>
                }/>

            }
        />
    } else {
        return <></>
    }
}
interface PersonSubLayoutProps {
    person: Person
}

function Friends(props: PersonSubLayoutProps){
    let friends = props.person.friends()
    return <ConditionalComponent
        condition={() => friends?.length > 0}
        component={
        <NamedSection
            title={"Amici"}
            content={<List
                type={ListType.Unordered}
                list={friends}
                elementKey={p => p.node.RelativeUri(vocang)}
                elementContent={p => {
                    if (p.node.uri !== props.person.node.uri ) {
                        return <p>{p.fullName()}</p>
                    } else {
                        return <></>
                    }
                }}
                elementLink={p =>`/vocabolieri/${p.node.RelativeUri(vocang)}`}
            />}
        />
    }/>
}
function Partners(props: PersonSubLayoutProps){
    let partners = props.person.partners()
    return <ConditionalComponent
        condition={() => partners?.length > 0}
        component={
            <NamedSection
                title={"Partner"}
                content={<List
                    type={ListType.Unordered}
                    list={partners}
                    elementKey={p => p.node.RelativeUri(vocang)}
                    elementContent={p => <p>{p.fullName()}</p>}
                    elementLink={p =>`/vocabolieri/${p.node.RelativeUri(vocang)}`}
                />}
            />
        }/>
}
