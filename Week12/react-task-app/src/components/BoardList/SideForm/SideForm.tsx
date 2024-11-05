import React, { ChangeEvent, FC, useRef } from 'react'
import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
type TSideFormProps = {
  inputRef:React.RefObject<HTMLInputElement>,
  setIsFormOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const SideForm :FC<TSideFormProps>= ({
  setIsFormOpen,
  inputRef
}) => {
  const [inputText, setInputText] = useState('')
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }
  const handleOnBlur = () => {
    setIsFormOpen(false);
  }
  return (
    <div>
      <input
        //ref = {inputRef}
        autoFocus
        type='text'
        placeholder='새로운 게시판 등록하기'
        value={inputText}
        onChange={handleChange}
        onBlur = {handleOnBlur}
      />
      <FiCheck/>
    </div>
  )
}

export default SideForm
