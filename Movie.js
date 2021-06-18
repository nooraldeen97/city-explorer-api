'use strict';
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

module.exports= Movie;