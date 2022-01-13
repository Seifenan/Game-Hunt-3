import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      gameCount
      savedGames {
        authors
        description
        title
        gameId
        image
        link
      }
    }
  }
`;




