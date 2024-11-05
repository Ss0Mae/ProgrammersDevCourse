import { useState } from 'react'
import { appContainer, buttons,board } from './App.css'
import BoardList from './components/BoardList/BoardList'
import ListsContainer from './components/ListsContainer/ListsContainer'
import { useTypedSelector } from './hooks/redux'


function App() {
  const [activeBoaidId, setActiveBoaidId] = useState('board-0')

  const boards = useTypedSelector(state => state.boards.boardArray);
  const getActiveBoard = boards.filter(board => board.boardId === activeBoaidId)[0];
  const lists = getActiveBoard.lists;
  return (
    
    <div className={appContainer}>
        <BoardList activeBoardId={activeBoaidId}
          setActiveBoardId={setActiveBoaidId}
        />
      <div className={board}>
        <ListsContainer lists = {lists} boardId = {getActiveBoard.boardId}/>
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
