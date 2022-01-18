import './App.css';
import { Button, Modal, Table } from 'react-bootstrap';
import { Pencil } from "react-bootstrap-icons";
import {useState} from 'react';

function App() {
  
  const date = [
    {
      id: 1,
      price: '3',
      name: 'Apple',
    },
    {
      id: 2,
      price: '10',
      name: 'Orange',
    },
  ];


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className="App">

      <div className='Content'>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>{date.map((item) => <tr>
                <td>{item.id}</td>
                <td>{item.price}</td>
                <td>{item.name}</td>
                <td><Button><Pencil/></Button></td>   
              </tr>)}
          </tbody>
        </Table>
      </div>


      <div className='AddItemButton'>
        <Button onClick={handleShow}>
          Add item
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Woohoo, you're reading this text in a modal!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      
    </div>
  );
}

export default App;
