const express = require('express');
const router = express.Router();
// const configAPI = require('../config/configAPI');
const Movie = require('../utils/Movie');
let movies = [];

router.get('/', (req, res) => {
  const url = `${process.env.API_URL}/trending/movie/day?api_key=${process.env.API_KEY}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log('Bad things happened!');
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      const pageTitle = 'Daily tranding:'
      movies = data.results.map((film) => new Movie(film));
      res.render('index.html', { movies, pageTitle });
    })
    .catch((err) => console.log(err.message));
});

router.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const pageNr = 1
  
  const headers = {
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  };

  const url = `${process.env.API_URL}/search/movie?query=${keyword}&page=${pageNr}`;

  fetch(url, {
    method: 'GET',
    headers: headers
  })
    .then((res) => {
      if (!res.ok) {
        console.log('Bad things happened!');
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      let totalPages = data.total_pages;
      let currentPage = data.page;
      let count = data.total_results;
      let pageTitle = `Search results for keyword: ${keyword}`;
      movies = data.results.map((film) => new Movie(film));
      res.render('index.html', { movies, currentPage, totalPages, count, pageTitle });
    });
});

router.get('/movie/:id', (req, res) => {
  const id = req.params.id;
  const url = `${process.env.API_URL}/movie/${id}?api_key=${process.env.API_KEY}`;
  
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log('Bad things happened!');
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      let pageTitle = 'Movie data:'
      let movie = new Movie(data);
      res.render('movie.html', { movie, pageTitle });
    })
    .catch((err) => console.log(err.message));
});

module.exports = router;
