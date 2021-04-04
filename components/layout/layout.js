import Navigation from '../navigation/navigation';

const Layout = props => {
  return (
    <main>
      <Navigation />
      {props.children}
    </main>
  );
};

export default Layout;
