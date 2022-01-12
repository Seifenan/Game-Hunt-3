const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
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
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input savedGame {
    authors: [String]
    description: String
    title: String
    gameId: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
