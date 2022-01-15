import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Row, Col, CardGroup } from 'react-bootstrap';


import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';

import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';

const SavedGames = () => {
  const [removeGame] = useMutation(REMOVE_GAME);
  const { loading, data } = useQuery(GET_ME);

  const userData = data?.me || [];


  // create function that accepts the game's mongo _id value as param and deletes the game from the database
  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeGame({
        variables: { gameId },
      });
      // upon success, remove game's id from localStorage
      removeGameId(gameId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  // https://avatarfiles.alphacoders.com/978/97856.gif
  return (
    <>
      <Jumbotron fluid className='text-light bg-primary'>
        <Container>
          <Row className="align-items-center">
            <Col xs='3' lg="2" >
              <Card.Img style={{ borderRadius: '50%' }} src='https://avatarfiles.alphacoders.com/978/97856.gif' /> 
            </Col>
            <Col>
              <h2>Hello, {userData.username}!</h2>
            </Col>
          </Row>
          <br></br>
          <h3>
            {userData.savedGames.length
              ? `You have ${userData.savedGames.length} Saved ${userData.savedGames.length === 1 ? 'Game' : 'Games'}`
              : 'You have no Saved Games!'}
          </h3>
          <p>Email: {userData.email}</p>      
        </Container>
      </Jumbotron>
      <Container>
        <CardColumns>
          {userData.savedGames.map((game) => {

            return (
              <Card key={game.gameId}>
                {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <p>Release Date: {game.releaseDate}</p>
                  <p>Rating: {game.rating}</p>
                </Card.Body>
                <Card.Footer style={{ textAlign: 'center' }}>
                  <Button
                    className='btn-danger'
                    onClick={() => handleDeleteGame(game.gameId)}>
                    Delete this Game!
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
        
        </CardColumns>
        <h2 style={{ textAlign: 'center' }}>
          {/* {console.log(userData.savedGames)} */}
          {userData.savedGames.length
            ? `Saved Count: ${userData.savedGames.length} ${userData.savedGames.length === 1 ? 'Game' : 'Games'}`
            : 'No Saved Games to Display'}
        </h2>
      </Container>
      <br></br>
      <Card.Footer>
        <CardGroup className="justify-content-between">
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Unique User ID: {userData._id}</p>
        </CardGroup>
      </Card.Footer>
    </>
  );
};

export default SavedGames;
