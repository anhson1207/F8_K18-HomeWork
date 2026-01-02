//Assignment 21
//Task 1
const classA=['An','Binh','Chi']
const classB=classA
classB[0]='An Updated'
console.log("Class A:", classA);
//class A not save value 'An','Binh','Chi', it save the address of array in heap register
//When assign classA to classB, both variables point to the same register address where the array is stored.
//For example, if classA points to register address 0x1A2B3C, after the assignment, classB also points to 0x1A2B3C.
//When modify classB, it also modifies classA because they share the same register address.
//Task 2
let x="10"
let y=2
console.log(x+y);//Result 1
console.log(x-y);//Result 2
console.log(x *"3");//Result 3
console.log("Hello"-y);//Result 4
//Result 1 explained:In the expression x + y, the + operator is used for string concatenation when one of the operands is a string. Here, x is a string ("10") and y is a number (2). JavaScript converts the number 2 to a string and concatenates it with "10", resulting in the string "102".
//Result 2 explained:In the expression x - y, the - operator is used for subtraction. JavaScript attempts to convert both operands to numbers. Here, x is a string ("10") which can be converted to the number 10, and y is already a number (2). The subtraction is performed as 10 - 2, resulting in the number 8.
//Result 4 explained:In the expression "Hello" - y, the - operator is used for subtraction. JavaScript tries to convert both operands to numbers. The string "Hello" cannot be converted to a valid number, so it results in NaN (Not-a-Number). Therefore, the result of the operation is NaN.
//Task 3
let age, mathScore,isVIP
let canEnter= isVIP||(age>=10 && mathScore > 7)
//test 1
age =9
mathScore=10
isVIP=false
console.log("Test 1 - Can enter:", canEnter);//false
//test 2
age =9
mathScore=10
isVIP=true
console.log("Test 2 - Can enter:", canEnter);//true
//!(age<10) same as age>=10 because operator ! will negate the boolean value of expression inside the parentheses
//Task 4
const laptop={
    brand:"Dell",
    price:1000,
    spec:{
        ram:"8GB",
        ssd:"256GB"
    }
}
const myLaptop = laptop;
myLaptop.brand = "Apple";

const mySpec = laptop.spec;
mySpec.ram = "16GB";

console.log(laptop.brand);
console.log(laptop.spec.ram);
//predicted output:
//laptop.brand: Apple
//laptop.spec.ram: 16GB
//explanation:
//In JavaScript, objects are assigned and passed by reference. This means that when you assign an object to another variable, both variables point to the same address in register.
//1. When do const myLaptop = laptop;, myLaptop points to the same address in register as laptop. Therefore, when you change myLaptop.brand to "Apple", it also changes laptop.brand because they reference the same address.
//2. Similarly, when do const mySpec = laptop.spec;, mySpec points to the same address in register as laptop.spec.Changing mySpec.ram to "16GB" also changes laptop.spec.ram for the same reason.



