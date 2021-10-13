import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Trailer from "./pages/Trailer";
import { MoviesProvider } from "./context/moviesContext";

export default function App() {
  return (
    <div>
      <MoviesProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/movies/:movieId" exact component={Trailer} />
        </Switch>
      </MoviesProvider>
    </div>
  );
}
