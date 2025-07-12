import WeatherDisplay from "./WeatherDisplay"

const CountryDetails = ({ country, weatherData }) => {
  return (
      <>
          {country && (
              <div>
                <h2>{country.name.common}</h2>
                <img src={country.flags.png} alt={country.flags.alt} width='200' />
                <p>Capital: {country.capital?.[0]}</p>
                <p>Area: {country.area} km²</p>
                <h2>Languages</h2>
                <ul>
                  {Object.values(country.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
                <WeatherDisplay country={country} weatherData={weatherData}/>
              </div>
          )}
      </>
  )
}
export default CountryDetails