// GRAND Stack workshop - begin state

// The goal of this section of the workshop is to complete our GraphQL server
// We start with a 
// We need to query our Neo4j Database to ensure that we're

// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.

// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from 'graphql-tools';
import {v1 as neo4j} from 'neo4j-driver';

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Movie {
  movieId: ID!
  title: String
  year: Int
  plot: String
  poster: String
  imdbRating: Float
  genres: [String]
  similar(first: Int=3, offset:Int=0): [Movie]
}

type Query {
  moviesByTitle(subString: String!, first: Int=3, offset: Int=0): [Movie]
}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    moviesByTitle: (root, args, context) => {
      let session = context.driver.session();
      let query = "MATCH (movie:Movie) WHERE movie.title CONTAINS $subString RETURN movie LIMIT $first;"
      return session.run(query, args)
        .then( result => { return result.records.map(record => { return record.get("movie").properties })})
    },
  },
  Movie: {
    genres: (movie, _, context) => {
      let session = context.driver.session();
      let params = {movieId: movie.movieId};
      let query = `
				MATCH(m:Movie)-[:IN_GENRE]->(g:Genre)
				WHERE m.movieId = $movieId
 				RETURN g.name AS genre
			`;
      
      return session.run(query, params)
      	.then( result => { return result.records.map(record => {return record.get("genre")})})
  
    },
    similar: (movie, _, context) => {
      let session = context.driver.session();
      let params = {movieId: movie.movieId};
      let query = `
				MATCH (m:Movie) WHERE m.movieId = $movieId
        MATCH (m)-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(movie:Movie)
        WITH m, movie, COUNT(*) AS genreOverlap
        MATCH (m)<-[:RATED]-(:User)-[:RATED]->(movie:Movie)
        WITH movie,genreOverlap, COUNT(*) AS userRatedScore
        RETURN movie ORDER BY (0.9 * genreOverlap) + (0.1 * userRatedScore)  DESC LIMIT 3
			`;
      
      return session.run(query, params)
      	.then( result => {return result.records.map(record => {return record.get("movie").properties})})
    }
  }
  
};

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
let driver;

export function context(headers, secrets) {
  if (!driver) {
    driver = neo4j.driver(secrets.NEO4J_URI || "bolt://localhost:7687", neo4j.auth.basic(secrets.NEO4J_USER || "neo4j", secrets.NEO4J_PASSWORD || "letmein"))
  }
  return {
    driver
  }
};

// Optional: Export a root value to be passed during execution
// export const rootValue = {};

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
