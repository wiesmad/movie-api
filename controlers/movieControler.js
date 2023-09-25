const moment = require('moment');
const parser = require('accept-language-parser');
const { Movie, People, Person, MovieCredit } = require('../utils/Data');

const headers = {
  Authorization: `Bearer ${process.env.API_TOKEN}`,
  'Content-Type': 'application/json;charset=utf-8',
};

function URLvar(req) {
  option = req.params.opt;
  keyword = req.query.keyword;
  pageNr = req.query.page;
  page = pageNr === undefined ? 1 : pageNr;
}

module.exports.getMovies = async (req, res) => {
  URLvar(req);

  const pageTitle = option;
  const today = moment().format('YYYY-MM-DD');

  switch (option) {
    case 'now_playing':
      url = `${process.env.API_URL}/movie/${option}?page=${page}`;
      break;
    case 'popular':
      url = `${process.env.API_URL}/discover/movie?sort_by=vote_count.desc&page=${page}`;
      break;
    case 'top_rated':
      url = `${process.env.API_URL}/movie/${option}?page=${page}`;
      break;
    case 'upcoming':
      url = `${process.env.API_URL}/discover/movie?include_adult=false&include_video=false&page=1&primary_release_date.gte=${today}&sort_by=popularity.desc&page=${page}`;
      break;
    default:
      url = `${process.env.API_URL}/movie/now_playing?page=${page}`;
  }

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Bad things happened');
    const data = await response.json();
    const totalPages = data.total_pages > 500 ? 500 : data.total_pages;
    const currentPage = data.page;
    const count = totalPages === 500 ? totalPages * 20 : data.total_results;
    const movies = data.results.map((film) => new Movie(film));
    console.log(movies);
    res.render('index', { movies, pageTitle, totalPages, currentPage, count });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMoviesByGenre = async (req, res) => {
  URLvar(req);

  const pageTitle = option;
  url = `${process.env.API_URL}/discover/movie?with_genres=${option}&page=${page}&sort_by=vote_count.desc`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Bad things happened');
    const data = await response.json();
    const totalPages = data.total_pages > 500 ? 500 : data.total_pages;
    const currentPage = data.page;
    const count = totalPages === 500 ? totalPages * 20 : data.total_results;
    const movies = data.results.map((film) => new Movie(film));
    res.render('index', { movies, pageTitle, totalPages, currentPage, count });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMoviesByDirector = async (req, res) => {
  URLvar(req);

  const id = req.params.id;
  const pageTitle = 'Movie by Director';

  url = `${process.env.API_URL}/discover/movie?with_crew=${id}&page=${page}&sort_by=vote_count.desc`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Bad things happened');
    const data = await response.json();
    const totalPages = data.total_pages > 500 ? 500 : data.total_pages;
    const currentPage = data.page;
    const count = totalPages === 500 ? totalPages * 20 : data.total_results;
    const movies = data.results.map((film) => new Movie(film));
    res.render('index', { movies, pageTitle, totalPages, currentPage, count });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMoviesByKeyword = async (req, res) => {
  URLvar(req);
  const pageTitle = `Search results for keyword: ${keyword}`;
  const url = `${process.env.API_URL}/search/movie?query=${keyword}&page=${page}`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Bad things happend');
    let data = await response.json();
    console.log(data);

    let totalPages = data.total_pages > 500 ? 500 : data.total_pages;
    let currentPage = data.page;
    const count = totalPages === 500 ? totalPages * 20 : data.total_results;
    movies = data.results.map((film) => new Movie(film));

    res.render('index.html', {
      movies,
      currentPage,
      totalPages,
      count,
      pageTitle,
      keyword,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMovieData = async (req, res) => {
  const id = req.params.id;
  const url = `${process.env.API_URL}/movie/${id}?append_to_response=credits`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Bad things happend');
    const data = await response.json();
    console.log(data);
    const pageTitle = 'Movie data';
    const movie = new Movie(data);
    const cast = data.credits.cast.map((person) => new People(person));
    const crew = data.credits.crew.map((person) => new People(person));

    let director = crew.find((el) => el.job == 'Director');

    res.render('movie.html', { movie, cast, director, pageTitle });
  } catch (error) {
    console.log(error);
    // res.redirect('index.html');
  }
};

module.exports.getPersonData = async (req, res) => {
  const id = req.params.id;
  const url = `${process.env.API_URL}/person/${id}?language=en-US&sort_by=primary_release_date.desc&append_to_response=combined_credits`;
  // const url = `${process.env.API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_cast=${id}&append_to_response=movie_credits`;
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Bad things happend');
    const data = await response.json();
    // console.log(data);
    const pageTitle = 'Person data';
    const person = new Person(data);
    const cast = await data.combined_credits.cast.map(
      (movie) => new MovieCredit(movie)
    );
    const crew = await data.combined_credits.crew.map(
      (movie) => new MovieCredit(movie)
    );
    // console.log(cast);

    res.render('person.html', { pageTitle, person, cast, crew });
  } catch (error) {
    console.log(error);
    // res.redirect('index.html');
  }
};
