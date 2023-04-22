class Movie {
  #date;

  constructor(film) {
    this.id = film.id;
    this.title = film.title;
    this.poster = film.poster_path;
    this.genres = film.genres;
    this.time = film.runtime || 'unknown';
    this.status = film.status || 'unknown';
    this.vote = film.vote_average.toFixed(1) || '0.0';
    this.date = film.release_date;
    this.overview = film.overview;
    this.images = `https://api.themoviedb.org/3/movie/${this.id}/images?api_key=6c67e8fc6714be4f26bf5b1a09ab7c5e`
    this.posterURL = `https://image.tmdb.org/t/p/w342/${this.poster}`; 
    this.#date = new Date(film.release_date);
  }

  getYear() {
    return this.#date.getFullYear();
  }
} 

module.exports = Movie;
