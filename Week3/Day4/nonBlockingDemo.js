
function first() {
    console.log('first');
}


function second() {
    console.log('second');
}


function third() {
    console.log('third');
}

first();
setTimeout(second, 2000);
//함수의 매개변수로 변수 또는 값을 전달하는 것이 아니라, 함수를 전달하는 것!
// 콜백함수
third();