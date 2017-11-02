import React from "react";


import App from "./components/App";

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://3wzp7qnjv.lp.gql.zone/graphql' }),
  cache: new InMemoryCache(),
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  html: {
    margin: "8px",
    maxWidth: "600px"
  },
  body: {
    margin: "8px",
    maxWidth: "600px"
  }
};


render(<Root />, document.getElementById("root"));
