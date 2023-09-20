import React, {lazy} from 'react';
import logo from './logo.svg';
import './App.css';
const TodoComponent = lazy(() => import('./Todo'));


function App() {
  return (
    <div className="App">
      <TodoComponent />
    </div>
  );
}

export default App;
