const CountryList = ({ filteredCountries, handleHideView, handleShowView }) => {
  return (
    <>
        {filteredCountries.map(country => (
            <p key={country.cca3}>
                {country.name.common}
                <button onClick={() => handleShowView(country.cca3)}>show</button>
                <button onClick={handleHideView}>Hide</button>
            </p>
        ))}
    </>
  )
}
export default CountryList