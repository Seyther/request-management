import { useState, useRef } from 'react';
import { Container, Row, Col, Jumbotron, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

import classes from './auth-form.module.css';
import Router from 'next/dist/next-server/lib/router/router';

const AuthForm = () => {
  const [signUp, setSignUp] = useState(false);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  const authToggleHandler = () => {
    setSignUp(!signUp);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (signUp) {
      console.log('Signing up...');

      fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(result => {
          console.log('Sign up successful!');
        })
        .catch(err => {
          console.log('Sign up failed!');
        });
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        username: username,
        password: password
      });

      if (result.error) {
        alert(result.error);
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className={classes.AuthForm}>
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1>{signUp ? 'Sign Up New Account' : 'Log In'}</h1>
              <Form onSubmit={authSubmitHandler}>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Control ref={usernameInputRef} />
                    </Col>
                  </Form.Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Control type="password" ref={passwordInputRef} />
                    </Col>
                  </Form.Row>
                </Form.Group>
                <Form.Group>
                  <Button type="submit">{signUp ? 'Sign up' : 'Login'}</Button>
                </Form.Group>
              </Form>
              <Button onClick={authToggleHandler}>
                Switch to {signUp ? 'Log In' : 'Sign Up'}
              </Button>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default AuthForm;
