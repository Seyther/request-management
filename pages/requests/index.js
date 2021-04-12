import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../lib/db';
import GridView from '../../components/ui/grid-view';

const AllRequestPage = props => {
  return (
    <>
      <GridView data={props.data} />
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const client = await connectToDatabase();
  const reqCollections = client.db().collection('requests');
  const requests = await reqCollections.find().toArray();

  client.close();

  return {
    props: {
      data: JSON.parse(JSON.stringify(requests))
    }
  };
}

export default AllRequestPage;

// code for polling to update others
/*const [data, setData] = useState(props.data);
  
  useEffect(() => {
    const dataPollingHandler = setInterval(() => {
      console.log('fetching data...');
      fetch('/api/requests')
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log('before');
          console.log(data);
          console.log('after');
          console.log(result.requests);
          setData(result.requests);
        })
        .catch(err => {
          console.log(err);
        });
    }, 60000);

    return () => {
      console.log('cleaning up..');
      clearInterval(dataPollingHandler);
    };
  }, []);

  return (
    <>
      <GridView data={data} />
    </>
  );*/
