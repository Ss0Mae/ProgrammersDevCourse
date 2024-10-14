// awiat은 async 함수 안에서만 동작한다.
// await이 Promise.then 메서드를 좀 더 쉽게 사용할 수 있는 방법

// async의 두번째 기능
// await을 만나면 Promise 객체를 기다려준다.
// Promise.then을 함수 밖이 아닌 안에서 작성하게 해준다.
async function f() {
    let promise1 = new Promise((resolve, reject) => {
        setTimeout(() => resolve('1st Query'), 3000);
    });
    let result1 = await promise1;
    console.log(result1);

    let promise2 = new Promise((resolve, reject) => {
        setTimeout(() => resolve('2nd Query with '+ result1), 3000);
    });
    let result2 = await promise2;
    console.log(result2);

    let promise3 = new Promise((resolve, reject) => {
        setTimeout(() => resolve('3rd Query with '+ result2), 3000);
    });
    let result3 = await promise3;
    console.log(result3);
}
f();