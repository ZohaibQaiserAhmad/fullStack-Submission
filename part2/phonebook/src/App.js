import React, { useState, useEffect } from 'react';

//import 
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

//import service
import personService from './services/persons';




const App = () => {

  //state for filters
  const [filter, setFilter] = useState('');

  const [persons, setPersons] = useState([]);

  const [addMessage, setAddMessage] = useState("");

  //effect hook
  useEffect(() => {

    personService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
      })

  }, [])


  const Notification = ({ message }) => {

    console.log("here", message);
    if (message === null || !message.type) {
      return null
    }

    else if (message.type === 'success') {
      return (
        <div className="success">
          {message.message}
        </div>
      )
    }
    else if (message.type === 'error') {
      return (
        <div className="error">
          {message.message}
        </div>
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} />
      <Filter setFilter={setFilter} filter={filter} />
      <h3>Add a new</h3>
      <PersonForm setPersons={setPersons} persons={persons} addMessage={addMessage} setAddMessage={setAddMessage} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} setPersons={setPersons} addMessage={addMessage} setAddMessage={setAddMessage} />

    </div>
  )
}

export default App