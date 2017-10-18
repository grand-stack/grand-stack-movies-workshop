import React from 'react';
import {Item} from 'semantic-ui-react';
import {graphql, gql} from 'react-apollo';

import Movie from './Movie';

const MovieList = ({data}) => {

    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>Error!</div>;
    if (data.movies.length === 0) return <div>No movies!</div>;

    return (
      <Item.Group divided>
        {data.movies.map(movie => (
          <Movie
            key={movie.movieId}
            title={movie.title}
            poster={movie.poster}
            plot={movie.plot}
            rating={movie.imdbRating}
            similar={movie.similar}
            year={movie.year}
            genres={movie.genres}
          />
        ))}
      </Item.Group>
    );
};

export default graphql(
  gql`
      query MovieListQuery($title: String!) {
          movies(subString: $title, limit:30) {
              title
              movieId
              imdbRating
              plot
              poster
              year
              genres
              similar {
                  movieId
                  poster
                  title
              }
          }
      }
  `,
  {
    options: props => ({
      variables: {
        title: props.title,
      },
    }),
  },
)(MovieList);