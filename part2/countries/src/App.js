/**
 *  Full stack open 2020
 *  2.12 - 2.14 Data for countries
 */

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({handleChange}) => {
    return (
        <div>find countries <input onChange={handleChange} /></div>
    )
}

const CountryList = ({countries, handleShowButtonClicked}) => {
    return(
        <div>
        {countries.map(country => <div key={country.name}>{country.name} <button countryname={country.name} onClick={handleShowButtonClicked}>show</button></div>)}
        </div>
    )
}

const Weather = ({weather}) => {
    if (Object.keys(weather).length === 0) {
        return <div></div>
    } else {
        return (<div>
            <h3>Weather in {weather.city}</h3>
            <div><b>temperature:</b> {weather.temperature}</div>
            <div><img src={weather.image} alt={weather.description} /></div>
            <div><b>wind:</b> {weather.wind}</div>
        </div>)
    }
}

const Country = ({country}) => {
    if (Object.keys(country).length === 0) {
        return <div></div>
    } else {
        const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)
        return (
            <div>
                <h2>{country.name}</h2>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h3>languages</h3>
                <ul>{languages}</ul>
                <img src={country.flag} height="100px" alt={`Flag of ${country.name}`} />
            </div>
        )
    }
}

const Error = () => <div>Too many matches, specify another filter</div>

const Results = ({results, handleShowButtonClicked}) => {
    if (results.length === 0) {
        return <div></div>
    } else if (results.length <= 10) {
        return <CountryList countries={results} handleShowButtonClicked={handleShowButtonClicked} />
    } else if (results.length > 10) {
        return <div></div>
    } else {
        return <Error />
    }
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [results, setResults] = useState([])
    const [country, setCountry] = useState({})
    const [weather, setWeather] = useState({})

    const countriesHook = () => {
        axios.get('http://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
        })
    }
    useEffect(countriesHook, [])

    const weatherHook = () => {
        if (Object.keys(country).length > 0) {
            const weather_api_url = 'http://api.weatherstack.com/current?access_key=' +
                process.env.REACT_APP_WEATHERSTACK_API_KEY +
                '&query=' +
                country.capital
            axios.get(weather_api_url)
                .then(response => {
                    const weather = response.data.current
                    setWeather({
                        city: country.capital,
                        temperature: weather.temperature + " Celcius",
                        image: weather.weather_icons[0],
                        description: weather.weather_descriptions[0],
                        wind: weather.wind_speed + 'mph direction ' + weather.wind_dir
                    })
                })
        }
    }
    useEffect(weatherHook, [country])

    const handleSearchTextChange = (event) => {
        const searchText = event.target.value.toLowerCase()
        const searchResults = countries.filter(country => country.name.toLowerCase().includes(searchText))
        if (searchResults.length === 1) {
            setResults([])
            setCountry(searchResults[0])
        } else {
            setResults(searchResults)
            setCountry({})
            setWeather({})
        }
    }

    const handleShowButtonClicked = (event) => {
        event.preventDefault()
        const countryName = event.target.getAttribute("countryname")
        const country = countries.filter(country => country.name === countryName)[0]

        setResults([])
        setCountry(country)
        setWeather({})
    }

    return (
        <div>
            <Search handleChange={handleSearchTextChange} />
            <Results results={results} handleShowButtonClicked={handleShowButtonClicked}/>
            <Country country={country} />
            <Weather weather={weather} />
        </div>
    )
}

export default App