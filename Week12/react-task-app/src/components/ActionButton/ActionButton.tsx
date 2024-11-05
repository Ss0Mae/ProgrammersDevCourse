import React, { FC } from 'react'
import { useState } from 'react'
import DropDownForm from './DropDownForm/DropDownForm'
import {IoIosAdd, IoIosSad} from 'react-icons/io'
import { listButton, taskButton } from './ActionButton.css'
type TActionButtonProps = {
  boardId: string;
  listId: string;
  list?: boolean;
}
const ActionButton: FC<TActionButtonProps> = ({
  boardId,
  listId,
  list
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const buttonText = list ? "새로운 리스트 등록" : "새로운 일 등록";

  return isFormOpen?(
    <DropDownForm
      setIsFormOpen={setIsFormOpen}
      list={list ? true : false}
      boardId={boardId}
      listId = {listId}
    />
  )
    :
    (
      <div
        className={list ? listButton : taskButton}
        onClick = {()=>setIsFormOpen(true)}
      >
        <IoIosAdd />
        <p>{buttonText}</p>
      </div>
    )
}

export default ActionButton
