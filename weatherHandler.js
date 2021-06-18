const axios = require('axios');
require('dotenv').config();
const weather =require('./weather'); // import weather module
// const weatherData = require('./data/weather.json'); // this regards to lab-07


//localhost:3001/weather?searchQuery=city-name
weatherHandler=(req,res)=>{

    let searchQuery = req.query.searchQuery;
    const weatherURL =`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`
    // this regards to lab-07
    // let dataForWeather= weatherData.data.find((item)=>{
        // if(item.city_name.toLocaleLowerCase() == searchQuery.toLowerCase())
        //     return (item);
        // })
         axios.get(weatherURL).then(weatherResult=>{
             console.log(weatherResult.data);
             
             let forcastArr=weatherResult.data.data.map((item)=>{
                   return new weather(item);
         })
         console.log(forcastArr)
         res.send(forcastArr)
            })
            .catch(err=>{
                res.send(err.message)
            })

}

module.exports=weatherHandler;