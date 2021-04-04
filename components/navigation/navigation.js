import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from './navigation.module.css';

const Navigation = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  console.log(router.pathname);

  return (
    <nav className={classes.Navigation}>
      <div className={classes.Logo}>
        <Link href="/">Request Management System</Link>
      </div>
      <ul className={classes.NavList}>
        <li className={router.pathname === '/' ? classes.ActiveLink : null}>
          <Link href="/">Home</Link>
        </li>
        <li
          className={
            router.pathname === '/requests' ? classes.ActiveLink : null
          }
        >
          <Link href="/requests">View Requests</Link>
        </li>
        {loggedIn && (
          <li
            className={
              router.pathname === '/requests/new' ? classes.ActiveLink : null
            }
          >
            <Link href="/requests/new">Submit Request</Link>
          </li>
        )}
        <li
          className={router.pathname === '/login' ? classes.ActiveLink : null}
        >
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
