const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = reuire('./schemas');
const db = require('./config/connection');
const path = reuire('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../clinet/build/index.html'));
  });
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API is running on PORT: ${PORT}`);
  })
})