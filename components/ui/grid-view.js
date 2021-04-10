import { useRouter } from 'next/router';
import { Table, Button, Container } from 'react-bootstrap';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import classes from './grid-view.module.css';

const GridView = props => {
  const router = useRouter();

  const editRequestHandler = id => {
    console.log('TO-DO: Editing..');
  };

  const deleteRequestHandler = id => {
    fetch('/api/request/delete', {
      method: 'POST',
      body: JSON.stringify({
        _id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        console.log('Request deleted!');
        router.push(router.pathname);
      })
      .catch(err => {
        console.log('Error occured while deleting request');
      });
  };

  return (
    <Container className="mt-3">
      <h1>All Requests</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Requestor</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((req, index) => {
            let cssClass = classes.lowPriority;
            switch (req.priority) {
              case 'High':
                cssClass = classes.highPriority;
                break;
              case 'Medium':
                cssClass = classes.mediumPriority;
                break;
              case 'Low':
              default:
                cssClass = classes.lowPriority;
                break;
            }

            return (
              <tr key={index} className={cssClass} id={req._id}>
                <td>{index + 1}</td>
                <td>{req.requestor}</td>
                <td>{req.title}</td>
                <td>{req.desc}</td>
                <td>{req.priority}</td>
                <td>
                  <b>Not Started</b>
                </td>
                <td className="d-flex justify-content-around">
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      editRequestHandler(req._id);
                    }}
                  >
                    <PencilSquare />
                  </Button>
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      deleteRequestHandler(req._id);
                    }}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default GridView;
