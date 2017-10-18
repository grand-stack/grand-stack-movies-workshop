import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';


// replace the uri here with the GraphQL endpoint for the GraphQL API you created in the previous step
const networkInterface = createNetworkInterface({
  uri: 'https://3wzp7qnjv.lp.gql.zone/graphql',
});

const client = new ApolloClient({
  networkInterface,
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);


ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
