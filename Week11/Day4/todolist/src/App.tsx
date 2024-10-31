import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './Todolist';
import Clock from './Timer';
function App() {
  
  return (
      <div className="container"> 
      <TodoList></TodoList>
      <Clock></Clock>
      </div>
    );
}

// 
export default App;
