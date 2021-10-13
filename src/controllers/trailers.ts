import ApiError from "../utils/ApiError";
import { catchAsync } from "../utils/catchAsync";
import { tmdb } from "../api/tmdb";
import { CustomMovie, MovieDBSearch } from "../types";
import { findGenres } from "../utils/findGenres";
import { google } from "googleapis";
import config from "../config";
import { redisSet, redisGet } from "../utils/asyncRedis";

export let getTrailer = catchAsync(async (req, res, next) => {
  let movieName = req.query.search;
  if (!movieName) {
    // make the movie name as a required query string
    let err = new ApiError("you need to provide a search param", 400);
    return next(err);
  }
  movieName = movieName.toString().trim().toLowerCase();
  let { data } = await tmdb.get<MovieDBSearch>("/search/movie", {
    params: {
      query: movieName,
    },
  });
  //check to see if there is any movie with provided name

  if (!data.results.length) {
    let err = new ApiError("there is no movie with provided name", 404);
    return next(err);
  }

  //map the results and create a custom movie obj out of them
  let trailers: CustomMovie[] = data.results
    .filter((trailer) => trailer.poster_path && trailer.vote_average)
    .map(
      ({
        title,
        genre_ids,
        id,
        original_language,
        overview,
        poster_path,
        vote_average,
        release_date,
      }) => {
        return {
          title,
          genres: genre_ids,
          id,
          language: original_language,
          overview,
          poster: poster_path
            ? `https://image.tmdb.org/t/p/original${poster_path}`
            : null,
          vote: vote_average,
          video: null,
          releaseDate: release_date,
        };
      }
    );

  // filter out all the movies that are not already in redis
  let newTrailers = await trailers.reduce(
    async (newTrailers, currentTrailer) => {
      let dbTrailer = await redisGet(currentTrailer.id.toString());
      if (!dbTrailer) {
        (await newTrailers).push(currentTrailer);
        return newTrailers;
      } else {
        return newTrailers;
      }
    },
    Promise.resolve(<CustomMovie[]>[])
  );

  //cache the result into redis by  movie id
  let cachePromises = newTrailers.map((trailer) => {
    if (trailer) {
      return redisSet(trailer.id.toString(), JSON.stringify(trailer));
    }
  });
  //wait for all to be saved
  await Promise.all(cachePromises);

  res.send({
    status: "success",
    trailers,
  });
});

export let youtubeSearch = catchAsync(async (req, res, next) => {
  //get the movie id from params
  let movieId = req.params.movieId;
  // search redis for that id
  let movie = await redisGet(movieId); // check for existence of movie
  if (!movie) {
    let err = new ApiError("movie notfound", 404);
    return next(err);
  }
  let year = new Date(movie.releaseDate).getFullYear();
  //request youtube if the movie in redis dose not have a video id
  if (movie.video) {
    //we return that movie
    console.log("from  cache");
    return res.send({
      movie,
    });
  }
  //here we need to search youtube for the trailer
  let result = await google.youtube("v3").search.list({
    key: config.youtubeApi,
    part: ["snippet"],
    q: `${movie.title} ${year} official trailer`,
  });
  let trailers = result.data.items;
  if (!trailers) {
    let err = new ApiError("trailer not found", 404);
    return next(err);
  }

  let youtubeTrailerId = trailers[0].id?.videoId;

  //get all the genres
  let genres = await findGenres(movie.genres);
  //assign genres to movie
  movie.genres = genres;
  movie.video = youtubeTrailerId;
  //here we cache it for next request
  await redisSet(movieId, JSON.stringify(movie));
  console.log("saved into cache");
  res.send({
    movie,
  });
});
