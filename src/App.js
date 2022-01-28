import './App.css';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import {useState, useEffect} from 'react';


function App() {

  const baseURL = "http://localhost:3001/api"

  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [materials, setMaterials] = useState([]);

  const [show, setShow] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setIsEditForm(false);
    setId('');
    setName('');
    setPrice('');
  };
  
  useEffect(() => {
    fetch(baseURL + "/material")
      .then((res) => res.json())
      .then((response) => setMaterials(response));
  });
  
  
  function handleSaveMaterials() {
    

    if(isEditForm) {
      console.log("edit");  

      fetch(baseURL + `/material/${id}`, {
        method: 'PUT',
        body: JSON.stringify({name, price}),
        headers: {
          'Content-Type': 'application/json'
        } 
      });

      setTimeout(() => {
        fetch(baseURL + "/material")
          .then((res) => res.json())
          .then((response) => setMaterials(response));
      }, 100);     
    }

    else {
      console.log("add");

      fetch(baseURL + "/material", {
        method: 'POST',
        body: JSON.stringify({name, price}),
        headers: {
          'Content-Type': 'application/json'
        } 
      });

      setTimeout(() => {
        fetch(baseURL + "/material")
          .then((res) => res.json())
          .then((response) => setMaterials(response));
      }, 100); 
    }

    handleClose();
  }

  function handleEditProduct(item) {
    setName(item.name);
    setPrice(item.price);
    setId(item.id);
    setIsEditForm(true);
    handleShow();
  }

  function handleDeleteProduct() {
    console.log("delete");

    fetch(baseURL + `/material/${id}`, {
      method: 'DELETE'
    });

    setTimeout(() => {
      fetch(baseURL + "/material")
        .then((res) => res.json())
        .then((response) => setMaterials(response));
    }, 100);

    handleClose();
  }

  function sumOfMaterials(){
    let sum = 0;
    materials.forEach((item) => sum += Number(item.price))
    return sum.toFixed(2);
  }

  function amountOfMaterials(){
    let sum = 0;
    materials.forEach((item) => sum++)
    return sum;
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
          <tbody>

            
            <tr>
                <td className='PriceColumn'>{sumOfMaterials()}</td>
                <td className='NameColumn'>Кількість матеріалів: {amountOfMaterials()}</td>
                <td className='EditColumn'/>
            </tr>

            {materials.map((item) => 
            <tr key={item.id}>
              <td className='PriceColumn'>{item.price}</td>
              <td className='NameColumn'>{item.name}</td>
              <td className='EditColumn'>
                <Button onClick={() => handleEditProduct(item)} variant="secondary"><Pencil/></Button>
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

          {isEditForm && <Button onClick={() => handleDeleteProduct()} variant="danger" className='DeleteButton'>
            Видалити
          </Button> }
           
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