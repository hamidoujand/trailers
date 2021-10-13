import styled from "styled-components";
import { Link } from "react-router-dom";

let StyledLink = styled(Link)`
  &:link,
  &:visited {
    display: inline-block;
    text-decoration: none;
    color: ${(props) => props.theme.colors.text};
    transition: all 0.5s;
  }

  &:hover {
    transform: translateY(-0.4rem);
  }
`;

let StyledMovie = styled.div`
  width: 20rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.dark};
  overflow: hidden;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
let ImageWrapper = styled.div`
  width: 100%;
  height: 25rem;
`;
let Image = styled.img`
  height: 100%;
  width: 100%;
`;
let Details = styled.div`
  padding: 1rem 1.5rem;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
`;
let Title = styled.h3`
  text-align: center;
  font-weight: 300;
  font-size: 1.1rem;
`;
let Votes = styled.h5`
  margin-top: 1rem;
  font-weight: 400;
`;

export default function Movie(props) {
  let { title, poster, vote, id } = props.movie;
  return (
    <div>
      <StyledLink to={`/movies/${id}`}>
        <StyledMovie>
          <ImageWrapper>
            <Image src={poster} alt={title} />
          </ImageWrapper>
          <Details>
            <Title>{title}</Title>
            <Votes>{vote}</Votes>
          </Details>
        </StyledMovie>
      </StyledLink>
    </div>
  );
}
