import React, {Component} from 'react';
import { Item,Grid,Label } from 'semantic-ui-react';

class Movie extends Component {
  render() {
    return(
      <Item>
        <Item.Image size="small" src={this.props.poster} bordered />
        <Item.Content verticalAlign="middle">
          <Item.Header>{this.props.title}</Item.Header>
          <Item.Meta>Year: {this.props.year}</Item.Meta>
          <Item.Meta>Rating: {this.props.rating}</Item.Meta>
          <Item.Description>{this.props.plot}</Item.Description>
          <Item.Extra>
            {this.props.genres.map(genre => (
              <Label key={genre}>{genre}</Label>
            ))}
          </Item.Extra>
          <Item.Extra>You might also like:
            <Grid columns={this.props.similar.length}>
              {this.props.similar.map(movie => (
              <Grid.Column key={movie.movieId}>
                <Item>
                  <Item.Image size="tiny" src={movie.poster} bordered/>
                  <Item.Content>{movie.title}</Item.Content>
                </Item>
              </Grid.Column>
              ))}
          </Grid></Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default Movie;