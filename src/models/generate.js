import { times } from "rambdax";
import {
  movieNames,
  movieGenre,
  moviePoster,
  movieDescription,
  reviewBodies
} from "./randomData";

const flatMap = (fn, arr) => arr.map(fn).reduce((a, b) => a.concat(b), []);

const fuzzCount = count => {
  // makes the number randomly a little larger or smaller for fake data to seem more realistic
  const maxFuzz = 4;
  const fuzz = Math.round((Math.random() - 0.5) * maxFuzz * 2);
  return count + fuzz;
};

const makeMovie = (db, i) => {
  return db.collections.get("movies").prepareCreate(movie => {
    movie.title = movieNames[i % movieNames.length] + " " + (i + 1) || movie.id;
    movie.genre = movieGenre[i % movieGenre.length];
    movie.posterImage = moviePoster[i % moviePoster.length];
    movie.description = movieDescription;
    movie.releaseDateAt = new Date().getTime();
  });
};

const makeReview = (db, movie, i) => {
  return db.collections.get("reviews").prepareCreate(review => {
    review.body =
      reviewBodies[i % reviewBodies.length] || `review#${review.id}`;
    review.movie.set(movie);
  });
};

const makeReviews = (db, movie, count) =>
  times(i => makeReview(db, movie, i), count);

const generate = async (db, movieCount, reviewsPerPost) => {
  await db.action(() => db.unsafeResetDatabase());
  const movies = times(i => makeMovie(db, i), movieCount);

  const reviews = flatMap(
    movie => makeReviews(db, movie, fuzzCount(reviewsPerPost)),
    movies
  );

  const allRecords = [...movies, ...reviews];
  await db.batch(...allRecords);
  return allRecords.length;
};

export async function generateRecords(database) {
  return generate(database, 100, 10);
}
