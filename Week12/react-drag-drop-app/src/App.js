import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
const finalSpaceCharacters = [
  {
    id: 'gary',
    name : 'Gary Goodspeed'
  },
  {
    id: 'cato',
    name : 'Little Cato'
  },
  {
    id: 'kvn',
    name : 'KVN'
  },
]
function App() {

  const [characters, setCharacters] = useState(finalSpaceCharacters)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <ul className = 'characters'>
          {
            characters.map(({ id, name }, index) => {
              return (
                <li>
                  <p>
                    {name}
                  </p>
                </li>
              )
            })
          
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
