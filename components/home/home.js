import { useSession } from 'next-auth/client';
import { Container, Jumbotron } from 'react-bootstrap';

const Home = () => {
  const [session, loading] = useSession();

  return (
    <Container className="mt-3">
      <Jumbotron className="d-flex flex-column align-items-center text-center">
        <h1>Welcome to Request Management System</h1>
        {session && <h2>You are logged in as {session.username}</h2>}
      </Jumbotron>
    </Container>
  );
};

export default Home;
