// 변수의 데이터 타입 명시
var stdId = 1111;
var stdName = "lee";
var age = 20;
var gender = 'male';
var course = 'Typescript';
var completed = false;
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 91011;
        this.stdName = 'park';
        this.age = 30;
        this.gender = 'male';
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
//         gender: 'female',
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
