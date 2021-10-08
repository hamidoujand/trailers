import ApiError from "../utils/ApiError";
import { catchAsync } from "../utils/catchAsync";
import { tmdb } from "../api/tmdb";
import { CustomMovie, MovieDBSearch } from "../types";
import { findGenres } from "../utils/findGenres";
import { google } from "googleapis";
import config from "../config";

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
  let moviesPromises: Promise<CustomMovie>[] = data.results.map(
    async ({
      title,
      genre_ids,
      id,
      original_language,
      overview,
      poster_path,
      vote_average,
    }) => {
      return {
        title,
        genres: await findGenres(genre_ids),
        id,
        language: original_language,
        overview,
        poster: poster_path,
        vote: vote_average,
        video: "",
      };
    }
  );
  //all the movies with "genres" all filled in
  let movies = await Promise.all(moviesPromises);

  res.send({
    msg: "hello",
    // response: movies,
    movies,
  });
});

export let googleSearch = catchAsync(async (req, res, next) => {
  let result = await google.youtube("v3").search.list({
    key: config.youtubeApi,
    part: ["snippet"],
    q: "free guy trailer",
  });
  res.send({
    data: result.data,
  });
});
