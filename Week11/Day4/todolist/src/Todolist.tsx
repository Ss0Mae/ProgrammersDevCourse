import React, { useState } from "react";

/**React.FC = 리액트 Function Component  
 * 리액트에서는 변수대신 state를 자주 사용한다 => 일반 변수와 달리 동적으로 관리하여
 * 변화에 유연하게 대응이 가능하다.
*/
const TodoList : React.FC = () => {
    const title: string = "오늘 할 일";
    const [todos] = useState(['공부하기', '잠자기', '미팅하기']);

    return (
        <div>
            <h1>{title}</h1>
            <p></p>
            <div className = 'container'>
                <ul>
                    <li>{todos[0]}</li>
                    <li>{todos[1]}</li>
                    <li>{todos[2]}</li>
                </ul>
            </div>
        </div>
    )
}

export default TodoList;