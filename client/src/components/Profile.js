import React from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';

// import { createUser } from '../utils/API';

import { gql, useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {

  var input;
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  


  

  return (
    <>
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              updateUser({ variables: { text: input.value } });
              input.value = '';
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Update Username</button>
          </form>
        </div>
      
    </>
  );
};




export default Profile;
