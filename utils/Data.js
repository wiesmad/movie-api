class Movie {
  constructor(film) {
    this._key = process.env.API_KEY;
    this.id = film.id;
    this.title = film.title;
    this.orgLng = film.original_language;
    this.poster = film.poster_path;
    this.genres = film.genres;
    this.time = film.runtime || 'unknown';
    this.status = film.status || 'unknown';
    this.vote = film.vote_average.toFixed(1) || '0.0';
    this.voteCount = film.vote_count;
    this.date = film.release_date || 'unknown';
    this.year = this.date.substring(0, 4) || 'unknown';
    this.overview = film.overview;
    this.images = `https://api.themoviedb.org/3/movie/${this.id}/images`;
    this.posterMed = `https://image.tmdb.org/t/p/w440_and_h660_face/${this.poster}?include_image_language=pl`;
    this.posterFull = `https://image.tmdb.org/t/p/original/${this.poster}`;
  }
}

class People {
  constructor(person) {
    this.gender = person.gender;
    this.dept = person.known_for_department;
    this.job = person.job;
    this.name = person.name;
    this.image = person.profile_path;
    this.id = person.id;
    this.character = person.character;
    this.creditID = person.credit_id;
    this.order = person.order;
    this.imageMed = `https://image.tmdb.org/t/p/w440_and_h660_face/${this.image}`;
    this.imageFull = `https://image.tmdb.org/t/p/original/${this.image}`;
  }
}

class Person {
  constructor(man) {
    this.name = man.name;
    this.otherNames = man.also_known_as;
    this.birth = man.birthday;
    this.death = man.deathday;
    this.gender = man.gender;
    this.www = man.homepage;
    this.place = man.place_of_birth;
    this.path = man.profile_path;
    this.imageMed = `https://image.tmdb.org/t/p/w440_and_h660_face/${this.path}`;
    this.imageFull = `https://image.tmdb.org/t/p/original/${this.path}`;
  }
}

class MovieCredit {
  constructor(movie) {
    this.title = movie.title;
    this.job = movie.job;
    this.character = movie.character;
    this.id = movie.id;
  }
}

module.exports = { Movie, People, Person, MovieCredit };
