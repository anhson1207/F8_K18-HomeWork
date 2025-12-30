//Asignment 20
//Section 1:Declare variables & console.log (basic)
//1.Initialize 3 variables
let name="Nguyen Anh Son"
let age=19
let isStudent=true
//console.log
console.log("Name:", name)
console.log("Age:", age)
console.log("Is Student:", isStudent)
//2 Initialize and update value of variable
let a=5
let b=10
a=20
b=15
console.log("Updated a:", a)
console.log("Updated b:", b)
//Section 2:Const/Let/Var
//Const not change value after initialize variable, if change value will throw error
//Let change value after initialize variable
//Const use when you don't want the variable to be reassigned, fixed value of variable
const x=10
// x=20
//This code wrong because const variable can't be reassigned
//Section 3:Data type
//"100" -> string
//100 -> number
//TRUE -> boolean
//[1,2,3] -> array->typeof object
//{name:"An", age:20} -> object
//null -> object
//undefined -> undefined
let student={
    name:"An",
    age:20,
    scores:[9,8,7]
}
console.log(student);
//Section 4:Type coercion
let str="1000"
let num=1000
let bool=true
console.log(Number(str), typeof str);
console.log(String(num), typeof num);
console.log(String(bool), typeof bool);
//Section 5: Truthy / Falsy
//Boolean(0)->false
//Boolean(1)->true
//Boolean("")->false
//Boolean("hello")->true
//Boolean(null)->false
//Boolean([])->true
//Section 6:Array and memory 
const numbers=[4,3,1,5,1]
console.log(numbers[0]);
console.log(numbers[numbers.length-1]);
//const a=numbers
//When initialize array numbers, data will be stored in heap memory
//numbers not store data directly, it store address of data in heap memory
//a=numbers, not initialize new array, copy address heap memory of numbers to a
//so a and numbers have same address heap memory