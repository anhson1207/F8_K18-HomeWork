//Assignment 23
//Task 1
//Check is triangle valid
const a=3, b=4, c=5
function checkTriangle(a,b,c){
    if(typeof a!='number' || typeof b!='number' || typeof c!='number'){
        return "Invalid type number"
    }
    if(a<=0 ||b<=0 ||c<=0){
        return "Invalid side lengths"
    }
    if(a+b>c && a+c>b && b+c>a){
        if(a==b && b==c){
            return "Equilateral triangle"
    }
    if(a==b || b==c || a==c){
        return "Isosceles triangle"
    }
    if(a===Math.sqrt(b*b + c*c) || b===Math.sqrt(a*a + c*c) || c===Math.sqrt(a*a + b*b)){
        return "Right triangle"
    }
    return "regular triangle"
}
    return "Not a valid triangle"
}
console.log(checkTriangle(a,b,c));
//Task 2
const n=20
//Check perfect square
function isPerfectSquare(n){
    if(typeof n!='number' || n<0){
        return "Invalid number"
    }
    const sqrtN=Math.sqrt(n)
    if(sqrtN*sqrtN === n){
        return `${n} is a perfect square`
    }
    return `${n} is not a perfect square`
}
console.log(isPerfectSquare(n));