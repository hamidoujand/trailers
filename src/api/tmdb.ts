import axios from "axios";
import config from "../config";
//create an instance of axios pre configured with api key
export let tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: config.movieDBApi,
  },
});
