/**
 * 
 * 배열
 */

const arr = [1, 2, 3, 4, 5];

arr.forEach((a,b,c)=> { // 앞에는 데이터, 뒤에는 인덱스, c는 배열 전체
    console.log(`a : ${a}, b : ${b}, c: ${c}`);
})
console.log('==============');
//Map과 foreach

let map = new Map();
map.set(7, "seven");
map.set(8, "eight");
map.set(9, "nine");

map.forEach((a,b) => {// 첫번째는 value, 두번째는 key
  console.log(`a : ${a}, b : ${b}`);  
})