import { connectToDatabase } from '../../lib/db';
import GridView from '../../components/ui/grid-view';

const AllRequestPage = props => {
  return (
    <div>
      <GridView data={props.data} />
    </div>
  );
};

export async function getServerSideProps(context) {
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
