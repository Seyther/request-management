import { useSession } from 'next-auth/client';
import classes from './home.module.css';

const Home = () => {
  const [session, loading] = useSession();

  return (
    <div className={classes.Home}>
      <h1>Welcome to Request Management System</h1>
      {session && <h2>You are logged in as {session.username}</h2>}
    </div>
  );
};

export default Home;
