import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid'

const api_key = process.env.REACT_APP_API_KEY
// variable api_key has now the value set in startup


const Filter = (props) => {

  const { setFilter, filter } = props;

  //handle filter
  const handleFilter = (event) => {
    //set filter
    let filter = event.target.value;
    setFilter(filter);
  }

  return (
    <div>find Countries <input value={filter} onChange={handleFilter} /></div>
  )

}


const Countries = (props) => {

  const { filter, setFilter, countries } = props;

  const [show, setShow] = useState("");
  const [weather, setWeather] = useState({});

  let countriesToShow = filter
    ? countries.filter(country => country.name.official.includes(filter))
    : countries

  const handleShowButton = (props) => {

    setFilter(props.countryName.official);

    //handle weather
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${api_key}`).
      then(response => {
        //extract values
        const data = response.data;
        const temp = data.main.temp;
        const weather = data.wind.speed;
        const imageIcon = data.weather[0].icon;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;

        //create object
        const weatherObject = {
          temperature: temp,
          weather: weather,
          image: `http://openweathermap.org/img/wn/${imageIcon}@2x.png`,
          speed: windSpeed,
          description: description
        }
        setWeather(weatherObject);
      })

  }

  return (
    <>
      {
        //check if its greater than 10
        countriesToShow.length > 10
          ? "Too many matches, specify another filter"
          //check if its greater than 1
          : countriesToShow.length > 1 && !show
            ? countriesToShow.map(({ name, capital }) => {
              let props = {
                countryName: name,
                capital: capital
              }
              return (
                <div key={nanoid()}>
                  {name.official}
                  <button onClick={() => handleShowButton(props)}>show</button>
                </div>
              )
            })
            //last case (equal to 1)
            : countriesToShow.map(({ name, capital, population, languages, flags }) => {
              //weather
              return (
                <div key={nanoid}>
                  <h1 key={nanoid()}>{name.official}</h1>
                  <p key={nanoid()}>Capital {capital}</p>
                  <p key={nanoid()}>population {population}</p>
                  <h2 key={nanoid()}>languages</h2>
                  {Object.keys(languages).map(key => {
                    return <li key={nanoid()}>{languages[key]}</li>
                  })}
                  <br />
                  <img src={flags.png}></img>

                  <div><b>temperature : </b> {weather.temperature} Fahrenheit </div>
                  <img src={weather.image} />
                  <div><b>wind : </b> {weather.speed} mph</div>
                  <div><b>Description : </b> {weather.description} </div>
                </div>

              )
            })

      }
    </>);

}

const Form = () => {


  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  //useEffect
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        console.log(response.data);
        setCountries(response.data);
      })

  }, [])


  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries filter={filter} setFilter={setFilter} countries={countries} />
    </div >
  )
}

const App = () => {
  return (
    <div>
      <Form></Form>
    </div>
  );
}

export default App;
