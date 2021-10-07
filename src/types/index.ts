export interface Movie {
  id: number;
  original_language: string;
  title: string;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  vote_average: number;
}

export interface CustomMovie {
  id: number;
  language: string;
  title: string;
  genres: string[];
  overview: string;
  poster: string;
  vote: number;
  video: string;
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
