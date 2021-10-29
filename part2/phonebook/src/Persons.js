import React from 'react'

//for secure key id
import { nanoid } from 'nanoid'

//import service
import personService from './services/persons';


const DeletePerson = (props) => {

    const { setPersons, id, persons, setAddMessage } = props;

    const handleDelete = (ids) => {
        const person = persons.find(p => p.id === ids);

        if (window.confirm(`Delete ${person.name} ?`)) {

            personService
                .deleteRoute(id, person)
                .then(response => {
                    console.log(response);
                    setPersons(persons.filter(p => p.id !== ids))
                })
                .catch(error => {
                    const type = "error";
                    const message = `Information of ${persons.name} has already been removed from server`;
                    const messageObject = {
                        type: type,
                        message: message
                    }
                    setAddMessage(messageObject);
                })
        }
    }
    return (
        <button onClick={() => handleDelete(id)}>
            Delete
        </button>
    )
}


const Persons = (props) => {

    const { filter, persons, setPersons } = props;

    const personstoShow = filter
        ? persons.filter(persons => persons.name === filter)
        : persons

    return (
        <>
            {
                personstoShow.map(({ name, number, id }) => {

                    return (
                        <p key={nanoid()}>{name} {number} <DeletePerson setPersons={setPersons} id={id} persons={persons} /></p>
                    )
                })
            }
        </>);

}



export default Persons;
