export interface Movie {
  id: number;
  original_language: string;
  title: string;
  genre_ids: number[];
  overview: string;
  poster_path: null | string;
  vote_average: number;
  release_date: string;
}

export interface CustomMovie {
  id: number;
  language: string;
  title: string;
  genres: (string | number)[];
  overview: string;
  poster: string | null;
  vote: number;
  video: string | null | undefined;
  releaseDate: Date | null;
}

export interface MovieDBSearch {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Genres {
  genres: Genre[];
}
