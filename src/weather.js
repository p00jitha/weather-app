import axios from 'axios'
    const url='https://api.openweathermap.org/data/2.5/weather?';
    const key = '7c21f2f65bbdb4de145618bcecaa94a9'
    
export const getWeather=async(cityname)=>{
        try{
            const {data} = await axios.get(url+`q=${cityname}&appid=${key}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }


