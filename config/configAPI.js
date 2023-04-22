fetch(`${process.env.API_URL}/configuration?api_key=${process.env.API_KEY}`)
  .then((response) => {
    if (!response.ok) {
      console.log('Bad things happened!');
    }
    return response.json();
  })
  .then((data) => {
    module.exports.baseImageURL = data.images.secure_base_url;
    module.exports.configData = data.images;
  })
  .catch((err) => console.log(err));


// Config API response:
//   {
//   base_url: 'http://image.tmdb.org/t/p/',
//   secure_base_url: 'https://image.tmdb.org/t/p/',
//   backdrop_sizes: [ 'w300', 'w780', 'w1280', 'original' ],
//   logo_sizes: [ 'w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original' ],
//   poster_sizes: [ 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original' ],
//   profile_sizes: [ 'w45', 'w185', 'h632', 'original' ],
//   still_sizes: [ 'w92', 'w185', 'w300', 'original' ]
//   }
