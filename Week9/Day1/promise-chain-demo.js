
// 비동기 처리 "promise"
let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Done'), 3000);
}).then(
    (result) => {
        console.log(result);
        return result + "!!!!!"
    },
    (error) => { }
).then(
    (result) => {
        console.log(result);
        return result + "!!!!!"
    },
    (error) => { }
).then(
    (result) => { console.log(result); },
    (error) => { }
)