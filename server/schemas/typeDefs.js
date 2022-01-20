const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    getGame(searchInput: String!): [Game]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(_id: ID!, username: String!): User
    saveGame(input: savedGame!): User
    removeGame(gameId: ID!): User
  }

  type User {
    _id: ID
    username: String
    email: String
    gameCount: Int
    savedGames: [Game]
  }

  type Game {
    gameId: String
    title: String
    image: String
    releaseDate: String
    rating: String
  }

  input savedGame {
    gameId: String
    title: String
    image: String
    releaseDate: String
    rating: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
