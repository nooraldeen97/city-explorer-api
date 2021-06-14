const express = require('express');
const server = express(); //I can use the express methods using server variable
const weatherData = require('./data/weather.json');
const cors = require('cors');
server.use(cors()); //make my server opened for everyone

const PORT = 3001;

//localhost:3001/
server.get('/',(req,res)=>{
    res.send('hello from back-end repo');
})

class Forecast {
    constructor(description , date){
        this.description=description,
        this.date=date
    }

    
    
}

//localhost:3001/weather?searchQuery=city-name&latitude=lat&longitudinal=lon
server.get('/weather',(req,res)=>{

    let searchQuery = req.query.searchQuery;
    let lat = req.query.latitude;
    let lon = req.query.longitudinal;
let dataForWeather= weatherData.find((item)=>{
    if(item.city_name.toLocaleLowerCase() == searchQuery.toLowerCase() && lat == item.lat && lon == item.lon)

        return (item);
    
    })
    try{
        let date ;
        let description;
        
        let forcastArr=dataForWeather.data.map((item)=>{
             date = item.valid_date;
             description = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
            return new Forecast(date,description);
        })
        res.send(forcastArr)

    }
catch{
    res.send('Error, your entered location not found')
console.log (dataForWeather)

}

})


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})