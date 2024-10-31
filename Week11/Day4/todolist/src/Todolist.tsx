import React, { useState } from "react";

/**React.FC = 리액트 Function Component  
 * 리액트에서는 변수대신 state를 자주 사용한다 => 일반 변수와 달리 동적으로 관리하여
 * 변화에 유연하게 대응이 가능하다.
*/
type Todo = {
    id: number;
    text: string;
    isChecked: boolean;
};
const TodoList : React.FC = () => {
    const title: string = "오늘 할 일";

    //구조 분해 할당
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: "공부하기", isChecked: false },
        { id: 2, text: "잠자기", isChecked: false },
        { id: 3, text: "미팅하기", isChecked : false}
    ]);

    return (
        <div>
            <h1>{title}</h1>
            <p></p>
            <div className='container'>
                <div className = 'board'>
                    <ul>
                        {
                            todos.map((todo, index) => (
                                <li key={index}> {todo.text}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoList;