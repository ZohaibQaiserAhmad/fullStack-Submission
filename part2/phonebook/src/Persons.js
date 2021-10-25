import React from 'react'

//for secure key id
import { nanoid } from 'nanoid'


const Persons = (props) => {

    const { filter, persons } = props;

    const personstoShow = filter
        ? persons.filter(persons => persons.name === filter)
        : persons

    return (
        <>
            {
                personstoShow.map(({ name, number }) => {
                    return (
                        <p key={nanoid()}>{name} {number}</p>
                    )
                })
            }
        </>);

}


export default Persons;