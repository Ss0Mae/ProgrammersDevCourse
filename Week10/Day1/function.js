// 1. 함수 선언식(Function Declaration)
function greet() {
  console.log("Hello, World!");
}
greet(); // Hello, World!

// 2. 함수 표현식(Function Expression)
const add = function (a, b) {
  return a + b;
};
console.log(add(2, 3)); // 5

// 3. 화살표 함수(Arrow Function)
const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // 20

// 4. 익명 함수(Anonymous Function) 즉시 실행 (IIFE)
(function () {
  console.log("This is an immediately invoked function expression (IIFE)");
})();

// 5. 화살표 함수로 IIFE
(() => {
  console.log("Arrow function as IIFE");
})();

// 6. 함수 생성자(Function Constructor)
const subtract = new Function("a", "b", "return a - b;");
console.log(subtract(10, 4)); // 6

// 7. 기본 매개변수를 가진 함수(Default Parameters)
function sayHello(name = "Guest") {
  console.log(`Hello, ${name}!`);
}
sayHello(); // Hello, Guest!
sayHello("Alice"); // Hello, Alice!

// 8. 나머지 매개변수(Rest Parameters)
function sumAll(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sumAll(1, 2, 3, 4, 5)); // 15

// 9. 고차 함수(Higher-order Function)
function repeat(operation, num) {
  for (let i = 0; i < num; i++) {
    operation();
  }
}
repeat(() => console.log("Repeating..."), 3);
// Repeating...
// Repeating...
// Repeating...

// 10. 콜백 함수(Callback Function)
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}
ask(
  "Do you agree?",
  () => console.log("You agreed."),
  () => console.log("You canceled.")
);

// 11. 클로저(Closure)를 활용한 함수
function createCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(`Current count: ${count}`);
  };
}
const counter = createCounter();
counter(); // Current count: 1
counter(); // Current count: 2
