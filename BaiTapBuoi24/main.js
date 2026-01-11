//Assignment24
//1
function isPrime(n){
    if(typeof n!='number' || n<2){
        return false
    }
    for(let i=2;i<=n**0.5;i++){
        if(n%i==0){
            return false
        }
    }
    return true
}
console.log(isPrime(16));
//2
//Solution 1
function isPerfectNumber(n){
    if(typeof n!="number"||n <6){
        return false
    }
    let sum=0
    for(let i=1;i<=n/2;i++){
        if(n%i==0){
            sum+=i
        }
    }
    return sum==n
}
console.log(isPerfectNumber(6));
//Solution 2
function getSumOfDivisors(n){
    let sum=1
    for(let i=2;i<=n**0.5;i++){
        if(n%i===0){
            sum+=i
            if(i!==n/i){
                sum+=n/i
            }
        }
    }
    return sum
}
function isPerfectNumber(n){
    if(typeof n!='number'|| n<6){
        return false;
    }
    return getSumOfDivisors(n)==n
}
console.log(isPerfectNumber(6));
