var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 변수의 데이터 타입 명시
var stdId = 1111;
var stdName = "lee";
var age = 20;
var gender = 'male';
var course = 'Typescript';
var completed = false;
//열거형 : 사용자 정의 타입
var GenderType;
(function (GenderType) {
    GenderType["Male"] = "male";
    GenderType["Female"] = "female";
    GenderType["GenderNatural"] = "netural";
})(GenderType || (GenderType = {}));
;
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 91011;
        this.stdName = 'park';
        this.age = 30;
        this.gender = 'female';
        this.course = 'nodejs';
        this.completed = true;
    }
    MyStudent.prototype.setName = function (name) {
        this.stdName = name;
        console.log('Set Name: ' + this.stdName);
    };
    return MyStudent;
}());
var myInstance = new MyStudent();
myInstance.setName('Choi');
// function getInfo(id : number) : Student{
//     return {
//         stdId: id,
//         stdName: 'park',
//         //age: 20,
//         gender: GenderType.Female,
//         course: 'javascript',
//         completed: true
//     };
// }
var std = {
    stdId: 91011,
    stdName: 'park',
    age: 30,
    gender: 'male',
    course: 'nodejs',
    completed: true
};
function setInfo(student) {
    console.log(student);
}
//setInfo(std)
//console.log(getInfo(2222));
// 함수의 데이터 타입 명시 (매개변수, 리턴타입)
function Plus(a, b) {
    return a + b;
}
var user = {
    name: 'John',
    age: 25
}; //객체 리터럴
var numStr = 100;
function convertToString(val) {
    return String(val);
}
function convertToNumber(val) {
    return Number(val);
}
// Array
var numbers = [1, 2, 3, 4, 5];
var fruits = ['apple', 'banana', 'orange'];
//union Array
var mixedArray = [1, 'two', 3, 'four'];
for (var i = 0; i < mixedArray.length; i++) {
    console.log(mixedArray[i]);
}
var readOnlyArray = [1, 2, 3];
//Tuple : 타입의 순서가 정해져 있다.
var greeting = [1, 'hello', true];
for (var i = 0; i < greeting.length; i++)
    console.log(greeting[i]);
//Spread 연산자
var firstArray = [1, 2, 3];
var secondArray = [4, 5, 6];
var combinedArray = __spreadArray(__spreadArray([], firstArray, true), secondArray, true);
console.log(combinedArray);
