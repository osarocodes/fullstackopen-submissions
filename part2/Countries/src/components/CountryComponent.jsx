import SearchInput from "./SearchInput"
import CountryList from "./CountryList"
import CountryDetails from "./CountryDetails"

const CountryComponent = ({ value, filteredCountries, handleShowView, handleHideView, handleInput, showView, weatherData, selectedCountry }) => {

  return (
    <>
      <SearchInput value={value} handleInput={handleInput}/>
      {value.length === 1 && filteredCountries.length >= 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (filteredCountries.length > 0 && (
          <div>
              {filteredCountries.length > 1 ? (
                <>
                  <CountryList filteredCountries={filteredCountries} handleHideView={handleHideView} handleShowView={handleShowView}/>
                  <CountryDetails country={showView} weatherData={weatherData}/>
                </>
            ) : (<CountryDetails country={selectedCountry} weatherData={weatherData}/>)
            }
          </div>
        )
      )}
    </>
  )
}
export default CountryComponent