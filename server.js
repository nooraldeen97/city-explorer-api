const express = require('express');
const server = express(); //I can use the express methods using server variable
// const weatherData = require('./data/weather.json'); // this regards to lab-07
require('dotenv').config();
const cors = require('cors');
server.use(cors()); //make my server opened for everyone
const movieHandler = require('./movieHandler')
const weatherHandler = require('./weatherHandler')



const PORT = process.env.PORT;

server.get('/',(req,res)=>{
    res.send('hello from home page ');
})

//localhost:3001/test
server.get('/test',(req,res)=>{
    res.send('hello from back-end repo');
})



    
//localhost:3001/movies?city=usa
server.get('/movies',movieHandler)



//localhost:3001/weather?searchQuery=city-name
server.get('/weather',weatherHandler)


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})