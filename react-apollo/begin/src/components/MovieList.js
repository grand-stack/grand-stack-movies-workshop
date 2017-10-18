// This component is used at the beginning of the exercise as a skeleton example
// We'll replace this component with one that uses GraphQL to fetch movies

import React, {Component} from 'react';
import {Item} from 'semantic-ui-react';
import Movie from './Movie';

class MovieList extends Component {

  data = {
    movies: [{
      "title": "River Runs Through It, A",
      "year": 1992,
      "imdbRating": 7.3,
      "poster": "http://ia.media-imdb.com/images/M/MV5BMTM2Nzc5MjI4NF5BMl5BanBnXkFtZTYwNzgwMjc5._V1_SX300.jpg",
      "plot": "The story about two sons of a stern minister -- one reserved, one rebellious -- growing up in rural Montana while devoted to fly fishing.",
      "genres": [
        "Drama"
      ],
      "similar": [
        {
          "title": "Forrest Gump",
          "year": 1994,
          "imdbRating": 8.8,
          "poster": "http://ia.media-imdb.com/images/M/MV5BMTI1Nzk1MzQwMV5BMl5BanBnXkFtZTYwODkxOTA5._V1_SX300.jpg",
          "plot": "Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.",
          "genres": [
            "War",
            "Romance",
            "Drama",
            "Comedy"
          ]
        },
        {
          "title": "Titanic",
          "year": 1997,
          "imdbRating": 7.7,
          "poster": "http://ia.media-imdb.com/images/M/MV5BMjExNzM0NDM0N15BMl5BanBnXkFtZTcwMzkxOTUwNw@@._V1_SX300.jpg",
          "plot": "A seventeen-year-old aristocrat falls in love with a kind, but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
          "genres": [
            "Drama",
            "Romance"
          ]
        },
        {
          "title": "Shawshank Redemption, The",
          "year": 1994,
          "imdbRating": 9.3,
          "poster": "http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg",
          "plot": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          "genres": [
            "Drama",
            "Crime"
          ]
        }
      ]
    }

    ]
  };

  render() {
  if (this.data.loading) return <div>Loading...</div>;
  if (this.data.error) return <div>Error!</div>;
  if (this.data.movies.length === 0) return <div>No movies!</div>;

  return (
    <Item.Group divided>
      {this.data.movies.map(movie => (
        <Movie
          key={movie.movieId}
          title={movie.title}
          poster={movie.poster}
          plot={movie.plot}
          rating={movie.imdbRating}
          genres={movie.genres}
          similar={movie.similar}
          year={movie.year}

        />
      ))}
    </Item.Group>
  );
  }
}

export default MovieList;
