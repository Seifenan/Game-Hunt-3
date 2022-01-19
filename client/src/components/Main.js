import React from 'react';
import { Jumbotron, Container, Button, Card, CardGroup } from 'react-bootstrap';

import Auth from '../utils/auth';

// import { savedGameIds, handleSaveGame } from '../pages/Homepage';


// const Main = ({ handleSaveGame }) => {
const Main = () => {
  return (

    <Container>
      <Jumbotron fluid="true" className='text-dark'>

        {/* // disabled={savedGameIds?.some((savedGameId) => savedGameId === game.gameId)}
              // onClick={() => handleSaveGame(game.gameId)}>
              // {savedGameIds?.some((savedGameId) => savedGameId === game.gameId)
              //   ? 'This game has been saved!'
              //   : 'Save Game!!'} */}
        <CardGroup>
          <Card style={{ margin: '2%', justifyContent: 'space-between' }}>
            <Card.Img src='https://www.hollywoodreporter.com/wp-content/uploads/2017/11/super-mario-game_copy_-_h_2017.jpg' />
            <Card.Title style={{ textAlign: 'center' }}>Super Mario Bros</Card.Title>
            <Card.Text style={{ padding: '5%' }}>
              Mario must race through the Mushroom Kingdom and save Princess Toadstool (later Princess Peach) from Bowser. Mario jumps, runs, and walks across each level. The worlds are full of enemies and platforms, and open holes.
            </Card.Text>
            <div style={{ paddingLeft: '5%' }}>
              <p>Release Date: 1985-9-13</p>
              <p>Rating: 4.7</p>
            </div>
            {Auth.loggedIn() && (
              <Card.Footer style={{ textAlign: 'center' }}>
                {/* >>>>>>>>>>>>>> Edit button to save game ID to Saved Games!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                {/* <Button onClick={handleSaveGame({})}>Save Game!</Button> */}
                <Button>Save Game!</Button>
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 */}
              </Card.Footer>
            )}
          </Card>
          <Card style={{ margin: '2%', justifyContent: 'space-between' }}>
            <Card.Img src='https://wallpaperaccess.com/full/2800273.jpg' />
            <Card.Title style={{ textAlign: 'center', paddingTop: '20px' }}>Grand Theft Auto V</Card.Title>
            <Card.Text style={{ padding: '5%' }}>
              An action-adventure game played from either a third-person or first-person perspective. Players complete missions—linear scenarios with set objectives—to progress through the story. Outside of the missions, players may freely roam the open world.
            </Card.Text>
            <div style={{ paddingLeft: '5%' }}>
              <p>Release Date: 2013-9-17</p>
              <p>Rating: 4.5</p>
            </div>
            {Auth.loggedIn() && (
              <Card.Footer style={{ textAlign: 'center' }}>
                {/* <Button onClick={handleSaveGame({})}>Save Game!</Button> */}
                <Button>Save Game!</Button>
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 */}
              </Card.Footer>
            )}
          </Card>
          <Card style={{ margin: '2%', justifyContent: 'space-between' }}>
            <Card.Img src='https://lh3.googleusercontent.com/WebglHOYlW-2P7ADP9oUSSrgy12PHyAE6GP_jmJkQOZZ1XH7Pa_7216EK2qS7iJFvncqOaDjg40BrYdzPbB9qNwn' />
            <Card.Title style={{ textAlign: 'center' }}>League of Legends</Card.Title>
            <Card.Text style={{ padding: '5%' }}>
              League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.
            </Card.Text>
            <div style={{ paddingLeft: '5%' }}>
              <p>Release Date: 2009-10-27</p>
              <p>Rating: 3.1</p>
            </div>
            {Auth.loggedIn() && (
              <Card.Footer style={{ textAlign: 'center' }}>
                {/* <Button onClick={handleSaveGame({})}>Save Game!</Button> */}
                <Button>Save Game!</Button>
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 */}
              </Card.Footer>
            )}
          </Card>
        </CardGroup>
      </Jumbotron>
    </Container>

  );
};

export default Main;
