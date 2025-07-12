import { useEffect, useState } from "react"
import CountryComponent from "./components/CountryComponent"
import axios from 'axios'

const App = () => {

  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [showView, setShowView] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {

    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(res => {
      setAllCountries(res.data)
    })
    .catch(error => {
      alert("Failed to fetch countries: ", error.message)
    })
  }, [])



  useEffect(() => {

    if (value.length === 0) {
      setFilteredCountries([])
      return
    }

    const matches = allCountries.filter(c => 
      c.name.common.toLowerCase().includes(value.toLowerCase()))
      setFilteredCountries(matches.slice(0, 10))
    }, [value, allCountries])
    
    useEffect(() => {
      if (value && filteredCountries.length === 1) {
        const displayedCountry = filteredCountries[0].name.common;
        
        axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${displayedCountry}`)
        .then(response => {
          setSelectedCountry(response.data)
        })
        .catch(error => {
            alert(error.message)
          })
        
      }
  }, [value, filteredCountries])

  useEffect(() => {
    if (!selectedCountry) return;

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const capital = selectedCountry.capital?.[0]
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`

    axios.get(weatherURL)
      .then(response => {
        setWeatherData(response.data)
      })
      .catch(error => {
        console.error('Failed to fetch weather', error)
      })
    }, [selectedCountry])

  const handleShowView = (id) => {
    const country = filteredCountries.find(c => c.cca3 === id)
    setShowView(country);
  }
  const handleHideView = () => setShowView('');  
  const handleInput = (e) => setValue(e.target.value)

  if (allCountries.length === 0) return <p>Loading...</p>


  return (
        <CountryComponent value={value} filteredCountries={filteredCountries} handleShowView={handleShowView} handleHideView={handleHideView} handleInput={handleInput} showView={showView} weatherData={weatherData} selectedCountry={selectedCountry}/>
  )
}
export default App