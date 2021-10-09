import "./App.css";
import { Switch, Route } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/movie" render={() => <h1>Movie</h1>} />
      </Switch>
    </div>
  );
}
