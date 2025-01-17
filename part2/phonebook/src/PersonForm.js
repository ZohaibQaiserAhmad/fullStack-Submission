import React, { useState } from 'react'

//import service
import personService from './services/persons';



const PersonForm = (props) => {

    const { setPersons, persons, setAddMessage } = props;

    //states
    const [newName, setNewName] = useState('')
    const [newPhone, setPhoneNumber] = useState('');



    //handle name changes
    const handleNewName = (event) => {
        setNewName(event.target.value);
    }


    //handle phone changes
    const handleNewPhone = (event) => {
        setPhoneNumber(event.target.value);
    }

    //handle adding persons
    const addPerson = (event) => {

        event.preventDefault();

        //variable to handle duplicate
        const person = persons.find(p => p.name === newName);

        //check if values is there
        if (person) {
            const changedPerson = { ...person, number: newPhone };
            if (window.confirm(`${person.name} is already added to phonebook,replace the old number with a new one?`)) {

                personService
                    .update(person.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
                        const type = "success";
                        const message = `Added ${returnedPerson.name}`;
                        const messageObject = {
                            type: type,
                            message: message
                        }
                        setAddMessage(messageObject);
                    }).catch(error => {
                        const type = "error";
                        const message = `Information of ${newName} has already been removed from server`;
                        const messageObject = {
                            type: type,
                            message: message
                        }
                        setAddMessage(messageObject);
                        setPersons(persons.filter(person => person.name !== newName))
                    })
                setTimeout(() => {
                    setAddMessage(null);
                }, 5000)
            }

        }

        //create object useing new name, if not in persons
        else {

            const personObject = {
                name: newName,
                number: newPhone
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    const type = "success";
                    const message = `Added ${returnedPerson.name}`;
                    const messageObject = {
                        type: type,
                        message: message
                    }
                    setAddMessage(messageObject);
                    setNewName('');
                    setPhoneNumber('');
                    setTimeout(() => {
                        setAddMessage(null);
                    }, 5000)
                })


        }

        //reset after creating
        setNewName('');
        setPhoneNumber('');

    }

    return (
        <form onSubmit={addPerson}>
            <div>name: <input value={newName} onChange={handleNewName} /></div>
            <div>number: <input value={newPhone} onChange={handleNewPhone} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PersonForm;