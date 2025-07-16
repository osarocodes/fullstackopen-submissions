import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import personService from './services/phonebook.js'
import Notification from './components/Notification.jsx'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [notification, setNotification] = useState('')
  const [color, setColor] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPerson => {
      setPersons(initialPerson)
    })
  }, [])

  const handleAddedPerson = (e) => {
    e.preventDefault()

    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()
    const existingPerson = persons.find(p =>
      p.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (!trimmedName || !trimmedNumber){
      setNotification(`Please fill both name and number fields`);
      setColor('orange')
      setTimeout(() => setNotification(null), 5000)
      return;
    }

    if (existingPerson) {
      
      if (existingPerson.number === trimmedNumber) {
        setNotification(`⚠️ ${trimmedName} already exists with this number`);
        setColor('orange')
        setTimeout(() => setNotification(null), 5000)
        return;
      }
      
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...existingPerson, number: trimmedNumber}
        
        personService.update(existingPerson.id, updatedPerson)
        .then(updated => {
          setPersons(persons.map(p => p.id === existingPerson.id ? updated : p))
          setNotification(`Updated ${existingPerson.name}'s number`);
          setColor('green')
          setTimeout(() => setNotification(null), 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotification(`Failed to update ${existingPerson.name}: ${error.message}`)
          setColor('red')
          setTimeout(() => setNotification(null), 5000)
        });
      };
      setNewName('')
      setNewNumber('')
      return;
    }
    const personObject = {
      name: trimmedName,
      number: trimmedNumber,
    }
    
    personService
    .create(personObject)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNotification(`Added ${trimmedName}`)
      setColor('green')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    })
  }


  const handleNewName = (e) => {
    setNewName(e.target.value)

  }
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilter = (e) => {
    setFilteredName(e.target.value)
  }
  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (!person) return;

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .Delete(id)
        .then(() => {
          setPersons(prev => prev.filter(p => p.id !== id));
          setNotification(`Deleted ${person.name}`)
          setColor('green')
          setTimeout(() => setNotification(null), 5000)
        })
        .catch(error => {
          console.error('Deletion failed:', error);
          setNotification(`Failed to delete ${person.name}. Reloading list...`);
          setColor('red')
          setTimeout(() => setNotification(null), 5000)
          personService.getAll().then(setPersons);
        });
    }
}

  const displayedPersons = filteredName
    ? persons.filter(person => 
      person.name.toLowerCase().includes(filteredName.toLowerCase()))
    : persons;
    
    

  return (
          <>
            <h1>Phonebook</h1>
            <Notification message={notification} color={color}/>
            <Filter handleFilter={handleFilter} filteredName={filteredName}/>
            <h3>Add a new</h3>
            <PersonForm 
            handleAddedPerson={handleAddedPerson}
            handleNewName={handleNewName}
            handleNewNumber={handleNewNumber}
            newName={newName}
            newNumber={newNumber}
            />
            <h3>Numbers</h3>
            {displayedPersons.map((person) => 
            <>
              <Persons key={person.id} person={person} handleDelete={handleDelete}/>
            </>
            )}
          </>
  )
}

export default App