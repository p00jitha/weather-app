import React ,{useState,useEffect}from 'react';
import './app.css';
import {getWeather} from './weather.js'


function App(){
    const [weatherdata,setWeatherdata] = useState(null);
    const [city,setCity] = useState('Delhi');
    const getData = async() => {
        try{
            const data= await getWeather(city);
            setWeatherdata(data);
        }catch(err){
            console.log(err.message);
        }
    }
    
    useEffect(()=>{
        getData();
    },[]);

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
      }

    return(
        <>
        <div className='app'>
            <div className='card'>
                <h2 className='title'>
                    <i className='fa fa-cloud'></i>Weather App
                </h2>
                <div className='search'>
                    <input type='text' placeholder='Enter city name' onChange={(e)=>setCity(e.target.value)} />
                    <button type='button' onClick={() => getData()} >Search</button>
                </div>
                {weatherdata !== null ? ( 
                    <div className='container'>
                    <h4>Live Weather Condition</h4>
                    <div className='icon'>
                     <img src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`} alt='iconimg' />
                    </div>
                    <h3>{weatherdata.weather[0].main}</h3>
                    <div className='temp' >
                        <h1>{parseFloat(weatherdata.main.temp - 273.15).toFixed()}&deg;C</h1>
                    </div>
                    <div className='location'>
                        <h3><i className='fa fa-street-view'></i>{weatherdata.name} | {weatherdata.sys.country} </h3>
                        <div className="date"><h3>{dateBuilder(new Date())}</h3></div>
                    </div>
                    <div className='range'>
                        <h4>Min:{parseFloat(weatherdata.main.temp_min - 273.15).toFixed()}&deg;C || Max:{parseFloat(weatherdata.main.temp_max - 273.15).toFixed()}&deg;C || Humidity:{weatherdata.main.humidity}%</h4>
                    </div>
                </div>
                ) : null}

            </div>
        </div>
        </>
    );
}

export default App;