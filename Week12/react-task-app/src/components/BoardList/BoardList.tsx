import React from 'react'
import { FC } from 'react'
import { useTypedSelector } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiPlusCircle } from 'react-icons/fi'
import { useState } from 'react';
import { container,title,addSection, addButton, boardItemActive, boardItem } from './BoardList.css';
import clsx from 'clsx';
type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}


const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { boardArray } = useTypedSelector(state => state.boards);
  return (
    <div className={container}>
      <div className={title}>
        게시판 :

      </div>
      {boardArray.map((board, index) => (
        <div key={board.boardId}
          onClick = {()=>setActiveBoardId(boardArray[index].boardId)}
          className={
            clsx(
              {
                [boardItemActive]:
                boardArray.findIndex(b => b.boardId === activeBoardId) === index,
              },
              {
                [boardItem]:
                boardArray.findIndex(b=>b.boardId === activeBoardId) !== index
              }
            )
          }
        >
          <div>
            {board.boardName}
            </div>
        </div>
      ))}
      <div className={addSection}>
        {
          isFormOpen ?
            <SideForm setIsFormOpen={setIsFormOpen} />
            :
            <FiPlusCircle className = {addButton} onClick={()=>setIsFormOpen(!isFormOpen)}/>
        }
      </div>
         
    </div>
  )
}

export default BoardList
