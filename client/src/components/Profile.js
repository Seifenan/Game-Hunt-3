import React, {useEffect, useState} from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';

// import { createUser } from '../utils/API';

import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import { UPDATE_USER as UPDATE_USER_TYPE } from '../utils/actions';

import { useStoreContext } from '../utils/GlobalState';

const Profile = ({ handleModalClose }) => {
  const [state, dispatch] = useStoreContext();
  const [userInput, setUserInput] = useState('');
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);

  
  useEffect(() => {
    if (data) {
      console.log(data)
      dispatch({ type: UPDATE_USER_TYPE, user: data.updateUser })
    }
  }, [data]);


  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              updateUser({ variables: { id: state.user._id, username: userInput } });
              handleModalClose();
            }}
          >
            <input
            onChange={(e) => setUserInput(e.target.value)}
              // ref={node => {
              //   input = node;
              // }}
            />
            <button type="submit">Update Username</button>
          </form>
        </div>
      
    </>
  );
};




export default Profile;
