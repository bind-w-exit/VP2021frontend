import './App.css';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { Pencil } from "react-bootstrap-icons";
import {useState, useEffect} from 'react';

function App() {

  const baseURL = "https://api.phpist.com.ua/api"

  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [materials, setMaterials] = useState([]);

  /*  Modal */
  const [show, setShow] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);
  

  useEffect(() => {
    fetch(baseURL + "/get_materials")
      .then((res) => res.json())
      .then((materials) => setMaterials(materials));
  }, [])
  
  
  function handleSaveMaterials() {

    let material = { id, name, price }

    if(isEditForm) {
      console.log("edit");
      //TODO
      handleClose();
      setName('');
      setPrice('');
      setId('');
    }
    else {
      console.log("add");

      //FIXME
      // fetch(baseURL + "/save_materials", {
      //   method: 'POST',
      //   body: JSON.stringify(material),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      // }).then((res) => res.json());

      handleClose();
      setName('');
      setPrice('');
    }

  }

  function handleEditProduct(item) {
    setName(item.name);
    setPrice(item.price);
    setId(item.id);
    setIsEditForm(true);
    handleShow();
  }

  return (
    <div className="App">

      <div className='Content'>
        <Table striped bordered hover className='MainTable'>
          <thead>
            <tr>
              <th className='PriceColumnHeader'>Ціна</th>
              <th className='NameColumnHeader'>Назва</th>
              <th className='EditColumnHeader'></th>
            </tr>
          </thead>
          <tbody>{materials.map((item) => <tr key={item.id}>
                <td className='PriceColumn'>{item.price}</td>
                <td className='NameColumn'>{item.name}</td>
                <td className='EditColumn'><Button onClick={() => handleEditProduct(item)}><Pencil/></Button></td>   
              </tr>)}
          </tbody>
        </Table>
      </div>


      <div>
        <Button onClick={handleShow}>Додати</Button>   
      </div>
      

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Матеріал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={(event) => {event.preventDefault(); handleSaveMaterials(price, name)}}>
          <Form.Group className='FormPadding'>
                <Form.Control
                    type="text"
                    placeholder="Назва *"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    />        
            </Form.Group>
            <Form.Group className='FormPadding'>
                <Form.Control
                    type="text"
                    placeholder="Ціна *"
                    required
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    />        
            </Form.Group> 
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрити
            </Button>
            <Button variant="primary" onClick={handleSaveMaterials}>
              Зберегти
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default App;