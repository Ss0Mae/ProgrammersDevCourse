import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

const finalSpaceCharacters = [
  { id: 'gary', name: 'Gary Goodspeed' },
  { id: 'cato', name: 'Little Cato' },
  { id: 'kvn', name: 'KVN' },
  { id: 'ssomae', name: 'ssomae' },
];

function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters);

  // 빈 onDragEnd 함수 추가
  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함.
    
    //목적지가 없으면 이 함수를 종료합니다.
    if (!console.log(result));
    
    // 리액트 불변성을 지켜주기 위해 새로운 Data 생성
    const items = Array.from(characters);

    // 1. 변경시키는 아이템을 배열에서 지워주기
    // 2. return 값으로 지워진 아이템을 잡아준다.
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log(reorderedItem)

    //원하는 자리에 reorderedItem insert
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);

    setCharacters(items);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;