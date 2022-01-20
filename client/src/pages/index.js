import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import Homepage from './Homepage';
import SavedGames from './SavedGames';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_USER } from '../utils/actions';

const Router = () => {
  const { loading, data } = useQuery(GET_ME);
  const [ state, dispatch] = useStoreContext();

  useEffect (() => {
    (async () => {
      console.log('test')
      if (Auth.loggedIn()) {
        dispatch({ type: UPDATE_USER, user: data?.me })
      }
    })();
  }, [data]);

   if (loading) return 'Loading...';

  return (
    <BrowserRouter>
      <>
        <NavBar />
        { !state.user
          ? <Switch>
           <Route exact path='/' component={Homepage} />
           <Redirect from="*" to="/" />
        </Switch>
        : <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/saved' component={SavedGames} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
        }
        <Footer />
      </>
    </BrowserRouter >
  )
};

export default Router;