var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//token 생성 = jwt 서명을 했다. (페이로드, 나만의 암호키) + SHA256

console.log(token);

// 검증
// 만약 검증에 성공하면, 페이로드 값을 확인할 수 있음
let decoded = jwt.verify(token, 'shhhhh');
console.log(decoded);