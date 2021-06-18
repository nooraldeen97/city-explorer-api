const express = require('express');
const axios = require('axios');
const server = express(); //I can use the express methods using server variable
const weatherData = require('./data/weather.json');
require('dotenv').config();
const cors = require('cors');
server.use(cors()); //make my server opened for everyone

const PORT = process.env.PORT;

server.get('/',(req,res)=>{
    res.send('hello from home page ');
})

//localhost:3001/test
server.get('/test',(req,res)=>{
    res.send('hello from back-end repo');
})

class Forecast {
    constructor(item){
        this.description=`Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
        this.date=item.valid_date;
    }
}

    class Movie {
        constructor(item){
          this.title=item.title,
          this.overview=item.overview,
          this.average_votes=item.vote_average,
          this.total_votes=item.vote_count,
          this.image_ur=`https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          this.popularity=item.popularity,
          this.released_on=item.release_date
        }
    }
    
//localhost:3001/movies?city=usa
server.get('/movies',(req,res)=>{
    searchQuery=req.query.city;
    console.log(searchQuery);
    const movie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`
    axios.get(movie).then(movieResult=>{
         let movieData=movieResult.data.results.map((item)=>{
             return new Movie(item);
         })
         
         res.send(movieData);
     })
     .catch(err=>{
        res.send(err.message)
     })
       
})

//localhost:3001/weather?searchQuery=city-name
server.get('/weather', async(req,res)=>{

    let searchQuery = req.query.searchQuery;
    const weatherURL =`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`
    // let dataForWeather= weatherResult.data.find((item)=>{
        // if(item.city_name.toLocaleLowerCase() == searchQuery.toLowerCase())
        //     return (item);
        // })
         axios.get(weatherURL).then(weatherResult=>{
             console.log(weatherResult.data);
             
             let forcastArr=weatherResult.data.data.map((item)=>{
                   return new Forecast(item);
         })
         console.log(forcastArr)
         res.send(forcastArr)
            })
            .catch(err=>{
                res.send(err.message)
            })

})


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})