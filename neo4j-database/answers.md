### Movie By Title (substring)

We can use the `CONTAINS` string comparison operator in Cypher to find movies whose title contains a search string. We'll use the `toLower()` function to make our comparison case insensitive.

```
MATCH (movie:Movie) WHERE toLower(movie.title) CONTAINS toLower($subString) RETURN movie LIMIT $limit;
```


### Recommended Movies

For a given movie, what are other movies that someone who likes that movie also likely to enjoy? We use a combination of overlapping genres and actors (similar movie) and a simple collaborative filtering query (users who like this movie also like...).

```
MATCH (m:Movie) WHERE m.movieId = $movieId
MATCH (m)-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(movie:Movie)
WITH m, movie, COUNT(*) AS genreOverlap
MATCH (m)<-[:RATED]-(:User)-[:RATED]->(movie:Movie)
WITH movie,genreOverlap, COUNT(*) AS userRatedScore
RETURN movie ORDER BY (0.9 * genreOverlap) + (0.1 * userRatedScore)  DESC LIMIT 3
```
