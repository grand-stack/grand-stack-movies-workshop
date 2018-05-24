// This component is used at the beginning of the exercise as a skeleton example
// We'll replace this component with one that uses GraphQL to fetch movies

import React from "react";
import { Item } from "semantic-ui-react";
import { graphql} from "react-apollo";
import gql from "graphql-tag";
import Movie from "./Movie";
import {Component} from "react";

class MovieList extends Component {

  render() {

    const {data} = this.props;
    if (data.loading) return <div>Loading...</div>;
    if (data.error) {
      console.log(data);
      return <div>Error!</div>;
    }
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
            genres={movie.genres}
            similar={movie.similar}
            year={movie.year}
          />
        ))}
      </Item.Group>
    );

  }


};

const MovieListWithData = graphql(
  gql`
      query MovieListQuery($title: String!){
          movies: moviesByTitle(subString: $title, first:10) {
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
  `

)(MovieList);

export default MovieListWithData;