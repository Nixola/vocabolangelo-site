import {Concept} from "../rdf/types/Concept";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {RDFStore} from "../rdf/RDFStore";
import {vocang} from "../rdf/prefixes";
import DefaultLayout from "../components/common/DefaultLayout";
import {Person} from "../rdf/types/Person";
import ConditionalComponent from "../components/common/conditional/ConditionalComponent";

interface PersonLayoutProps{
    person: Person
}

export function PersonLayout(props: PersonLayoutProps) {

    const [person, setPerson] = useState({});
    const params = useParams()

    useEffect(() => {
        RDFStore.safeCall(store => {
            return new Person(store.sym(vocang.uri + params.personId))
        }).then(person =>
            setPerson(person)
        )
    }, [params.personId])

    let p = person as Person
    let fullName = `${p.firstName} ${p.lastName}`
    return <ConditionalComponent
        condition={() => person !== undefined && person !== null}
        component={
            <DefaultLayout title={fullName} subtitle={p.nick} content = {<></>}/>
        }
    />
}