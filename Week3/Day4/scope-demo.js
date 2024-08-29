if (true) {
    var num1 = 7;
    const num2 = 3; //블록 스코프여서 중괄호 밖에서는 사용 X
    let num3 = 5; // 블록 스코프여서 중괄호 밖에서 사용 X

    //num2 = 10;
    num3 = 21;
    //console.log(num1 + "X" + num2 + "=" + num3);
    console.log(`${num1} X ${num2} = ${num3}`);
}
console.log(num1);
// console.log(num2);
// console.log(num3);