import React, { Component } from 'react';
import MovieSearch from './MovieSearch';
import MovieList from './MovieList';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'River Runs Through It'
    }
  }

  setSearchTerm = (title) => {
    this.setState({title});
    console.log("setSearchTerm called");
  };

  render() {
    const {title} = this.state;
    return (
      <div>
        <MovieSearch setSearchTerm={this.setSearchTerm} title={title} />
        <MovieList title={title} />
      </div>
    );
  }
}

export default App;