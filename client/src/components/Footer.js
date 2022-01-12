import React from 'react';
import { Jumbotron, Container, Card, CardGroup } from 'react-bootstrap';

// Turn Link to Icons!!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const Footer = () => {
  return (
    <Jumbotron fluid className='text-light bg-dark'>
      <Container style={{ textAlign: 'center'}}>
        <h5>Thank you for Visiting our site!</h5>
        <br></br>
        <p>Developed by</p>
        <CardGroup >
          
          <Card border='dark' fluid className='text-light bg-dark' style={{ alignItems: 'center' }}>
            <Card.Img style={{ width: '10%', borderRadius: '50%' }} src='https://ca.slack-edge.com/T027T98NZ1V-U029A5TB62Y-3fa9af47fb02-512' />
            <Card.Text>Nasir Ahmed</Card.Text>
            {/* Replace all links with Icons!! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <CardGroup>
              <Card.Link className='text-light' target='_blank' href='https://github.com/nasirahmed422'>GitHub</Card.Link>
              <Card.Link className='text-light' target='_blank' href=''>Portfolio</Card.Link>
            </CardGroup>
            {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
          </Card>

          <Card border='dark' fluid className='text-light bg-dark' style={{ alignItems: 'center' }}>
            <Card.Img style={{ width: '10%', borderRadius: '50%' }} src='https://avatars.githubusercontent.com/u/88166254?v=4' />
            <Card.Text>Seif Enan</Card.Text>

            {/* Replace all links with Icons!! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <CardGroup>
              <Card.Link className='text-light' target='_blank' href='https://github.com/Seifenan'>GitHub</Card.Link>
              <Card.Link className='text-light' target='_blank' href='https://github.com/Seifenan'>Portfolio</Card.Link>
            </CardGroup>
            {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
          </Card>

          <Card border='dark' fluid className='text-light bg-dark' style={{ alignItems: 'center' }}>
            <Card.Img style={{ width: '10%', borderRadius: '50%' }} src='https://avatars.githubusercontent.com/u/60494706?v=4' />
            <Card.Text>Amina Kurdi</Card.Text>
            {/* Replace all links with Icons!! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <CardGroup>
              <Card.Link className='text-light' target='_blank' href='https://github.com/Kurdiamina3'>GitHub</Card.Link>
              <Card.Link className='text-light' target='_blank' href=''>Portfolio</Card.Link>
            </CardGroup>
            {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
          </Card>


        </CardGroup>
      </Container>
    </Jumbotron>
  );
};

export default Footer;


// https://avatars.githubusercontent.com/u/60494706?v=4

// https://ca.slack-edge.com/T027T98NZ1V-U029A5TB62Y-3fa9af47fb02-512