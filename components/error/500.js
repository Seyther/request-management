import Link from 'next/link';
import { Button, Row, Col, Container } from 'react-bootstrap';
import classes from './500.module.css';

const ServerError = () => {
  return (
    <Container className="d-flex flex-column align-items-center">
      <Row className={`font-weight-bold ${classes.OopsSize}`}>Oops!</Row>
      <Row className={`font-weight-bold ${classes.NotFoundSize}`}>
        Well, this is unexpected..
      </Row>
      <Row className="text-center justify-content-center">
        <Col className="col-8">
          <p>
            An error has occurred and we are working on fixing the problem! We
            will be up and running shortly. If you need immediate help, please
            drop an email to contact us.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link href="/">
            <Button variant="primary">Go To HomePage</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ServerError;
