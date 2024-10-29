// 변수의 데이터 타입 명시
let stdId: number = 1111;
let stdName: string = "lee";
let age: number = 20;
let gender: string = 'male';
let course: string = 'Typescript';
let completed: boolean = false;

//열거형 : 사용자 정의 타입
enum GenderType{
    Male = 'male',
    Female = 'female',
    GenderNatural = 'netural'
};

interface Student{
    stdId: number;
    stdName?: string;
    age?: number;
    gender?: 'male' | 'female';
    course?: string;
    completed?: boolean;
    setName: (name: string) => void;
    //getName: () => string;
}

class MyStudent implements Student{
    stdId = 91011;
    stdName = 'park';
    age = 30;
    gender: 'male' | 'female' = 'female';
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
//         gender: GenderType.Female,
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

const user: {name : string , age: number} = {
    name: 'John',
    age: 25
}; //객체 리터럴

type strOrNum = number | string;
let numStr: strOrNum = 100;

function convertToString(val: strOrNum): string{
    return String(val);
}

function convertToNumber(val: strOrNum): number{
    return Number(val);
}

// Array
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ['apple', 'banana', 'orange'];

//union Array
let mixedArray: (number | string)[] = [1, 'two', 3, 'four'];
for (let i = 0; i < mixedArray.length; i++){
    console.log(mixedArray[i]);
}

let readOnlyArray: ReadonlyArray<number> = [1, 2, 3];

//Tuple : 타입의 순서가 정해져 있다.
let greeting: [number, string, boolean] = [1, 'hello', true];
for (let i = 0; i < greeting.length; i++) console.log(greeting[i]); 

//Spread 연산자
let firstArray = [1, 2, 3];
let secondArray = [4, 5, 6];
let combinedArray = [...firstArray, ...secondArray];
console.log(combinedArray);