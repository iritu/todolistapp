import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
 
/*
  FormTodo component : accepts the addTodo() as a parameter.
  Handles the submission of a new item. 
  Submit : add item to array.
*/
function FormTodo({ addTodo }) {
    const [value, setValue] = useState("");
  
    function handleSubmit(e){
      e.preventDefault();   
      if (!value) return;   //if valus is empty 
      addTodo(value);       //call addTodo() function with the current value
      setValue("");         //clear value
    }
  
    return (
     
      <Form onSubmit={handleSubmit}> 
      
      <Form.Group>
        <Form.Label><h4>Add Todo</h4></Form.Label>
        <br/>
        <Form.Control type="text" id="customInput"  
            value={value} 
            onChange={e => setValue(e.target.value)} 
            placeholder="Enter a new item" />
             <Button variant="primary mb-3" type="submit">
              Add Item
            </Button>
      </Form.Group>
    </Form>

   
    );
  }

  export default FormTodo;