import React from "react";

import { Q } from "@nozbe/watermelondb";
import withObservables from "@nozbe/with-observables";
import { List, ListItem, Body, Text } from "native-base";

const MovieList = ({ movies }) => (
  <List>
    {movies.map(movie => (
      <ListItem key={movie.id}>
        <Body>
          <Text>{movie.title}</Text>
        </Body>
      </ListItem>
    ))}
  </List>
);
const enhance = withObservables(["search"], ({ database, search }) => ({
  movies: database.collections
    .get("movies")
    .query(Q.where("title", Q.like(`%${Q.sanitizeLikeString(search)}%`)))
}));

export default enhance(MovieList);
