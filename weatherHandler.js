const axios = require('axios');
require('dotenv').config();
const weather =require('./weather'); // import weather module



let weatherMomery={};

//localhost:3001/weather?searchQuery=city-name
weatherHandler=(req,res)=>{

    let searchQuery = req.query.searchQuery;
    // this regards to lab-07
    // let dataForWeather= weatherResult.data.find((item)=>{
        // if(item.city_name.toLocaleLowerCase() == searchQuery.toLowerCase())
        //     return (item);
        // })
        if(weatherMomery[searchQuery] !== undefined)
        {
            res.send(weatherMomery[searchQuery])
        }else
        {
            const weatherURL =`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`
             axios.get(weatherURL).then(weatherResult=>{
                 console.log(weatherResult.data);
                 
                 let forcastArr=weatherResult.data.data.map((item)=>{
                       return new weather(item);
             })
             weatherMomery[searchQuery]=forcastArr;
             res.send(forcastArr)
                })
                .catch(err=>{
                    res.send(err.message)
                })

        }

}

module.exports=weatherHandler;