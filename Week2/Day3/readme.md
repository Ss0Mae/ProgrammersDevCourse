# CSS

## CSS를 적용하는법

- **인라인** : HTML 태그 안에 작성
    
    ```
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LOGIN</title>
      </head>
      <body>
        <h1 style="color: red; text-align: center">Login</h1>
        <form>
          ID : <input type="text" style="font-size: 25px" /><br />
          PW : <input type="password" style="font-size: 25px" /><br />
          <input type="button" value="login" style="font-size:25px; width: 100px; height: 30px" />
        </form>
      </body>
    </html>
    
    ```
    
- **내부 스타일 시트**: HTML 문서 안에 같이 작성
    
    ```
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LOGIN</title>
        <style>
          h1 {
            color: red;
            text-align: center;
          }
          .login_inputs {
            font-size: 25px;
          }
          #login_btn {
            font-size: 25px;
            width: 100px;
            height: 30px;
          }
        </style>
      </head>
      <body>
        <h1>Login</h1>
        <form>
          ID : <input class="login_inputs" type="text" /><br />
          PW : <input class="login_inputs" type="password" /><br />
          <input id="login_btn" type="button" value="login" />
        </form>
      </body>
    </html>
    
    ```
    
- **외부 스타일 시트**: HTML 문서 밖에 작성하고 연결합니다.

## JavaScript

- 특정 HTML 요소를 선택해서 제어할 수 있는 스크립트 언어
- 인라인, 내부 스크립트, 외부 스크립트로 적용할 수 있다.

## 특정 태그를 찾는 방법

- id로 찾기: document.getElementById(’IDNAME’)
- class 이름으로 찾기: document.getElementByClassName(’CLASSNAME’)
- tag 이름으로 찾기: document.getElementByTagName(’TAG NAME’)

## var 와 let 과 const의 차이점

```
var a = 5;
console.log(a); // 5

var a = 10;
console.log(a); // 10

a = 15;
console.log(a); // 15
```

`var` 에서는 중복 선언과 재할당이 모두 가능하다.

마지막에 할당된 값이 최종으로 변수의 값으로 저장된다.

### let

```
let a = 5;
let a = 10;
cnosole.log(a); // SyntaxError: Identifier 'a' has already been declared
```

`let` 에서는 중복 선언을 허용하지 않는다.

중복 선언을 할 경우 `SyntaxError` 가 발생하게 된다.

```
let a = 5;
console.log(a); // 5

a = 10;
console.log(a); // 10
```

재할당은 `var` 와 동일하게 가능하다.

### const

```
const a = 5;
const a = 10;
cnosole.log(a); // SyntaxError: Identifier 'a' has already been declared

```

`const` 에서도 `let` 과 동일하게 중복 선언을 허용하지 않는다.

```
const a = 5;
console.log(a); // 5

a = 10;
console.log(a); // TypeError: Assignment to constant variable.
```

하지만 `const` 는 다른 변수들과 다르게 재할당도 불가능하다.

이유는 `const` 는 상수를 선언하는 키워드이기 때문이다.

처음 선언과 초기화를 하고 나면 다른 값을 재할당 할 수 없어진다.

---

## 실습 화면 캡쳐

![](https://velog.velcdn.com/images/ssomae/post/2f688ac1-1970-487a-bf1b-228640e85f92/image.png)![](https://velog.velcdn.com/images/ssomae/post/23c6e80d-86db-415c-8298-d4bbe35c955a/image.png)


