const searchInput = ({ value, handleInput }) => {
  return (
    <>
      <h1>Find your desired country</h1>
      <div>
        find countries: 
        <input 
          placeholder="search countries..."
          value={value}
          onChange={handleInput} 
        />
      </div>
    </>
  )
}
export default searchInput