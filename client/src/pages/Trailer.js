import { Link, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorMessage } from "./Home";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

let Wrapper = styled.div`
  display: flex;
  padding: 8rem 10rem;
`;
let Left = styled.div``;
let Right = styled.div`
  padding-left: 4rem;
`;
let ImageWrapper = styled.div`
  width: 20rem;
  height: 30rem;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.5);
`;
let Image = styled.img`
  width: 100%;
  height: 100%;
  display: inline-block;
`;
let Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 200;
  color: ${(props) => props.theme.colors.main};
`;
let DetailWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 2rem 0;
  padding-right: 4rem;
`;
let Rating = styled.h4`
  color: ${(props) => props.theme.colors.light};
  font-size: 1rem;
  font-weight: 400;
  margin-right: auto;
`;

let Language = styled.h4`
  color: ${(props) => props.theme.colors.lighter};
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
`;
let Header = styled.h4`
  color: ${(props) => props.theme.colors.dark};
  font-weight: 700;
  text-transform: uppercase;
  margin: 1rem 0;
`;
let Overview = styled.p`
  color: ${(props) => props.theme.colors.light};
  font-weight: 400;
`;
let ActionSection = styled.div`
  margin-top: 4rem;
`;
let TrailerBtn = styled.button`
  background: none;
  border: none;
  background-color: white;
  color: ${(props) => props.theme.colors.dark};
  display: inline-block;
  text-transform: uppercase;
  padding: 0.9rem 1.2rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  transition: all 0.4s;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.dark};
  &:hover {
    transform: translateY(-0.5rem);
    background-color: ${(props) => props.theme.colors.dark};
    color: ${(props) => props.theme.colors.text};
  }
`;

export let BackButton = styled(Link)`
  &:link,
  &:visited {
    text-decoration: none;

    background-color: ${(props) => props.theme.colors.dark};
    color: ${(props) => props.theme.colors.text};
    display: inline-block;
    text-transform: uppercase;
    padding: 0.7rem 1.4rem;
    margin-left: 0.7rem;
    font-family: inherit;
    font-weight: 500;
    transition: all 0.4s;
    border-radius: 0.5rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.dark};
    display: inline-block;
  }
  &:hover {
  }
`;

let GenreItem = styled.li`
  display: inline-block;
  text-transform: uppercase;
  font-weight: 700;
  background-color: tomato;
  margin: 0 0.6rem;
  padding: 0.4rem;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.colors.dark};
  color: ${(props) => props.theme.colors.text};
  border-radius: 0.5rem;
`;
let GenresList = styled.ul`
  list-style: none;
  padding: 0.8rem 0;
`;

let VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
let Player = styled.iframe`
  width: 60rem;
  height: 30rem;
  border: none;
`;

let LoadingWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Trailer() {
  let { movieId } = useParams();
  let [err, setError] = useState("");
  let [movie, setMovie] = useState(null);
  let [isOpen, setOpen] = useState(false);

  let renderGenres = (genres) =>
    genres.map((genre) => <GenreItem key={genre}>{genre}</GenreItem>);
  useEffect(() => {
    (async function () {
      try {
        //TODO change the url
        let res = await axios.get(`/api/v1/trailers/${movieId}`);
        setMovie(res.data.movie);
      } catch (error) {
        setError(error.response.data.message);
      }
    })();
  }, [movieId]);
  let renderMovie = () => {
    if (movie) {
      let {
        title,
        poster,
        genres,
        vote,
        overview,
        language,
        releaseDate,
        video,
      } = movie;
      return (
        <div>
          <Wrapper>
            <Left>
              <ImageWrapper>
                <Image src={poster} alt={title} />
              </ImageWrapper>
            </Left>
            <Right>
              <Title>{title}</Title>
              <DetailWrapper>
                <Rating>RATING {vote}</Rating>
                <Language>
                  {language}/{new Date(releaseDate).getFullYear()}
                </Language>
              </DetailWrapper>
              <Header>The Genres</Header>
              <GenresList>{renderGenres(genres)}</GenresList>
              <Header>The Synopsis</Header>
              <Overview>{overview}</Overview>
              <ActionSection>
                <TrailerBtn onClick={() => setOpen(true)}>Trailer</TrailerBtn>
                <BackButton to="/movies">Back</BackButton>
              </ActionSection>
            </Right>
          </Wrapper>
          {isOpen && (
            <Modal onClose={() => setOpen(false)}>
              <VideoWrapper>
                <Player src={`https://youtube.com/embed/${video}`} />
              </VideoWrapper>
            </Modal>
          )}
        </div>
      );
    } else if (err) {
      return <ErrorMessage>{err}</ErrorMessage>;
    } else {
      return (
        <LoadingWrapper>
          <Loader />
        </LoadingWrapper>
      );
    }
  };
  return renderMovie();
}
