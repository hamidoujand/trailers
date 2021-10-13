import { createContext, useState } from "react";

export let moviesContext = createContext();

export let MoviesProvider = (props) => {
  let [movies, setMovies] = useState([]);
  let addMovies = (movies) => setMovies(movies);
  return (
    <moviesContext.Provider value={{ movies, addMovies }}>
      {props.children}
    </moviesContext.Provider>
  );
};
