import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      gameCount
      savedGames {
        gameId
        title
        image
        releaseDate
        rating
      }
    }
  }
`;

export const GET_GAMES = gql`
  query Query($searchInput: String!) {
    getGame(searchInput: $searchInput) {
      gameId
      title
      image
      releaseDate
      rating
    }
  }
`;





