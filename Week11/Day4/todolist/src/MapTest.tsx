import React from "react";

const MapTest = () => {
    const fruits = ['apple', 'banana', 'orange'];
    return (
        <div>
            <h2>Fruits</h2>
            <ul>
                {
                    fruits.map((fruit, index) => (
                        <li key = {index}>{fruit}</li> /**동적으로 생성된 엘리먼트에 대해 관리하기 위한 식별자가 필요하다 */
                    ))
                }
            </ul>
        </div>
    )
}
export default MapTest;