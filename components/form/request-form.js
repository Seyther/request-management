import { useRef } from 'react';
import { Form, Button, Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { useRouter } from 'next/router';

import classes from './request-form.module.css';

const RequestForm = () => {
  const requestorInputRef = useRef();
  const titleInputRef = useRef();
  const descInputRef = useRef();
  const router = useRouter();

  const submitFormHandler = event => {
    event.preventDefault();

    const requestor = requestorInputRef.current.value;
    const title = titleInputRef.current.value;
    const desc = descInputRef.current.value;

    console.log({
      requestor: requestor,
      title: title,
      desc: desc
    });

    fetch('/api/request', {
      method: 'POST',
      body: {
        requestor: requestor,
        title: title,
        desc: desc
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        console.log('success!');
        router.push('/requests');
      })
      .catch(err => {
        console.log('failed!');
      });
  };

  return (
    <div className={classes.RequestForm}>
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Submit New Request</h1>
              <br />
              <Form onSubmit={submitFormHandler}>
                <Form.Group>
                  <Form.Label>Requested By:</Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Control ref={requestorInputRef} />
                    </Col>
                  </Form.Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Title:</Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Control ref={titleInputRef} />
                    </Col>
                  </Form.Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description:</Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Control as="textarea" ref={descInputRef} />
                    </Col>
                  </Form.Row>
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RequestForm;
