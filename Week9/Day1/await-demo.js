// awiat은 async 함수 안에서만 동작한다.
// await이 Promise.then 메서드를 좀 더 쉽게 사용할 수 있는 방법

// async의 두번째 기능
// await을 만나면 Promise 객체를 기다려준다.
// Promise.then을 함수 밖이 아닌 안에서 작성하게 해준다.
async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Done'), 3000);
    });

    let result = await promise;
    console.log(result);
}
f();