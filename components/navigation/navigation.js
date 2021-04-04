import Link from 'next/link';
import classes from './navigation.module.css';

const Navigation = () => {
  return (
    <nav className={classes.Navigation}>
      <logo className={classes.Logo}>
        <Link href="/">Request Management System</Link>
      </logo>
      <ul className={classes.NavList}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/requests">View Requests</Link>
        </li>
        <li>
          <Link href="/requests/new">Submit Request</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
