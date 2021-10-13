import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { moviesContext } from "../context/moviesContext";
import Loader from "../components/Loader";

let StyledHome = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
let SearchBar = styled.input`
  display: inline-block;
  min-width: 30rem;
  padding: 0.9rem 1rem;
  border: none;
  background: none;
  background-color: ${(props) => props.theme.colors.dark};
  border-radius: 0.4rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text};
  ::placeholder {
    color: ${(props) => props.theme.colors.text};
  }
  font-family: inherit;
  &:focus {
    outline: none;
  }
`;
let Form = styled.form``;

export let ErrorMessage = styled.h5`
  color: tomato;
  font-weight: 400;
  font-size: 0.8rem;
  text-align: center;
  margin-top: 1rem;
`;
let LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Home() {
  let [search, setSearch] = useState("");
  let [err, setError] = useState("");
  let { addMovies } = useContext(moviesContext);
  let [loading, toggleLoading] = useState(false);
  let history = useHistory();
  let handleSubmit = async (e) => {
    e.preventDefault();
    toggleLoading(true);
    try {
      setError("");
      let res = await axios.get("/api/v1/trailers", {
        params: { search },
      });
      addMovies(res.data.trailers);
      toggleLoading(false);
      history.push("/movies");
    } catch (error) {
      toggleLoading(false);
      setError(error.response.data.message);
    }
  };
  let renderError = () => {
    if (err) {
      return <ErrorMessage>{err}</ErrorMessage>;
    }
  };
  return (
    <div>
      <StyledHome>
        <Form onSubmit={handleSubmit}>
          <SearchBar
            type="text"
            placeholder="Movie name ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {renderError()}
          {loading && (
            <LoadingWrapper>
              <Loader />
            </LoadingWrapper>
          )}
        </Form>
      </StyledHome>
    </div>
  );
}
