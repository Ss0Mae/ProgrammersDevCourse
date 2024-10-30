import React from 'react';
import logo from './logo.svg';
import './App.css';

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
      <h1 className="test">Hello {
        name === 'React' ? (<h1>Yes</h1>) : (<h1>No</h1>)
      }</h1>
      <p>반갑습니다</p>
    </div>
  );
}

// function App() {
//   return React.createElement("div", null, "Hello React",
//     React.createElement("p", null, "반갑습니다"));
//   }
export default App;
