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
