import './App.css';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { Pencil, Trash } from "react-bootstrap-icons";
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
  const handleClose = () => {
    setShow(false);
    setId('');
    setName('');
    setPrice('');
    setIsEditForm(false);
  };
  const handleShow = () => setShow(true);
  

  useEffect(() => {
    fetch(baseURL + "/get_materials")
      .then((res) => res.json())
      .then((response) => setMaterials(response));
  }, [])
  
  
  function handleSaveMaterials() {

    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);

    if(isEditForm) {
      console.log("edit");

      formData.append("id", id);

      fetch(baseURL + "/save_materials", {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8'
        }, 
      });

      setTimeout(() => {
        fetch(baseURL + "/get_materials")
          .then((res) => res.json())
          .then((response) => setMaterials(response));
      }, 100);

      handleClose();
      setName('');
      setPrice('');
      setId('');
    }

    else {
      console.log("add");

      fetch(baseURL + "/save_materials", {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8'
        }, 
      });

      setTimeout(() => {
        fetch(baseURL + "/get_materials")
          .then((res) => res.json())
          .then((response) => setMaterials(response));
      }, 100);
      
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

  function handleDeleteProduct(item) {
    console.log("delete");

    let formData = new FormData();
    formData.append("id", item.id);

    fetch(baseURL + "/remove_materials", {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }, 
    });

    setTimeout(() => {
      fetch(baseURL + "/get_materials")
        .then((res) => res.json())
        .then((response) => setMaterials(response));
    }, 100);
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
              <th className='DeleteColumnHeader'></th>
            </tr>
          </thead>
          <tbody>{materials.map((item) => <tr key={item.id}>
                <td className='PriceColumn'>{item.price}</td>
                <td className='NameColumn'>{item.name}</td>
                <td className='EditColumn'>
                  <Button onClick={() => handleEditProduct(item)} variant="secondary"><Pencil/></Button>
                </td>   
                <td className='DeleteColumn'>
                  <Button onClick={() => handleDeleteProduct(item)} variant="danger"><Trash/></Button>
                </td>

              </tr>)}
          </tbody>
        </Table>
      </div>

      <Button onClick={handleShow}>Додати</Button>   

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