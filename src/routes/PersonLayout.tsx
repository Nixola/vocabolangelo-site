import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {RDFStore} from "../rdf/RDFStore";
import {vocang} from "../rdf/prefixes";
import DefaultLayout from "../components/common/DefaultLayout";
import {Person} from "../rdf/types/Person";
import ConditionalComponent from "../components/common/conditional/ConditionalComponent";
import {ImageSection} from "../components/common/ImageSection";

export function PersonLayout() {

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
            <DefaultLayout title={""} subtitle={""} content = {
                <ImageSection
                    content={
                        <h2>{fullName}</h2>
                    }
                    imageSrc={p.image !== undefined ? p.image : ""}
                    imageAlt={fullName}/>
            }/>
        }
    />
}