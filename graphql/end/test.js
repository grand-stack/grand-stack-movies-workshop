import ApolloClient, { HttpLink } from 'apollo-client-preset';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.example.com',
  }),
});

import gql from 'graphql-tag';

client.query({
  query: gql`
      query hello{
          helloworld
      }
  `,
})
.then(data => console.log(data))
.catch(error => console.error(error));