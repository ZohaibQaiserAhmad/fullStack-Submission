import React, { useState } from 'react'


const PersonForm = (props) => {

    const { setPersons, persons } = props;

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
        let duplicate = false;

        //check if values is there
        for (var i in persons) {
            if (newName === persons[i].name) {
                duplicate = true; //duplicate
                window.alert(`${newName} is already added to phonebook`);
            }
        }

        //create object useing new name, if not in persons
        if (!(duplicate)) {

            const personObject = {
                name: newName,
                number: newPhone
            }


            setPersons(persons.concat(personObject));
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