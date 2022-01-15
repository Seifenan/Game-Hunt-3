import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGames } from '../utils/API';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';
import Main from '../components/Main';

const Homepage = () => {
  // create state for holding returned google api data
  const [searchedGames, setSearchedGames] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved gameId values
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  const [saveGame] = useMutation(SAVE_GAME);


  // set up useEffect hook to save `savedGameIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  });

  // create method to search for games and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGames(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const items = await response.json();
      

      // console.log(response);


      const gameData = items.results.map((game) => (

        {
        gameId: game.slug,
        title: game.name,
        image: game.background_image || 'https://www.spearsandcorealestate.com/wp-content/themes/spears/images/no-image.png',
        releaseDate: game.released || 'N/A',
        rating: game.rating ? game.rating.toString() : 'N/A',
      }));

      setSearchedGames(gameData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  
  // create function to handle saving a game to our database
  const handleSaveGame = async (gameId) => {
    // find the game in `searchedGames` state by the matching id
    const gameToSave = searchedGames.find((game) => game.gameId === gameId);

    console.log(gameToSave)

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveGame({
        variables: { input: gameToSave },
      });

      // if game successfully saves to user's account, save game id to state
      setSavedGameIds([...savedGameIds, gameToSave.gameId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-primary' style={{ textAlign: 'center' }}>
        <Container>
          <h1>Search for Games!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={10}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a game'
                />
              </Col>
              <Col xs={12} md={2}>
                <Button type='submit' variant='dark' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
      <Container>
        <h4 style={{ textAlign: 'center', paddingBottom: '2%' }}>
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : "Search for a specific game or choose from the developer's top choices!"}
        </h4>
        <CardColumns>
          {searchedGames.map((game) => {
            return (
              <Card key={game.gameId} border='dark'>
                {game.image ? (
                  <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <p className='small'>Release Date: {game.releaseDate}</p>
                  <Card.Text>Rating: {game.rating}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedGameIds?.some((savedGameId) => savedGameId === game.gameId)}
                      className='btn-block'
                      onClick={() => handleSaveGame(game.gameId)}>
                      {savedGameIds?.some((savedGameId) => savedGameId === game.gameId)
                        ? 'This game has been saved!'
                        : 'Add to Saved Games!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      <Main />
      {/* <Main 
      handleSaveGame={handleSaveGame}
      /> */}
    </>
  );
};

export default Homepage;
