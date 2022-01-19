import './App.css';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { Pencil } from "react-bootstrap-icons";
import {useState} from 'react';

function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const [products, setProducts] = useState([]);

  /*  Modal */
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);


  function saveProducts() {

    let product = products.find((item) => item.id === id);
    
    if(product != null) {
      console.log("edit");
      product.price = price;
      product.name = name;
      handleClose();
      setName('');
      setPrice('');
      setId('');
    }

    else {
      console.log("add");
      setProducts([...products, {id: 'id' + (new Date()).getTime(), name, price}]);
      handleClose();
      setName('');
      setPrice('');
    }
  }

  function editProduct(item) {
    setName(item.name);
    setPrice(item.price);
    setId(item.id);
    handleShow();
  }

  return (
    <div className="App">

      <div className='Content'>
        <Table striped bordered hover className='MainTable'>
          <thead>
            <tr>
              <th className='PriceColumnHeader'>Price</th>
              <th className='NameColumnHeader'>Name</th>
              <th className='EditColumnHeader'></th>
            </tr>
          </thead>
          <tbody>{products.map((item) => <tr key={item.id}>
                <td className='PriceColumn'>{item.price}</td>
                <td className='NameColumn'>{item.name}</td>
                <td className='EditColumn'><Button onClick={() => editProduct(item)}><Pencil/></Button></td>   
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
            <Modal.Title>Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={(event) => {event.preventDefault(); saveProducts(price, name)}}>
            <Form.Group className='FormPadding'>
                <Form.Control
                    type="text"
                    placeholder="Price *"
                    required
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    />        
            </Form.Group>
            <Form.Group className='FormPadding'>
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    />        
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveProducts}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default App;
