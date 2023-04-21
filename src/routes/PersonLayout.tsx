import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {RDFStore} from "../rdf/RDFStore";
import {vocang} from "../rdf/prefixes";
import DefaultLayout from "../components/common/DefaultLayout";
import {Person} from "../rdf/types/Person";
import ConditionalComponent from "../components/common/conditional/ConditionalComponent";
import {ImageSection} from "../components/common/ImageSection";

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
        let fullName = `${person.firstName} ${person.lastName}`
        return <ConditionalComponent
            condition={() => person !== undefined && person !== null}
            component={
                <DefaultLayout title={""} subtitle={""} content = {
                    <ImageSection
                        content={
                            <h2>{fullName}</h2>
                        }
                        imageSrc={person.image !== undefined ? person.image : ""}
                        imageAlt={fullName}/>
                }/>
            }
        />
    } else {
        return <> </>
    }
}