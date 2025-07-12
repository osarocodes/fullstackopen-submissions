const Filter = ({handleFilter, filteredName}) => {

    return (
        <div>
            filter shown with: <input onChange={handleFilter} value={filteredName}/>
        </div>
    )
}
export default Filter