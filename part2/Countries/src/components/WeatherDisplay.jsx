const WeatherDisplay = ({ country, weatherData}) => {
  return (
    <>
      <h2>Weather in {country.name.common}</h2>
      {weatherData && (
      <div>
        <p>Temperature: {weatherData.main.temp} °C</p>
        {weatherData.weather.map(weather => 
          <img key={weather.id} src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
        )}
        <p>Wind: {weatherData.wind.speed} m/s</p>
      </div>
      )}
    </>
    
  )
}
export default WeatherDisplay