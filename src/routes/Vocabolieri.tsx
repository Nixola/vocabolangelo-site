import React, {useEffect, useState} from "react";
import {Person} from "../rdf/types/Person";
import {List, ListType} from "../components/common/List";
import {vocang} from "../rdf/prefixes";
import DefaultLayout from "../components/common/DefaultLayout";

export default function Vocabolieri(){

    const noPeople: Person[] = []
    const [people, setPeople] = useState(noPeople)
    useEffect(() => {
        Person.all().then(people =>
            setPeople(people)
        )
    }, [])

    function alphabeticStrategy(person: Person, letter: string){
        return person.lastName.charAt(0).toLowerCase() === letter
    }

    return <DefaultLayout
        title={"Vocabolieri"}
        subtitle={null}
        content={
            <List
                type={ListType.Alphabetic}
                list={people}
                elementKey={person => person.relativeUri(vocang)}
                elementContent={person => <p>{person.lastName} {person.firstName}</p>}
                elementLink={person => "/vocabolieri/" + person.relativeUri(vocang)}
                alphabeticStrategy={alphabeticStrategy}
            />
        }
    />
}