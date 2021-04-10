import Link from 'next/link';
import { Button, Row, Col, Container } from 'react-bootstrap';
import classes from './404.module.css';

const NotFound = () => {
  return (
    <Container className="d-flex flex-column align-items-center">
      <Row className={`font-weight-bold ${classes.OopsSize}`}>Oops!</Row>
      <Row className={`font-weight-bold ${classes.NotFoundSize}`}>
        404 - Page Not Found
      </Row>
      <Row className="text-center justify-content-center">
        <Col className="col-8">
          <p>
            The page you are looking for might have been removed or had its name
            changed or is temporarily unavailable
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

export default NotFound;
