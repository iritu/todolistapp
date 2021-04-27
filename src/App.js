import './App.css';

import React from "react";
import { useState } from 'react';
import "./App.css";
import { Button, Card, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//for nice icons, npm install react-icons
//using: https://www.npmjs.com/package/react-icons
import { RiDeleteBinLine } from 'react-icons/ri'; 
import { BsCheckBox } from 'react-icons/bs';


function App() {

  //Set state: 
  //Set the array of todos[] which is going to hold the items and their status
  const [todos, setTodos] = useState([
    {
      text: "Sample item...",
      isDone: false
    }
  ]);

  const [saveOrigArray, setsaveOrigArray] = useState([
    {
      text: "Sample item...",
      isDone: false
    }
  ]);




  //Define short functions to : add, mark, delete items from the todos[] array  

  //1. Add the new todo[] text to the array using spread operator.
  function addTodo(text){
    //the array that is dynmically worked on 
    const newTodos = [...todos, { text }];

    //set a copy of it that will not be changed after filters and
    //is used by "all" button.
    let origArr = [...todos, { text }];

    setTodos(newTodos);

    setsaveOrigArray(origArr);
    //console.log(todos);

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
     Splice the array and remove the item  which index matches the index parameter
     Make an alert in case the item is in status 'false' or empty 
     Set the newTodos as todos[] using setTodos (useState function).
  */
  function  removeTodo (index){
    const newTodos = [...todos];
   
    if (todos[index].isDone === false || todos[index].isDone === '' ){
      alert("This item is not done yet, if you want to delete an item you should mark it as 'Done' before, using the green check mark");
    }
    else{
      newTodos.splice(index, 1);
      setTodos(newTodos);

      setsaveOrigArray(newTodos);
    }
  } 


  
  /*
   Todo component. Displays the list of items. 
   Accepts the four parameters as props(called from main App)
   Show buttons for marking items as Done and for removing an item.
  */
  function Todo({ todo, index, markTodo, removeTodo }) {
    return (
      <div className="todo">
          <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
          <div>
              <Button variant="outline-success" onClick={() => markTodo(index)}><BsCheckBox/></Button>{' '} 
              <Button variant="outline-danger" onClick={() => removeTodo(index)}><RiDeleteBinLine/></Button>
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
        <Form.Label><h4>Add Todo</h4></Form.Label>
        <br/>
        <Form.Control type="text" id="customInput"  
            value={value} 
            onChange={e => setValue(e.target.value)} 
            placeholder="Whats Next?" />
             <Button variant="primary mb-3" type="submit">
              Add Item
            </Button>
      </Form.Group>
    </Form>

   
    );
  }


  function filterArray(e, action){
    
    //it works but it changes the original array so the buttons
    //cannot work one after the other as filter gives back 
    //everytime just part of the array 

    const newFilterTodos = [...todos];
    
    //all
    if (action === 1){
      setTodos(saveOrigArray);
    }

    //active
    if (action === 2){
      setTodos (newFilterTodos.filter(item => item.isDone !== true));
    }

    //completed
    if (action === 3){
      setTodos (newFilterTodos.filter(item => item.isDone === true));
    }
     
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
      
      <div className="itemsList">
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

      <div>
        <button type="button" 
            className="btn btn-outline-secondary footerBtn"
            onClick={e=> filterArray(e, 1)} > All</button>
          
        <button type="button" 
            className="btn btn-outline-secondary footerBtn"
            onClick={e=> filterArray(e, 2)}>Active</button>

        <button type="button" 
            className="btn btn-outline-secondary footerBtn"
            onClick={e=> filterArray(e, 3)} > Completed </button>
         
      </div>
    </div>
  </div>
  );
}

export default App;
