import React , { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
      const[ todo , setTodo ] = useState([
        {
          content: 'Pickup dry cleaning',
          isCompleted: true,
        },
        {
          content: 'Get haircut',
          isCompleted: false,
        },
        {
          content: 'Build a todo app in React',
          isCompleted: false,
        }
      ]);
      function keyDownhandler(e,i) {
           if(e.key === 'Enter'){
              createTodo(e,i);
           }
           if (e.key === 'Backspace' && todo[i].content === '') {
            e.preventDefault();
            return removeTodoAtIndex(i);
          }
      }

      function createTodo(e,i){
        const newTodo = [...todo];
        newTodo.splice(i+1 , 0 , {
          content: '',
          isCompleted : false,
        });
        setTodo(newTodo);
        setTimeout( () => {
          document.forms[0].elements[i+1].focus();
        })

      }

      function updateTodo (e,i){
        const newTodos = [...todo];
        newTodos[i].content  = e.target.value;
        // console.log(e.target.value)
        setTodo(newTodos);
      }

      function removeTodoAtIndex(i){
          if(i === 0 && todo.length === 1){
            return ;
          }
          setTodo(todo => todo.slice(0,i).concat(todo.slice(i+1,todo.length)));
          setTimeout(() => {
            document.forms[0].elements[i - 1].focus();
          }, 0);
      }
      function toggleTodoCompleteAtIndex(index) {
        const temporaryTodos = [...todo];
        temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
        setTodo(temporaryTodos);
      }
  return (
    <div className="App">
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" />
        </div>
        <form className="todo-list">
            <ul>
              {todo.map( (todo , i ) => ( 
                <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
                    <div className="checkbox" onClick={() => toggleTodoCompleteAtIndex(i)}>
                    {todo.isCompleted && (
                        <span>&#x2714;</span>
                    )}
                      </div>
                      <input 
                      type="text" 
                      value={todo.content}
                      onKeyDown = {e => keyDownhandler(e,i)}
                      onChange = {e => updateTodo(e,i)}/>

                </div>
                ) )}
            </ul>
        </form>
      </div>
  );
}

export default App;
