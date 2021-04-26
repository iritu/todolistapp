import './App.css';

import React from "react";
import { useState } from 'react';
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  //Set state: 
  //Set the array of todos[] which is going to hold the items and their status
  const [todos, setTodos] = useState([
    {
      text: "Sample item...",
      isDone: false
    }
  ]);


  //Define short functions to : add, mark, delete items from the todos[] array  

  //1. Add the new todo[] text to the array using spread operator.
  function addTodo(text){
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

  /***Mark item as done - ***
  2. Copy all the todos using the spread operator to new array:  newTodos. 
     Mark the item as done by using the index parameter. 
     Set the newTodos as todos[] using setTodos (useState function).
  */
  function  markTodo (index) {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  }
  

  /***Delete item ****
  3. Get the index of the item . 
     Define new array using the spread operator.
     Splice the array and remove the item  whose index matches the index parameter
     Set the newTodos as todos[] using setTodos (useState function).
  */
  function  removeTodo (index){
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  } 


  
  /*
   Todo component. It accepts the four parameters as props(called from main App)
   Show buttons for marking items as Done and for removing an item.
  */
  function Todo({ todo, index, markTodo, removeTodo }) {
    return (
      <div className="todo">
          <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
          <div>
              <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
              <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
        </div>
      </div>
    );
  }



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
        <Form.Label><b>Add Todo</b></Form.Label>
        <Form.Control type="text" className="input" 
            value={value} 
            onChange={e => setValue(e.target.value)} 
            placeholder="Whats Next?" />
      </Form.Group>
      
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
    );
  }


/*
  For each todo in the todos.map, pass the Todo component. 
  Pass it the  index, todo(), markTodo() and removeTodo() functions.
*/  
  return (
    <div className="app">
    <div className="container">
      <h1 className="text-center mb-4">Todo List</h1>
      
      <FormTodo addTodo={addTodo} />
      
      <div>
        {todos.map((todo, index) => (
          <Card>
            <Card.Body>
              <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  </div>
  );
}

export default App;
