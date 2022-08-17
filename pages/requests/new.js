import { getSession } from 'next-auth/react';
import RequestForm from '../../components/form/request-form';

const NewRequestPage = props => {
  return (
    <>
      <RequestForm />
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

  return {
    props: {}
  };
}

export default NewRequestPage;
