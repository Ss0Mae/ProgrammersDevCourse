// 변수의 데이터 타입 명시
let stdId: number = 1111;
let stdName: string = "lee";
let age: number = 20;
let gender: string = 'male';
let course: string = 'Typescript';
let completed: boolean = false;

interface Student{
    stdId: number;
    stdName?: string;
    age?: number;
    gender?: string;
    course?: string;
    completed?: boolean;
    setName: (name: string) => void;
    //getName: () => string;
}

class MyStudent implements Student{
    stdId = 91011;
    stdName = 'park';
    age = 30;
    gender= 'male';
    course= 'nodejs';
    completed = true;
    setName(name: string): void{
        this.stdName = name;
        console.log('Set Name: '+this.stdName);
    }
}

const myInstance = new MyStudent();
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

let std = {
    stdId: 91011,
    stdName: 'park',
    age: 30,
    gender: 'male',
    course: 'nodejs',
    completed: true
};

function setInfo(student : Student) :void {
    console.log(student);
}
//setInfo(std)

//console.log(getInfo(2222));

// 함수의 데이터 타입 명시 (매개변수, 리턴타입)
function Plus(a : number, b? : number) : number{
    return a + b;
}