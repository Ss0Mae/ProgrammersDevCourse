const obj1 = {};
const obj2 = { message: '비어있지 않음' };
const num = 1;
const str = "one";
const str2 = ""; // 문자열도 객체입니다.?? -> 객체처럼 사용한다는게 맞는 말인듯

console.log(Object.keys(obj1).length === 0); // length === 0 
console.log(Object.keys(obj2).length !== 0); // length === 1

console.log(Object.keys(num).length); // 0
console.log(Object.keys(str).length); // 3
console.log(Object.keys(str2).length); // 3

function isEmpty(obj) {
    if (Object.keys(obj).length === 0) return true;
    else return false;
}