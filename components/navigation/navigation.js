import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';

import classes from './navigation.module.css';

const Navigation = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const signOutHandler = async () => {
    const signout = await signOut({ redirect: false, callbackUrl: '/' });
    router.push('/');
  };

  return (
    <nav className={classes.Navigation}>
      <div className={classes.Logo}>
        <Link href="/">Request Management System</Link>
      </div>
      <ul className={classes.NavList}>
        <li className={router.pathname === '/' ? classes.ActiveLink : null}>
          <Link href="/">Home</Link>
        </li>
        {session && (
          <li
            className={
              router.pathname === '/requests' ? classes.ActiveLink : null
            }
          >
            <Link href="/requests">View Requests</Link>
          </li>
        )}
        {session && (
          <li
            className={
              router.pathname === '/requests/new' ? classes.ActiveLink : null
            }
          >
            <Link href="/requests/new">Submit Request</Link>
          </li>
        )}
        {!session && (
          <li
            className={router.pathname === '/login' ? classes.ActiveLink : null}
          >
            <Link href="/login">Login</Link>
          </li>
        )}
        {session && (
          <li>
            <div onClick={signOutHandler}>Logout</div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
