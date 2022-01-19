import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// >>>> ADD UPDATE USER MUTATION!!!!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const UPDATE_USER = gql`
mutation updateUser($username: String!) {
  updateUser(username: $username) {
    token
    user {
      _id
      username
    }
  }
}
`;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const SAVE_GAME = gql`
  mutation saveGame($input: savedGame!) {
    saveGame(input: $input) {
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

export const REMOVE_GAME = gql`
  mutation removeGame($gameId: ID!) {
    removeGame(gameId: $gameId) {
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
