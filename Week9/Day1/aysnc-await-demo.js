
// Promise : 약속을 지키는 예약어

let promise = new Promise((resolve, reject) => {
// executor : 이 친구가 할 일
    setTimeout(() => resolve('Done!'), 3000);
// 일을 다 하면 무조건 콜백함수 resolve()또는 reject() 둘 중 하나는 호출
// 할 일을 성공적으로 하면 resolve(결과)
//         실패하면 reject(에러)
});