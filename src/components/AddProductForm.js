import './AddProductForm.css';
import { Form } from "react-bootstrap"

function AddProductForm() {
    return (
        <Form>
            <Form.Group className='FormPadding'>
                <Form.Control
                    type="text"
                    placeholder="Price *"
                    required
                    />        
            </Form.Group>
            <Form.Group className='FormPadding'>
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    required
                    />        
            </Form.Group>
        </Form>
    )
}

export default AddProductForm;