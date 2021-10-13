import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { moviesContext } from "../context/moviesContext";
import Movie from "./Movie";
import { BackButton } from "./Trailer";

let MoviesWrapper = styled.div`
  padding: 2rem 10rem;
`;
let Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 400;

  color: ${(props) => props.theme.colors.light};
`;

let Wrapper = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem;
`;

export default function Movies() {
  let { movies } = useContext(moviesContext);
  let history = useHistory();
  if (!movies.length) history.push("/");
  let renderMovies = () => {
    return movies.map(
      (movie) =>
        movie.poster && movie.vote && <Movie key={movie.id} movie={movie} />
    );
  };
  return (
    <MoviesWrapper>
      <div>
        <Title>Movies</Title>
        <BackButton to="/">Back</BackButton>
      </div>
      <Wrapper>{renderMovies()}</Wrapper>
    </MoviesWrapper>
  );
}
