import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  //effect hook
  useEffect(() => {

    personService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
      })

  }, [])



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} filter={filter} />
      <h3>Add a new</h3>
      <PersonForm setPersons={setPersons} persons={persons} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} setPersons={setPersons} />

    </div>
  )
}

export default App