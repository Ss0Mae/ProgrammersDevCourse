import { useState } from "react";
import { useEffect } from "react";
// const Timer: React.FC = () => {
//     const [seconds, setSeconds] = useState<number>(0);    

//     return (
//         <div>
//             <h2>Timer : {seconds}초</h2>
//             <button onClick={
//                 () => {
//                     setInterval(() => {
//                         setSeconds((prev)=>prev+1)
//                     },1000)
//                 }
//             }>Start</button>
//         </div>
//     )
// }

const Clock: React.FC = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1>현재 시간: {time.toLocaleTimeString()}</h1>
        </div>
    );
};

export default Clock;