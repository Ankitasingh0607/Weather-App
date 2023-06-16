import React, { useEffect, useState } from 'react'
import './style.css'
import clouds from '../components/images/clouds.png'
import clear from '../components/images/clear.png'
import drizzle from '../components/images/drizzle.png'
import mist from '../components/images/mist.png'
import rain from '../components/images/rain.png'
import Humidity from '../components/images/humidity.png'
import Wind from '../components/images/wind.png'
import axios from 'axios';


function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity : 10,
        speed: 2,
        image: clouds
    })
    const [name,setName] = useState('');
    const [error,setError] = useState('');
    const handleClick =()=>{
        if(name!==""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5fc32b5c834d09becce3fae0da4ad47c&&units=metric`;
        axios.get(apiUrl)
        .then(res=> {
            let imagePath = null;
            if(res.data.weather[0].main == "Clouds"){
                imagePath = clouds;
            }else if(res.data.weather[0].main == "Clear"){
                imagePath = clear;        
            }else if(res.data.weather[0].main == "Rain"){
                imagePath =  rain;      
            }else if(res.data.weather[0].main == "Drizzle"){
                imagePath = drizzle;       
            }else if(res.data.weather[0].main == "Mist"){
                imagePath =  mist  ;    
            }else {
                imagePath = clouds;
            }
            setData({
                ...data,celcius:res.data.main.temp,
                name:res.data.name,
                humidity:res.data.main.humidity,
                speed:res.data.wind.speed,
                image:imagePath
            })
        })
        .catch(err=> {
            if(err.response.status==404){
             setError('Invalid city')
            }else{
            setError('')
            }
           console.log(err)});
        }
    }
  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
               <input type='text'  placeholder='Enter City Name..'onChange={e=>setName(e.target.value)}/> 
               <button>
                <img onClick={handleClick} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAaVBMVEX///8AAACXl5ebm5vo6Oje3t78/Pyjo6PY2Nj19fXPz8/b29vV1dXr6+vk5OQnJyeAgIBgYGDGxsa8vLy2traqqqpPT09ISEgwMDAhISFDQ0NYWFgUFBRwcHCLi4sbGxs4ODgLCwt4eHh4/KDcAAAEHElEQVRoge1b6ZqqMAwFRKC4sIPIKu//kFdSQHFkbNq43G88f6U9E3J60rSMpn3xxRefBmu3ceNkZRirJA4d03oZMdvHXXrQr+ClVbJmL6B26ky/i9Z3n8vM7MN9Zo7G2D2Neu//xswRbJ5CvZtRt0FXn8V2Fl3dBcfrX6o1ObWV5NP0mR/uZ/JiZlin5fhzWRNrb11MIdvOwiPJ9AJaUuklU0p/ndaZMrMio7aCYcpu/+hRVo+pIdL9fnidhZCSdhV/Oid59Vu+tJtYdEDYwoBTSMDNVZ4iFtAYvDL7ms/j40atSNhNPkuCHRcRsO94viP8SOcEfrPgCSKwClnukf0gb3Z80QrLfA6Xu5Isd6hmVpGcXDgYlIpKllvTuNmaUmNhteby3JoGkkllRm7h796qkJuNrGZSCXO5RSKpeJCLp7gtsFIpyVqZglQvgPWWY0OAZXZUbwYCmdALBXu5xgZcFjfGga0YxUYwwxs0GKtBwK3FeJP15L3pBgzsAvMOXWlr+okKqx6DcPsbYSsEbAGJuq6dh3MrC/JEwz3o/eGOfwKkvKAir3FJTwhTPpileIWqpXdu97DBrfRAuZJfw+zbjkxYcb3YSxKL6cH6Xs8TbRwtqTq4PF2BkTuQe3Rna0Au2utxcjJuLiEU+eGd5G+NnDDnePKcWHDC5t43xg3ZSSbrK0sjbBvEDtfX1KOwbUCHR3Cew7HGebvdP25TkUNV63CPK/TGcxi4UBjpTiZF7slysp3zOZJ+7ZSIMlUTJh2dwxDfZizCxwbCcmybsQw4nUA5VkX23nmvjRoCm+eMwt4DiV47IzI5fniLjCIm6hu6fp4aOQhWp3ro+36Wk3ivNMDGC+UOKly3MsLKCQQfygU+HvsqbSmYJ930QUHIVMjhpcsdK4FYVE6F+FWg5BUXaE6+W4XuVP70lt8kSm7mdo1a78EXu/CWez4WxKayKdifYAaJOyKT/91KLsVvafCi2QyfN6idrQy3c8iyFDb6ALUj1OHq3McUJlu/QM0jYz5JK5x4s9B1Mnb3NAQvZFWWod9ALe/mcHtf2g/prai55VbNu9UN07SrXwsNm77ZSAlj12JvmOfUuQvhW44/PqQn4w06DTvrppm8Lv4RP4v8dnqg6Av4PPWqG+HN7FUWdRKF7nbrulFiBNe/tIOr2TN25ZPccEZyH8dLESRm17ZVvkAKKIPw2ovmeSe4LjLjdIG/PNq3m7V53knO0M3oIusRZxHeK7zz2KnOOtg2susqOKOq7Xhp9T2LXRRz1ZFcEyJArrr/iJ3W67D4JNXRfSUow/7evL869k9i/8uqezX7J3nde2P/y0773gpLdkmPZy/J7u6EcdG8wie50hhjf87/XjyC/UZuYFf5DFoRBt09sQRevca++OKLHv8As2MpELbWo5kAAAAASUVORK5CYII=' alt=''/>
               </button>


            </div>
            <div className='error'>
                <p> {error} </p>
            </div>
            <div className='winfo'>
                <img src={data.image} alt='' className='icon'/>
                <h1>{Math.round(data.celcius)}°c </h1>
                <h2>{data.name}</h2>

                <div className='details'>
                    <div className='col'>
                        <img src={Humidity} alt=''/>
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                        <img src={Wind} alt='' />
                        <div className='wind'>
                            <p>{Math.round(data.speed)}km/h</p>
                            <p>wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Home