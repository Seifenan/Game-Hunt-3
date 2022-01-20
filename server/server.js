require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startServer()

// const cleanTypeName = new ApolloLink((operation, forward) => {
//   if (operation.variables) {
//     const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
//     operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
//   }
//   return forward(operation).map((data) => {
//     return data;
//   });
// });

// const httpLinkWithErrorHandling = ApolloLink.from([
//   cleanTypeName,
//   retry,
//   error,
//   http,
// ]);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
