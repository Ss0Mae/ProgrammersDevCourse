//async-awat : Promise 객체를 좀 더 쉽고 편하게 해주는 사용 문법

// async 함수
// ____ function f() {} : 일반 함수
//aysnc function f() {} : async 함수

async function f() {
    return 7;
    //asunc 함수는 무조건 Promise 객체를 반환한다.
    // 만약 반환값이 Promise가 아니면, Promise.resolve()로 감싸서 리턴해준다
}

f().then(
    (result) => {
        console.log("Resolve Method: ",result);
    },
    (error) => {
        console.log("Reject Method: ",error);
    }
)