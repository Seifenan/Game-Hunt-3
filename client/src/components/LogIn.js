// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import { UPDATE_USER } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';

import Auth from '../utils/auth';

const LoginForm = ({ onSubmit }) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);
  const [dispatch] = useStoreContext();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const { data } = login({
      variables: { ...userFormData },
    }).then(({ data }) => {
      Auth.login(data.login.token);
      dispatch({ type: UPDATE_USER, user: data.login.user });
      // dispatch user data to global state
    }).catch((err) => {
      console.error(err);
      setShowAlert(true);
    });

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });

    onSubmit();
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={e => {
        e.preventDefault();
      }
      }>
        <Row className="align-items-center">
          <Col sm={12}>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Something went wrong with your login credentials!
            </Alert>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your email'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
              />
              <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Your password'
                name='password'
                onChange={handleInputChange}
                value={userFormData.password}
                required
              />
              <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col sm={6}>
            <Button
              onClick={handleFormSubmit}
              disabled={!(userFormData.email && userFormData.password)}
              type='submit'
              variant='success'>
              Submit
            </Button>
            {error && <div>Login failed</div>}
          </Col>
          <Col sm={6}>
            <Form.Check type="checkbox" id="autoSizingCheck2" label="Remember me" />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default LoginForm;
