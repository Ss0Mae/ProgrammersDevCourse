import React, { useRef } from 'react'
import { FC } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiLogIn, FiPlusCircle } from 'react-icons/fi'
import { useState } from 'react';
import { container,title,addSection, addButton, boardItemActive, boardItem } from './BoardList.css';
import clsx from 'clsx';
import { GoSignOut } from 'react-icons/go'
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { app } from '../../firebase';
import { removeUser, setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';
type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}


 const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { boardArray } = useTypedSelector(state => state.boards);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useTypedDispatch();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
   const { isAuth } = useAuth();
   
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(userCredentical=> {
        console.log(userCredentical)
        dispatch(
          setUser({
            email: userCredentical.user.email,
            id : userCredentical.user.uid
          })
        )
      })
      .catch(error => {
      console.log(error);
    })
  }
   
  const handleClick = () => {
    setIsFormOpen(!isFormOpen)
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }
   
   const handleSignOut = () => {
     signOut(auth)
       .then(() => {
         dispatch(
          removeUser()
        )
       })
       .catch((error) => {
         console.log(error);
     })
   }
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
            <SideForm inputRef = {inputRef} setIsFormOpen={setIsFormOpen} />
            :
            <FiPlusCircle className = {addButton} onClick={handleClick}/>
        }
        {
          isAuth
            ?
            <GoSignOut className={addButton} onClick = {handleSignOut} />
            :
            <FiLogIn className={addButton} onClick={handleLogin} />
        }
        
        
      </div>
         
    </div>
  )
}

export default BoardList
