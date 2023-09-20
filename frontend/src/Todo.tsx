// src/components/Todo.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import './todo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Todo {
    id: number;
    title: string;
  } 


const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


let token = "b1119a643bbe9f0ce81c0a4c505089d8ee537319301dd1d3c02d30160f5896d0beb323d475ae76e3f434d8912a8d0996874a644b183eeaa59d2725bed17b21c5bbc9ba666d193292411d6b15b5bbd96f686e46a1d4340dfcb30fcb0e121485e1e130bc452e0e2e8ea572a1757fb769327326021ae76ab1751fe55e2edc0464a2"

const fetchTodos = () => {
    axios.get('http://localhost:1337/api/todos', {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    })
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = () => {
    axios
      .post('http://localhost:1337/api/todos', 
      {
        data: {
          Title: newTodo,
        }
      },
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        },
      })
      .then((response) => {
        fetchTodos();
        setNewTodo('');
        setErrorMsg('')
      })
      .catch((error) => {   
       setErrorMsg(error && error?.response.data.error.message)
      });
  };

  const handleDeleteTodo = (id: number) => {
    axios
      .delete(`http://localhost:1337/api/todos/${id}`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      .then(() => {
        fetchTodos(); 
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div>
      <h1 className='fnt-fmly'>Hello. Todos are here!</h1>
     <div className='alignment-add'>
      <input
        type="text"
        placeholder="Type your to-do here.."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      </div>
      <p style={{color:'red'}}>{errorMsg}</p>
      <ul>
        {todos.map((todo: any) => (
          <li className='mb' key={todo.id}>{todo.attributes.Title}
           <FontAwesomeIcon
            className='todo-list'
              icon={faTrash}
              onClick={() => handleDeleteTodo(todo.id)}/>
          </li>    
       
        ))}
      </ul>
    </div>
  );
};

export default Todo;
