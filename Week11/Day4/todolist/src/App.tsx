import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClassCom from './ClassCom';
import FuncCom from './FuncCom';
function App() {
  let name = "React";
  const style = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '46px',
    fontWeight: 'bold',
    padding : '20px'
  }
  /**주석은 이렇게 작성합니다 */
return (
    <div style = {style}> 
    <ClassCom></ClassCom>
    <FuncCom></FuncCom>
    </div>
  );
}

// function App() {
//   return React.createElement("div", null, "Hello React",
//     React.createElement("p", null, "반갑습니다"));
//   }
export default App;
