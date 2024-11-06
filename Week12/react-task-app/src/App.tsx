import { useState } from 'react'
import { appContainer, buttons,board, deleteBoardButton, loggerButton } from './App.css'
import BoardList from './components/BoardList/BoardList'
import EditModal from './components/EditModal/EditModal'
import ListsContainer from './components/ListsContainer/ListsContainer'
import LoggerModal from './components/LoggerModal/LoggerModal'
import { useTypedSelector } from './hooks/redux'


function App() {
  const [activeBoaidId, setActiveBoaidId] = useState('board-0');
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);

  const modalActive = useTypedSelector(state => state.boards.modalActive);
  const boards = useTypedSelector(state => state.boards.boardArray);
  const getActiveBoard = boards.filter(board => board.boardId === activeBoaidId)[0];
  const lists = getActiveBoard.lists;
  return (
    
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen = {setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}
      
        <BoardList activeBoardId={activeBoaidId}
          setActiveBoardId={setActiveBoaidId}
        />
      <div className={board}>
        <ListsContainer lists = {lists} boardId = {getActiveBoard.boardId}/>
      </div>

      <div className={buttons}>
        <button className = {deleteBoardButton}>
          이 게시판 삭제하기
        </button>
        <button className={loggerButton} onClick={()=>setIsLoggerOpen(!isLoggerOpen) }>
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
      
    
  )
}

export default App
