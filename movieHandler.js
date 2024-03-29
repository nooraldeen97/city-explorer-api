const Movie = require('./Movie');  // import Movie module 
require('dotenv').config();
const axios = require('axios');


let movieMomery={};

//localhost:3001/movies?city=usa
movieHandler= (req,res)=>{
    searchQuery=req.query.city;
    console.log(searchQuery);
    if(movieMomery[searchQuery]!== undefined)
    {
        res.send(movieMomery[searchQuery])
    }else
    {
        const movie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
        axios.get(movie).then(movieResult=>{
             let movieData=movieResult.data.results.map((item)=>{
                 return new Movie(item);
             })
             movieMomery[searchQuery]=movieData;
             res.send(movieData);
         })
         .catch(err=>{
            res.send(err.message)
         })

    }
       
}


module.exports=movieHandler;