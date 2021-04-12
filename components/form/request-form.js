import { useRef } from 'react';
import { Form, Button, Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import classes from './request-form.module.css';

const RequestForm = () => {
  const [session, loading] = useSession();
  const requestorInputRef = useRef();
  const titleInputRef = useRef();
  const descInputRef = useRef();
  const priorityInputRef = useRef();
  const router = useRouter();

  const submitFormHandler = event => {
    event.preventDefault();

    const requestor = requestorInputRef.current.value;
    const title = titleInputRef.current.value;
    const desc = descInputRef.current.value;
    const priority = priorityInputRef.current.value;

    fetch('/api/request/new', {
      method: 'POST',
      body: JSON.stringify({
        requestor,
        title,
        desc,
        priority
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        console.log('Success!');
        router.push('/requests');
      })
      .catch(err => {
        console.log('Failed!');
      });
  };

  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center">Please wait...</Row>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
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
              <Form.Group>
                <Form.Label>Priority: </Form.Label>
                <Form.Control as="select" ref={priorityInputRef}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Control>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestForm;
