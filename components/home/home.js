import { useSession } from 'next-auth/react';
import { Container } from 'react-bootstrap';

const Home = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <Container className="mt-3">
      <div className="d-flex flex-column align-items-center text-center">
        <h1>Welcome to Request Management System</h1>
        {session && <h2>You are logged in as {session.username}</h2>}
      </div>
    </Container>
  );
};

export default Home;
