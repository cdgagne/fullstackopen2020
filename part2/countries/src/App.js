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

const Country = ({country}) => {
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

const Error = () => <div>Too many matches, specify another filter</div>

const Results = ({matchingCountries, handleShowButtonClicked}) => {
    if (matchingCountries.length === 0) {
        return <div></div>
    } else if (matchingCountries.length === 1) {
        return <Country country={matchingCountries[0]} />
    } else if (matchingCountries.length <= 10) {
        return <CountryList countries={matchingCountries} handleShowButtonClicked={handleShowButtonClicked} />
    } else {
        return <Error />
    }
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [matchingCountries, setMatchingCountries] = useState([])

    const hook = () => {
        axios.get('http://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
        })
    }
    useEffect(hook, [])

    const handleSearchTextChange = (event) => {
        const searchText = event.target.value.toLowerCase()
        setMatchingCountries(searchText
            ? countries.filter(country => country.name.toLowerCase().includes(searchText))
            : [])
    }

    const handleShowButtonClicked = (event) => {
        event.preventDefault()
        const countryName = event.target.getAttribute("countryname")
        console.log("country name", countryName)
        setMatchingCountries(countries.filter(country => country.name === countryName))
    }

    return (
        <div>
            <Search handleChange={handleSearchTextChange} />
            <Results matchingCountries={matchingCountries} handleShowButtonClicked={handleShowButtonClicked}/>
        </div>
    )
}

export default App