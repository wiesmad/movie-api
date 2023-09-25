const express = require('express');
const router = express.Router();

const {
  getMovies,
  getMoviesByGenre,
  getMoviesByKeyword,
  getMovieData,
  getPersonData,
  getMoviesByDirector,
} = require('../controlers/movieControler');

router.get('/', (req, res) => {
  res.redirect('/movies/now_playing');
});

router.get('/movies/:opt', getMovies);

router.get('/genres/:opt', getMoviesByGenre);

router.get('/search', getMoviesByKeyword);

router.get('/movie/:id', getMovieData);

router.get('/person/:id', getPersonData);

router.get('/director/:id', getMoviesByDirector);

module.exports = router;
