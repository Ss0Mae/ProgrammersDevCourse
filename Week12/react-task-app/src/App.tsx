import { useState } from 'react'
import { appContainer, buttons,board } from './App.css'
import BoardList from './components/BoardList/BoardList'


function App() {
  const [activeBoaidId, setActiveBoaidId] = useState('board-0')
  return (
    
    <div className={appContainer}>
        <BoardList activeBoardId={activeBoaidId}
          setActiveBoardId={setActiveBoaidId}
        />
      <div className={board}>
      </div>

      <div className={buttons}>
        <button>
          이 게시판 삭제하기
        </button>
        <button>

        </button>
      </div>
    </div>
      
    
  )
}

export default App
