// map 함수(메소드) vs forEach

const arr = [1, 2, 3, 4, 6];

const forEachArr = arr.forEach((a,b,c)=> { // 앞에는 데이터, 뒤에는 인덱스, c는 배열 전체
    //console.log(`a : ${a}, b : ${b}, c: ${c}`);
    return a * 2;
})
//console.log('==============')
console.log(arr);


const mapArr = arr.map((a,b,c)=> { // 앞에는 데이터, 뒤에는 인덱스, c는 배열 전체
    //console.log(`a : ${a}, b : ${b}, c: ${c}`);
    return a * 2;
}) 
console.log(arr);//map은 새로 생성되는 객체를 리턴한다.


//forEach로 return 하면 undefined,
//map으로 return하면 2,4,6,8,12
console.log(`forEach로 return 하면 ${forEachArr},
map으로 return하면 ${mapArr}`);     