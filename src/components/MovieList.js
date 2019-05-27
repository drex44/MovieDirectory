import React from "react";

import { Q } from "@nozbe/watermelondb";
import withObservables from "@nozbe/with-observables";

import RawMovieItem from "./RawMovieItem";
import { List } from "native-base";

const MovieItem = withObservables(["movie"], ({ movie }) => ({
  movie: movie.observe()
}))(RawMovieItem);

const MovieList = ({ movies, navigation }) => (
  <List>
    {movies.map(movie => (
      <MovieItem
        key={movie.id}
        movie={movie}
        countObservable={movie.reviews.observeCount()}
        onPress={() => navigation.navigate("Movie", { movie })}
      />
    ))}
  </List>
);

const enhance = withObservables(["search"], ({ database, search }) => ({
  movies: database.collections
    .get("movies")
    .query(Q.where("title", Q.like(`%${Q.sanitizeLikeString(search)}%`)))
}));

export default enhance(MovieList);
