import React from 'react'
import { FC } from 'react'
import { useTypedSelector } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiPlusCircle } from 'react-icons/fi'
import { useState } from 'react';
type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}


const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { boardArray } = useTypedSelector(state => state.boards);
  return (
    <div>
      <div>
        게시판 :

      </div>
      {boardArray.map((board, index) => (
        <div key = {board.boardId}>
          <div>
            {board.boardName}
            </div>
        </div>
      ))}
      <div>
        {
          isFormOpen ?
            <SideForm setIsFormOpen={setIsFormOpen} />
            :
            <FiPlusCircle onClick={()=>setIsFormOpen(!isFormOpen)}/>
        }
      </div>
         
    </div>
  )
}

export default BoardList
