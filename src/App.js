import './App.css';
import { Button, Modal, Table } from 'react-bootstrap';
import { Pencil } from "react-bootstrap-icons";
import {useState} from 'react';
import AddProductForm from './components/AddProductForm'

function App() {
  
  const [products, setProducts] = useState([]); 

  /*  Modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function AddProducts() {
    setProducts(products.concat([
      {
        id: 1,
        price: '3',
        name: 'Tree',
      },
      {
        id: 2,
        price: '10',
        name: 'Iron',
      },
    ]));
    
    handleClose();
 }

  return (
    <div className="App">

      <div className='Content'>
        <Table striped bordered hover className='MainTable'>
          <thead>
            <tr>
              <th width="40%">Price</th>
              <th width="40%">Name</th>
              <th width="20%"></th>
            </tr>
          </thead>
          <tbody>{products.map((item) => <tr>
                <td width="40%">{item.price}</td>
                <td width="40%">{item.name}</td>
                <td width="20%"><Button><Pencil/></Button></td>   
              </tr>)}
          </tbody>
        </Table>
      </div>


      <div>
        <Button onClick={handleShow}>
          Add item
        </Button>   
      </div>
      

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddProductForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={AddProducts}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default App;
