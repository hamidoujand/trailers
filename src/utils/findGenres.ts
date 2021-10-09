import { tmdb } from "../api/tmdb";
import { Genres } from "../types";

export let findGenres = async (
  genresIds: (number | string)[]
): Promise<string[]> => {
  try {
    let { data } = await tmdb.get<Genres>("/genre/movie/list");
    let genres: string[] = [];
    genresIds.forEach((id) => {
      data.genres.forEach((genre) => {
        if (genre.id === id) {
          genres.push(genre.name);
        }
      });
    });
    return genres;
  } catch (error) {
    throw error;
  }
};
