import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);
