import React from 'react';

import { StoreProvider } from './utils/GlobalState';

import Router from './pages';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import './App.css';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(
    // {
    //   addTypename: false
    // }
  )
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Router />
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;