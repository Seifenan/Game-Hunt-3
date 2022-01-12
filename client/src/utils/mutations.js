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

export const SAVE_BOOK = gql`
  mutation saveGame($input: savedGame!) {
    saveGame(input: $input) {
      _id
      username
      email
      gameCount
      savedGames {
        # _id
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

export const REMOVE_BOOK = gql`
  mutation removeGame($gameId: ID!) {
    removeGame(gameId: $gameId) {
      _id
      username
      email
      gameCount
      savedGames {
        # _id
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
