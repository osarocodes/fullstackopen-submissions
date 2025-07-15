const PersonForm = ({handleAddedPerson, handleNewName, handleNewNumber, newName, newNumber}) => {
    return (
        <form onSubmit={handleAddedPerson}>
            <div>
                name: <input onChange={handleNewName} value={newName} /><br />
                number: <input onChange={handleNewNumber} value={newNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default PersonForm