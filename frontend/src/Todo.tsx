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


let token = "b1f503c381542928a503962ee351e2d3cddfa4f61a2526b66b8c52d71094c3dd896facace365a01c48809d0b7a6b8c1fa900a81e048b3e562e2bd9e1fe0f9717da36a21b43b08ccdb9fd5cc55cbed6007386d5f7845f228d19d4cc7cf5a32fe31e8536f9401718f9d72ac4bac2835661da133b3d19073968bc90d01ccc512203"
const apiUrl = 'http://localhost:1337/api/todos';
const fetchTodos = () => {
    axios.get(apiUrl, {
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
      .delete(`${apiUrl}/${id}`,{
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
