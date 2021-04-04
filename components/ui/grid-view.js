import { Table } from 'react-bootstrap';

const GridView = props => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Requestor</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((req, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{req.requestor}</td>
              <td>{req.title}</td>
              <td>{req.description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default GridView;
