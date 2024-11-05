import React, { FC } from 'react'
import { IList } from '../../types';
import ActionButton from '../ActionButton/ActionButton';
import List from '../List/List';
import { listsContainer } from './ListsContainer.css';

type TListsContainerProps = {
  boardId: string;
  lists: IList[];
}
const ListsContainer: FC<TListsContainerProps> = ({
  lists,
  boardId
}) => {
  return (
    <div className = {listsContainer}>
      {
        lists.map(list => (
          <List
            key={list.listId}
            list={list}
            boardId = {boardId}
          />
        ))
        
      }
      <ActionButton></ActionButton>
    </div>
  )
}

export default ListsContainer
