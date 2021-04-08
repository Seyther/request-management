import { useRouter } from 'next/router';
import { Table, Button } from 'react-bootstrap';
import classes from './grid-view.module.css';

const GridView = props => {
  const router = useRouter();

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
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Requestor</th>
          <th>Title</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Delete</th>
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
                <Button
                  variant="light"
                  onClick={() => {
                    deleteRequestHandler(req._id);
                  }}
                >
                  X
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default GridView;
