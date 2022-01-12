import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, CardGroup } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGames } from '../utils/API';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';

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

      const { items } = await response.json();

      const gameData = items.map((game) => ({
        gameId: game.id,
        authors: game.volumeInfo.authors || ['No author to display'],
        title: game.volumeInfo.title,
        description: game.volumeInfo.description,
        image: game.volumeInfo.imageLinks?.thumbnail || '',
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
            : "Search for a specific game or choose from today's most popular or from Developer's choice!"}
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
                  <p className='small'>Authors: {game.authors}</p>
                  <Card.Text>{game.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedGameIds?.some((savedGameId) => savedGameId === game.gameId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveGame(game.gameId)}>
                      {savedGameIds?.some((savedGameId) => savedGameId === game.gameId)
                        ? 'This game has already been saved!'
                        : 'Save this Game!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>

      <Container>
        <Jumbotron fluid className='text-dark'>
          <CardGroup>
            <Card style={{ margin: '2%', justifyContent: 'space-between' }}>
              <Card.Img src='https://www.hollywoodreporter.com/wp-content/uploads/2017/11/super-mario-game_copy_-_h_2017.jpg' />
              <Card.Title style={{ textAlign: 'center' }}>Super Mario Bros</Card.Title>
              <Card.Text style={{ padding: '5%' }}>Mario must race through the Mushroom Kingdom and save Princess Toadstool (later Princess Peach) from Bowser. Mario jumps, runs, and walks across each level. The worlds are full of enemies and platforms, and open holes.</Card.Text>
              <Card.Footer style={{ textAlign: 'center' }}>
                {/* >>>>>>>>>>>>>> Edit button to save game ID to Saved Games!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <Button>Add to Saved Games</Button>
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 */}
              </Card.Footer>
            </Card>

            <Card style={{ margin: '2%', justifyContent: 'space-between' }}>
              <Card.Img src='http://res.heraldm.com/content/image/2021/07/04/20210704000124_0.jpg' />
              <Card.Title style={{ textAlign: 'center' }}>Minecraft</Card.Title>
              <Card.Text style={{ padding: '5%'}}>Minecraft is a sandbox video game developed by the Swedish video game developer Mojang Studios.</Card.Text>
              <Card.Footer style={{ textAlign: 'center' }}>
                {/* >>>>>>>>>>>>>> Edit button to save game ID to Saved Games!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <Button>Add to Saved Games</Button>
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 */}
              </Card.Footer>
            </Card>

            <Card style={{ margin: '2%', justifyContent: 'space-between' }}>
              <Card.Img src='https://lh3.googleusercontent.com/WebglHOYlW-2P7ADP9oUSSrgy12PHyAE6GP_jmJkQOZZ1XH7Pa_7216EK2qS7iJFvncqOaDjg40BrYdzPbB9qNwn' />
              <Card.Title style={{ textAlign: 'center' }}>League of Legends</Card.Title>
              <Card.Text style={{ padding: '5%' }}>League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.</Card.Text>
              <Card.Footer style={{ textAlign: 'center' }}>
                {/* >>>>>>>>>>>>>> Edit button to save game ID to Saved Games!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <Button>Add to Saved Games</Button>
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 */}
              </Card.Footer>
            </Card>
          </CardGroup>

          <CardGroup>
            <Card style={{ margin: '2%', justifyContent: 'space-between' }}>
              <Card.Img src='https://www.hollywoodreporter.com/wp-content/uploads/2017/11/super-mario-game_copy_-_h_2017.jpg' />
              <Card.Title style={{ textAlign: 'center' }}>Super Mario Bros</Card.Title>
              <Card.Text style={{ padding: '5%' }}>Mario must race through the Mushroom Kingdom and save Princess Toadstool (later Princess Peach) from Bowser. Mario jumps, runs, and walks across each level. The worlds are full of enemies and platforms, and open holes.</Card.Text>
              <Card.Footer style={{ textAlign: 'center' }}>
                {/* >>>>>>>>>>>>>> Edit button to save game ID to Saved Games!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <Button>Add to Saved Games</Button>
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 */}
              </Card.Footer>
            </Card>

            <Card style={{ margin: '2%', justifyContent: 'space-between' }}>
              <Card.Img src='http://res.heraldm.com/content/image/2021/07/04/20210704000124_0.jpg' />
              <Card.Title style={{ textAlign: 'center' }}>Minecraft</Card.Title>
              <Card.Text style={{ padding: '5%' }}>Minecraft is a sandbox video game developed by the Swedish video game developer Mojang Studios.</Card.Text>
              <Card.Footer style={{ textAlign: 'center' }}>
                {/* >>>>>>>>>>>>>> Edit button to save game ID to Saved Games!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <Button>Add to Saved Games</Button>
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 */}
              </Card.Footer>
            </Card>

            <Card style={{ margin: '2%', justifyContent: 'space-between' }}>
              <Card.Img src='https://lh3.googleusercontent.com/WebglHOYlW-2P7ADP9oUSSrgy12PHyAE6GP_jmJkQOZZ1XH7Pa_7216EK2qS7iJFvncqOaDjg40BrYdzPbB9qNwn' />
              <Card.Title style={{ textAlign: 'center' }}>League of Legends</Card.Title>
              <Card.Text style={{ padding: '5%' }}>League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.</Card.Text>
              <Card.Footer style={{ textAlign: 'center' }}>
                {/* >>>>>>>>>>>>>> Edit button to save game ID to Saved Games!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <Button>Add to Saved Games</Button>
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 */}
              </Card.Footer>
            </Card>
        

            <Card style={{ margin: '2%', justifyContent: 'space-between' }}>
              <Card.Img src='http://res.heraldm.com/content/image/2021/07/04/20210704000124_0.jpg' />
              <Card.Title style={{ textAlign: 'center' }}>Minecraft</Card.Title>
              <Card.Text style={{ padding: '5%' }}>Minecraft is a sandbox video game developed by the Swedish video game developer Mojang Studios.</Card.Text>
              <Card.Footer style={{ textAlign: 'center' }}>
                {/* >>>>>>>>>>>>>> Edit button to save game ID to Saved Games!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <Button>Add to Saved Games</Button>
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 */}
              </Card.Footer>
            </Card>
            
            
          </CardGroup>

        </Jumbotron>
      </Container>

    </>
  );
};

export default Homepage;
