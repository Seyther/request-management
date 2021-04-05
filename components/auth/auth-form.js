import { useState, useRef } from 'react';
import { Container, Row, Col, Jumbotron, Form, Button } from 'react-bootstrap';
import classes from './auth-form.module.css';

const AuthForm = () => {
  const [signUp, setSignUp] = useState(false);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const authToggleHandler = () => {
    console.log(signUp);
    setSignUp(!signUp);
  };

  const authSubmitHandler = event => {
    event.preventDefault();

    if (signUp) {
      console.log('Signing up...');

      const username = usernameInputRef.current.value;
      const password = passwordInputRef.current.value;

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
          console.log(result);
        })
        .catch(err => {
          console.log('Sign up failed!');
        });
    } else {
      console.log('Authenticating...');
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
