const Persons = ({person, handleDelete}) => {

    return (
        <>
            <p> {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></p>
        </>
    )
}
export default Persons